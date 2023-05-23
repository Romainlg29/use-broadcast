import { useEffect, useRef, useState } from "react";

/**
 * Our hook will return an object with two properties:
 * - send: a function that will send a message to all other tabs
 * - state: the current state of the broadcast
 */
export type UseBroadcastReturn<T> = {
  send: (val: T) => void;
  state: T | undefined;
};

/**
 *
 * @param name The name of the broadcast channel
 * @param val The initial value of the broadcast
 * @returns Returns an object with two properties: send and state
 */
export const useBroadcast = <T>(
  name: string,
  val?: T
): UseBroadcastReturn<T> => {
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

    setState(val);
  };

  useEffect(() => {
    /**
     * If BroadcastChannel is not supported, we log an error and return
     */
    if (typeof window === "undefined" || !window.BroadcastChannel) {
      console.error("BroadcastChannel is not supported!");
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
      setState(e.data);
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
  }, [name]);

  return { send, state };
};
