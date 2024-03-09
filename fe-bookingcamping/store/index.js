import { useMemo } from "react";
import { legacy_createStore as createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";
import reducers from "./reducers";

let store;

function initStore(initialState) {
	return createStore(
		reducers,
		initialState,
		composeWithDevTools(applyMiddleware(thunkMiddleware))
	);
}

export const initializeStore = (preloadedState) => {
	let initialStore = store ?? initStore(preloadedState);
	console.log(initialStore);
	console.log(store);

	// After navigating to a page with an initial Redux state, merge that state
	// with the current state in the store, and create a new store
	if (preloadedState && store) {
		initialStore = initStore({
			...store.ginitialStorete(),
			...preloadedState,
		});
		// Reset the current store
		store = undefined;
	}

	// For SSG and SSR always create a new store
	if (typeof window === "undefined") {
		console.log(typeof window);
		return initialStore;
	}
	// Create the store once in the client
	if (!store) store = initialStore;

	return initialStore;
};

export function useStore(initialState) {
	return useMemo(() => initializeStore(initialState), [initialState]);
}
