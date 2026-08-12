import { create } from 'zustand';
import { shared, SharedOptions } from './shared';

/**
 * jsdom does not implement the BroadcastChannel API, so we mock it.
 * The mock throws on postMessage once closed, like the browsers do.
 */
class MockBroadcastChannel {
	public static instances: MockBroadcastChannel[] = [];

	public onmessage: ((e: MessageEvent) => void) | null = null;
	public messages: { action: string }[] = [];
	public closed = false;

	constructor(public name: string) {
		MockBroadcastChannel.instances.push(this);
	}

	postMessage(message: { action: string }) {
		if (this.closed) {
			throw new DOMException("Failed to execute 'postMessage' on 'BroadcastChannel': Channel is closed");
		}

		this.messages.push(message);
	}

	close() {
		this.closed = true;
	}
}

type Store = { count: number; set: (count: number) => void };

const lastChannel = () => MockBroadcastChannel.instances[MockBroadcastChannel.instances.length - 1]!;

const createStore = (options?: SharedOptions<Store>) =>
	create<Store>()(
		shared(
			(set) => ({
				count: 0,
				set: (count: number) => set({ count })
			}),
			{ name: `store-${MockBroadcastChannel.instances.length}`, ...options }
		)
	);

/**
 * Tell the module that the page is alive again, as the unloading state is shared by every store
 */
const pageshow = () => {
	const event = new Event('pageshow');
	Object.defineProperty(event, 'persisted', { value: true });

	window.dispatchEvent(event);
};

describe('shared', () => {
	beforeAll(() => {
		global.BroadcastChannel = MockBroadcastChannel as unknown as typeof BroadcastChannel;
	});

	beforeEach(() => {
		MockBroadcastChannel.instances = [];
	});

	afterEach(() => {
		pageshow();
	});

	it('should send the changes to the other tabs.', () => {
		const store = createStore();

		store.getState().set(1);

		expect(lastChannel().messages).toContainEqual({ action: 'change', state: { count: 1 } });
	});

	it('should not throw when the channel has been closed by the browser.', () => {
		const store = createStore();

		lastChannel().close();

		expect(() => store.getState().set(1)).not.toThrow();
		expect(store.getState().count).toBe(1);
	});

	it('should stop broadcasting the changes once the channel is closed.', () => {
		const store = createStore();
		const channel = lastChannel();

		channel.close();
		store.getState().set(1);

		/**
		 * The failed postMessage marked the channel as closed, so the next ones are skipped
		 */
		const postMessage = jest.spyOn(channel, 'postMessage');

		store.getState().set(2);

		expect(postMessage).not.toHaveBeenCalled();
	});

	it('should not broadcast the changes while the page is unloading.', () => {
		const store = createStore();
		const channel = lastChannel();

		window.dispatchEvent(new Event('beforeunload'));

		store.getState().set(1);

		expect(channel.messages).not.toContainEqual(expect.objectContaining({ action: 'change' }));
	});

	it('should still send the close message while the page is unloading.', () => {
		createStore();
		const channel = lastChannel();

		window.dispatchEvent(new Event('beforeunload'));

		expect(channel.messages).toContainEqual({ action: 'close', id: 0 });
	});

	it('should not throw when the partialized state is not serializable.', () => {
		const store = createStore({ partialize: () => undefined as never });

		expect(() => store.getState().set(1)).not.toThrow();
	});
});
