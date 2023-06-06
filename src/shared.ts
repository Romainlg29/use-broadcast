import { StateCreator, StoreMutatorIdentifier } from 'zustand';

export type SharedOptions = {
	name: string;
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
export type SharedImpl = <T>(f: StateCreator<T, [], []>, options: SharedOptions) => StateCreator<T, [], []>;

/**
 * Shared implementation
 * @param f Zustand state creator
 * @param options The options
 */
export const sharedImpl: SharedImpl = (f, options) => (set, get, store) => {
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
		/**
		 * Update the state
		 */
		set(e.data);
	};

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
