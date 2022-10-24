import { Reducer } from "redux";

import { walletInfo, WalletActionTypes } from "./types";

export const initialState: walletInfo = {
    connected: false,
    wallets: [],
    accountId: "",
    walletAddress: "",
    walletChainId: "",
    chainPrice: 0
}

const reducer: Reducer<walletInfo> = (state = initialState, action) => {
    switch (action.type) {
        case WalletActionTypes.SET_CONNECTED:
            return {...state, connected: action.connected};
        case WalletActionTypes.SET_WALLETS:
            return {...state, wallets: action.wallets, walletAddress: action.address};
        case WalletActionTypes.SET_CHAIN_PRICE:
            return {...state, chainPrice: action.price};
        default:
            return state;
    }
}

export {reducer as walletReducer};