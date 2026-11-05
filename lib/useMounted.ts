import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/**
 * False during server rendering and hydration, true once running on the client.
 * Hydration-safe replacement for the `useEffect` + `setState` "mounted" pattern,
 * which the react-hooks/set-state-in-effect lint rule rejects.
 */
export function useMounted(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );
}
