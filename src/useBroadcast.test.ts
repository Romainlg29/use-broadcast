import { act, renderHook } from '@testing-library/react';
import { useBroadcast } from './useBroadcast';

/**
 * jsdom does not implement the BroadcastChannel API, so we mock it.
 * The mock throws on postMessage once closed, like the browsers do.
 */
class MockBroadcastChannel {
	public static instances: MockBroadcastChannel[] = [];

	public onmessage: ((e: MessageEvent) => void) | null = null;
	public closed = false;

	constructor(public name: string) {
		MockBroadcastChannel.instances.push(this);
	}

	postMessage() {
		if (this.closed) {
			throw new DOMException("Failed to execute 'postMessage' on 'BroadcastChannel': Channel is closed");
		}
	}

	close() {
		this.closed = true;
	}
}

describe('useBroadcast', () => {
	beforeAll(() => {
		window.BroadcastChannel = MockBroadcastChannel as unknown as typeof BroadcastChannel;
	});

	beforeEach(() => {
		jest.clearAllMocks();
		MockBroadcastChannel.instances = [];
	});

	it('should return the initial value.', () => {
		const { result } = renderHook(() => useBroadcast<string>('my-channel', 'hello'));

		expect(result.current.state).toBe('hello');
	});

	it('should return undefined if no initial value is provided.', () => {
		const { result } = renderHook(() => useBroadcast<string>('my-channel'));

		expect(result.current.state).toBeUndefined();
	});

	it('should not throw when sending on a channel closed by the browser.', () => {
		const { result } = renderHook(() => useBroadcast<string>('my-channel', 'hello'));

		MockBroadcastChannel.instances.forEach((channel) => channel.close());

		expect(() => act(() => result.current.send('world'))).not.toThrow();

		/**
		 * The message has been dropped, so the state is left untouched
		 */
		expect(result.current.state).toBe('hello');
	});
});
