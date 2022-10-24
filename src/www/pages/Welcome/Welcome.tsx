import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import styles from './Welcome.module.less';
import {Button, Row, Col} from 'antd';
import WalletConnect from "@walletconnect/client";
import QRCodeModal from "@walletconnect/qrcode-modal";
import {ApplicationState} from "../../stores";
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";
import {fetchChainPrice, fetchWalletInfo} from "../../stores/wallet/action";
import {publishProject, retrieveProject} from "@www/apis/project";
import {random} from "lodash";
import CYFSWalletLogo from "@www/assets/images/CYFSWalletLogo.png";
import copy from "@www/assets/images/copy.png";
import ethereum from "@www/assets/images/ethereum.png";
import buyit from "@www/assets/images/buyit.png";
import send from "@www/assets/images/send.png";
import swap from "@www/assets/images/swap.png";
import {walletInfo} from "@www/stores/wallet/types";
import {sendToken} from "@www/smart_contracts/SendToken";
import DefineProject from "@www/pages/DefineProject/DefineProject";

interface PropsFromState {
    wallet: walletInfo
}

interface propsFromDispatch {
    setWallets: (address: string, chainId: string) => any;
    setChainPrice: (symbol: string) => any;
}

type Props = PropsFromState & propsFromDispatch;

const GreenomicsHomepage: React.FC<Props> = ({wallet, setWallets, setChainPrice}) => {
    const [connected, setConnected] = useState(false);
    const [account, setAccount] = useState("");
    const [chainId, setChainId] = useState(0);
    const [walletKey, setWalletKey] = useState('0x7fF903458903485dD29');
    const [currency, setCurrency] = useState('MATIC');
    const [currencyAmount, setCurrencyAmount] = useState(0);
    const [nationalCurrency, setNationalCurrency] = useState('USD');
    const [nationalCurrencyAmount, setNationalCurrencyAmount] = useState('0.00');

    useEffect(() => {
        setCurrencyAmount(0);
        setNationalCurrency('USD');
        setNationalCurrencyAmount('0.00');
        if (!connector.connected) {
            setConnected(false);
        } else {
            saveWalletInfo(connector.accounts[0], connector.chainId);
            setConnected(true);
        }
    }, []);

    const copyWalletKey = () => {
        /* Copy text into clipboard */
        navigator.clipboard.writeText(account);
    }

    const connector = new WalletConnect({
        bridge: "https://bridge.walletconnect.org", // Required
        qrcodeModal: QRCodeModal,
    });
    connector.on("connect", (error, payload) => {
        if (error) {
            throw error;
        }
        // Get provided accounts and chainId
        const {accounts, chainId} = payload.params[0];

        saveWalletInfo(accounts[0], chainId);
    });
    // information updated event
    connector.on("session_update", (error, payload) => {
        if (error) {
            throw error;
        }
        // Get updated accounts and chainId
        const {accounts, chainId} = payload.params[0];
        saveWalletInfo(accounts[0], chainId);
    });

    connector.on("disconnect", (error, payload) => {
        if (error) {
            throw error;
        }
        setConnected(false);
        // Delete connector
    });

    const saveWalletInfo = async (account: string, chainId: number) => {
        setConnected(true);
        setAccount(account);
        setWalletKey(account);
        // account.substring(0, 6) + '...' + account.substring(account.length - 4, account.length))
        setChainId(chainId);
        setWallets(account, chainId.toString()).then((_: any) => console.log('wallet for async ', wallet));
    }

    const openDialog = () => {
        connector.createSession();
    }

    const disconnect = () => {
        connector.killSession();
        setConnected(false);
        // window.location.reload();
    }

    useEffect(() => {
        if (wallet.wallets.length > 0 && wallet.chainPrice === 0)
            setChainPrice('MATIC');
    }, [wallet]);

    return (
        <>
            {!connected &&
                <div className={styles.app}>
                    <div>
                        <img src="https://greenomics.site/_nuxt/img/logo.c47da55.png" width="250px"/>
                    </div>
                    <div className={styles.titleDecoration}>
                        <h2>Greenomics is a platform to trade Carbon assets in a decentralized platform.</h2>
                        <h2>It makes the market transparent and easy to trade.</h2>
                        <h2 className={styles.titleClients}>As a project developer: You can make an ERC20 token
                            out of your Carbon removals which should be confirmed by Verra or Gold Standard and
                            start to trade it.</h2>
                        <h2 className={styles.titleClients}>As a buyer: You can buy Carbon tokens and retire them to
                            generate Carbon credits
                            in voluntary market.</h2>
                    </div>
                    <div className={styles.box}>
                        <Button onClick={() => openDialog()} type="primary">
                            Connect Wallet
                        </Button>
                    </div>
                </div>
            }
            {connected &&
                <>
                    <div>
                        <div className={styles.Title}>
                            <img className={styles.ImageLogo} src={CYFSWalletLogo} alt="CYFSWalletLogo"/>
                            <p className={styles.TilteText}>CYFS Wallet</p>
                            <a className={styles.disconnect} onClick={disconnect}>Disconnect</a>
                        </div>
                        <div className={styles.Container}>
                            <div className={styles.AccountWallet}>
                                <p className={styles.TilteText}>Wallet Address</p>
                                <div className={styles.WalletKey}>
                                    <p className={styles.WalletKeyText}>
                                        {walletKey}
                                    </p>
                                    <img className={styles.ImageCopy} src={copy} alt="copy"
                                         onClick={() => copyWalletKey()}/>
                                </div>
                            </div>
                            <div className={styles.CurrencyContainer}>
                                <img className={styles.ImageCurrency} src={ethereum} alt="ethereum"/>
                                <div className={styles.CurrencyValueContainer}>
                                    {wallet.wallets.length > 0 &&
                                        <p className={styles.CurrencyAmountText}>{wallet.wallets[0].balance}</p>}
                                    <p className={styles.CurrencyAmountText}>{currency}</p>
                                </div>
                                <div className={styles.NationalCurrencyValueContainer}>
                                    {wallet.chainPrice > 0 &&
                                        <p className={styles.NationalCurrencyAmountText}>{'$' + wallet.chainPrice * parseInt(wallet.wallets[0].balance, 10)}</p>}
                                    <p className={styles.NationalCurrencyAmountText}>{nationalCurrency}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <DefineProject/>
                </>
            }
        </>
    );
}

const mapStateToProps = ({wallet}: ApplicationState) => ({
    wallet: wallet
});

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
    return {
        setWallets: (address: string, chainId: string) => dispatch(fetchWalletInfo(address, chainId)),
        setChainPrice: (symbol: string) => dispatch(fetchChainPrice(symbol))
    }
}

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps)(GreenomicsHomepage);
