import { useEffect, useRef, useState } from 'react';

/**
 * Our hook will return an object with three properties:
 * - send: a function that will send a message to all other tabs
 * - state: the current state of the broadcast
 * - subscribe: a function that will subscribe to the broadcast (Only if options.subscribe is true)
 */
export type UseBroadcastReturn<T> = {
	send: (val: T) => void;
	state: T | undefined;
	subscribe: (callback: (e: T) => void) => () => void;
};

/**
 * The options for the useBroadcast hook
 */
export type UseBroadcastOptions = {
	subscribe?: boolean;
};

/**
 *
 * @param name The name of the broadcast channel
 * @param val The initial value of the broadcast
 * @returns Returns an object with three properties: send, state and subscribe
 */
export const useBroadcast = <T>(name: string, val?: T, options?: UseBroadcastOptions): UseBroadcastReturn<T> => {
	/**
	 * Store the state of the broadcast
	 */
	const [state, setState] = useState<T | undefined>(val);

	/**
	 * Store the BroadcastChannel instance
	 */
	const channel = useRef<BroadcastChannel | null>(null);

	/**
	 * This function send the value to all the other tabs
	 * @param val The value to send
	 */
	const send = (val: T) => {
		if (!channel.current) {
			return;
		}

		channel.current.postMessage(val);

		if (!options?.subscribe) {
			setState(val);
		}

		/**
		 * Dispatch an event to the current tab
		 */
		document.dispatchEvent(new CustomEvent<T>(`${name}-broadcast`, { detail: val }));
	};

	/**
	 * This function subscribe to the broadcast
	 * @param callback The callback function
	 * @returns Returns a function that unsubscribe the callback
	 */
	const subscribe = (callback: (e: T) => void) => {
		document.addEventListener(`${name}-broadcast`, (e) => {
			callback((e as CustomEvent<T>).detail);
			console.log('event received');
		});

		return () => document.removeEventListener(`${name}-broadcast`, (e) => callback((e as CustomEvent<T>).detail));
	};

	useEffect(() => {
		/**
		 * If BroadcastChannel is not supported, we log an error and return
		 */
		if (typeof window === 'undefined') {
			console.error('Window is undefined!');
			return;
		}

		if (!window.BroadcastChannel) {
			console.error('BroadcastChannel is not supported!');
			return;
		}

		/**
		 * If the channel is null, we create a new one
		 */
		if (!channel.current) {
			channel.current = new BroadcastChannel(name);
		}

		/**
		 * Subscribe to the message event
		 * @param e The message event
		 */
		channel.current.onmessage = (e) => {
			/**
			 * Update the state
			 */
			if (!options?.subscribe) {
				setState(e.data);
			}

			/**
			 * Dispatch an event to all the other tabs
			 */
			document.dispatchEvent(new CustomEvent<T>(`${name}-broadcast`, { detail: e.data }));
		};

		/**
		 * Cleanup
		 */
		return () => {
			if (!channel.current) {
				return;
			}

			channel.current.close();
			channel.current = null;
		};
	}, [name, options]);

	return { send, state, subscribe };
};
