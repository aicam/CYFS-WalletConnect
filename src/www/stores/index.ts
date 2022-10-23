import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import { History } from "history";

import {walletReducer} from "./wallet/reducer";
import {walletInfo} from "./wallet/types";

export interface ApplicationState {
    wallet: walletInfo
}

export const createRootReducer = (history: History) =>
    combineReducers({
        wallet: walletReducer,
        router: connectRouter(history)
    });