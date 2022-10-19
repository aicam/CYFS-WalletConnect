import {applyMiddleware, createStore, Store} from "redux";
import thunk from "redux-thunk";
import {routerMiddleware} from "connected-react-router";

import {History} from "history";

import {ApplicationState, createRootReducer} from "./stores";

export default function configureStore(
    history: History,
    initialState: ApplicationState
): Store<ApplicationState> {
    return createStore(
        createRootReducer(history),
        // @ts-ignore
        initialState,
        applyMiddleware(routerMiddleware(history), thunk)
    );
}