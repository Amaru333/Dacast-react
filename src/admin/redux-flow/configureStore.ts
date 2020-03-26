import { applyMiddleware, createStore, Store } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

// Import the state interface.
import { createRootReducer, AdminState } from "./store";

export default function configureStore(
    initialState: AdminState,
): Store<AdminState> {

    // We'll create our store with the combined reducers/thunk, and the initial Redux state that
    // we'll be passing from our entry point.
    const store = createStore(
        createRootReducer(),
        initialState,
        composeWithDevTools(applyMiddleware(thunk)),
    );
    
    return store;
}
