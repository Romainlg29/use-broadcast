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

	/**
	 * If the stores should be synced after the first sync or not.
	 * @default undefined
	 */
	unsync?: boolean;
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
	 * Types
	 */
	type Item = { [key: string]: unknown };

	/**
	 * Handle the Zustand set function
	 * Trigger a postMessage to all the other tabs
	 */
	const onSet: typeof set = (...args) => {
		/**
		 * Get the previous states
		 */
		const previous = get() as Item;

		/**
		 * Update the states
		 */
		set(...args);

		/**
		 * If the stores should not be synced, return.
		 */
		if (options.unsync) {
			return;
		}

		/**
		 * Get the fresh states
		 */
		const updated = get() as Item;

		/**
		 * Get the states that changed
		 */
		const state = Object.entries(updated).reduce((obj, [key, val]) => {
			if (previous[key] !== val) {
				obj = { ...obj, [key]: val };
			}
			return obj;
		}, {} as Item);

		/**
		 * Send the states to all the other tabs
		 */
		channel.postMessage(state);
	};

	/**
	 * Subscribe to the broadcast channel
	 */
	channel.onmessage = (e) => {
		if ((e.data as { sync: string }).sync === options.name) {
			/**
			 * If this tab / window is not the main, return
			 */
			if (!isMain) {
				return;
			}

			/**
			 * Remove all the functions and symbols from the store
			 */
			const state = Object.entries(get() as Item).reduce((obj, [key, val]) => {
				if (typeof val !== 'function' && typeof val !== 'symbol') {
					obj = { ...obj, [key]: val };
				}
				return obj;
			}, {});

			/**
			 * Send the state to the other tabs
			 */
			channel.postMessage(state);

			return;
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
