import { StateCreator, StoreMutatorIdentifier } from 'zustand';

export type SharedOptions = {
	/**
	 * The name of the broadcast channel
	 * It must be unique
	 */
	name: string;

	/**
	 * Main timeout
	 * If the main tab / window doesn't respond in this time, this tab / window will become the main
	 * @default 100 ms
	 */
	mainTimeout?: number;
};

/**
 * The Shared type
 */
export type Shared = <
	T,
	Mps extends [StoreMutatorIdentifier, unknown][] = [],
	Mcs extends [StoreMutatorIdentifier, unknown][] = []
>(
	f: StateCreator<T, Mps, Mcs>,
	options: SharedOptions
) => StateCreator<T, [], []>;

/**
 * Type implementation of the Shared function
 */
type SharedImpl = <T>(f: StateCreator<T, [], []>, options: SharedOptions) => StateCreator<T, [], []>;

/**
 * Shared implementation
 * @param f Zustand state creator
 * @param options The options
 */
const sharedImpl: SharedImpl = (f, options) => (set, get, store) => {
	/**
	 * Is the store synced with the other tabs
	 */
	let isSynced = get() !== undefined;

	/**
	 * Is this tab / window the main tab / window
	 * When a new tab / window is opened, it will be synced with the main
	 */
	let isMain = false;

	/**
	 * Create the broadcast channel
	 */
	const channel = new BroadcastChannel(options.name);

	/**
	 * Handle the Zustand set function
	 * Trigger a postMessage to all the other tabs
	 */
	const onSet: typeof set = (...args) => {
		/**
		 * Update the state
		 */
		set(...args);

		type Item = { [key: string]: unknown };

		/**
		 * Get the state to send
		 */
		const state = args.reduce((obj, item) => (obj = { ...obj, ...(item as Item) }), {} as Item);

		/**
		 * Send the state to all the other tabs
		 */
		channel.postMessage(state);
	};

	/**
	 * Subscribe to the broadcast channel
	 */
	channel.onmessage = (e) => {
		if ((e.data as { sync: string }).sync === options.name && isMain) {
			type s = { [key: string]: unknown };

			/**
			 * Remove all the functions and symbols from the store
			 */
			const state = Object.entries(get() as s).reduce((obj, [key, val]) => {
				if (typeof val !== 'function' && typeof val !== 'symbol') {
					obj = { ...obj, [key]: val };
				}
				return obj;
			}, {});

			/**
			 * Send the state to the other tabs
			 */
			channel.postMessage(state);
		}

		/**
		 * Update the state
		 */
		set(e.data);

		/**
		 * Set the synced attribute
		 */
		isSynced = true;
	};

	/**
	 * Synchronize with the main tab
	 */
	const synchronize = (): void => {
		channel.postMessage({ sync: options.name });

		/**
		 * If isSynced is false after 100ms, this tab is the main tab
		 */
		setTimeout(() => {
			if (!isSynced) {
				isMain = true;
				isSynced = true;
			}
		}, options.mainTimeout ?? 100);
	};

	/**
	 * Synchronize with the main tab
	 */
	if (!isSynced) {
		synchronize();
	}

	return f(onSet, get, store);
};

/**
 * Shared middleware
 *
 * @example
 * import { create } from 'zustand';
 * import { shared } from 'use-broadcast-ts';
 *
 * const useStore = create(
 *      shared(
 *          (set) => ({ count: 0 }),
 *          { name: 'my-store' }
 *      )
 * );
 */
export const shared = sharedImpl as Shared;
