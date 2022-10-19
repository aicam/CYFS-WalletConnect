export interface walletInfo {
    connected: boolean,
    accountId: string,
    wallets: [],
    walletAddress: string,
    walletChainId: string,
}

export enum WalletActionTypes {
    SET_CONNECTED = "@@wallet/SET_CONNECTED",
    SET_WALLETS = "@@wallet/SET_WALLETS"
}