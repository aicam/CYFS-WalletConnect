export interface walletInfo {
    connected: boolean,
    accountId: string,
    wallets: {symbol: string, balance: string}[],
    walletAddress: string,
    walletChainId: string,
    chainPrice: number
}

export enum WalletActionTypes {
    SET_CONNECTED = "@@wallet/SET_CONNECTED",
    SET_WALLETS = "@@wallet/SET_WALLETS",
    SET_CHAIN_PRICE = "@@wallet/SET_ETH_PRICE"
}