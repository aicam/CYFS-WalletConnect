import { ActionCreator, Action, Dispatch } from "redux";
import { walletInfo, WalletActionTypes } from "./types";
import axios from 'axios';

export const fetchWalletInfo = (address: string, chainId: string) => {
    return async (dispatch: Dispatch): Promise<Action> => {
        let res = null;
        try {
            res = await axios.get(`https://ethereum-api.xyz/account-assets?address=${address}&chainId=${chainId}`
                , {
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    }
                }).catch(e => {
                    console.error(`Error in Ether api, ${e}`);
            });
        } catch (e) {
            console.log('Error in request to Ether, ', e);
            return dispatch({type: WalletActionTypes.SET_CONNECTED, connected: false});
        }
        let wallets: { symbol: any; balance: string; }[] = []
        // eslint-disable-next-line array-callback-return
        res?.data.result.map( (item: { symbol: any; balance: string; }) => {
            wallets.push({"symbol": item.symbol, "balance": (parseInt(item.balance, 10) * (10 ** (-10))).toString().substring(0, 5)})
        });
        console.log("wallets confirmed ", wallets);
        return dispatch({type: WalletActionTypes.SET_WALLETS, wallets: wallets});
    }
}