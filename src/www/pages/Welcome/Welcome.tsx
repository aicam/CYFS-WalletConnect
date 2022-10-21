import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import styles from './Welcome.module.less';
import {helloWorldSimple, helloWorld} from '@src/www/apis/hello';
import {Button, Row, Col} from 'antd';
import WalletConnect from "@walletconnect/client";
import QRCodeModal from "@walletconnect/qrcode-modal";
import {ApplicationState} from "../../stores";
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";
import {fetchWalletInfo} from "../../stores/wallet/action";
import CYFSWalletLogo from "@www/assets/images/CYFSWalletLogo.png";
import copy from "@www/assets/images/copy.png";
import ethereum from "@www/assets/images/ethereum.png";
import buyit from "@www/assets/images/buyit.png";
import send from "@www/assets/images/send.png";
import swap from "@www/assets/images/swap.png";

interface PropsFromState {
    wallet: []
}

interface propsFromDispatch {
    setWallets: (address: string, chainId: string) => any;
}

type Props = PropsFromState & propsFromDispatch;

const Welcome: React.FC<Props> = ({wallet, setWallets}) => {
    const [connected, setConnected] = useState(false);
    const [account, setAccount] = useState("");
    const [chainId, setChainId] = useState(0);
    const [walletKey, setWalletKey] = useState('0x7fF903458903485dD29');
    const [currency, setCurrency] = useState('ETH');
    const [currencyAmount, setCurrencyAmount] = useState(0);
    const [nationalCurrency, setNationalCurrency] = useState('USD');
    const [nationalCurrencyAmount, setNationalCurrencyAmount] = useState('0.00');

    useEffect(() => {
        if (walletKey.length > 20) {
            setWalletKey(walletKey.substring(0, 6) + '...' + walletKey.substring(walletKey.length - 4, walletKey.length))
        }
        setCurrency('ETH');
        setCurrencyAmount(0);
        setNationalCurrency('USD');
        setNationalCurrencyAmount('0.00');
    }, []);

    const copyWalletKey = () => {
        /* Copy text into clipboard */
        navigator.clipboard.writeText(walletKey);
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

        // Delete connector
    });

    const saveWalletInfo = (account: string, chainId: number) => {
        setAccount(account);
        setChainId(chainId);
        setWallets(account, chainId.toString());
    }

    useEffect(() => {
        if (!connector.connected) {
            // create new session
            setConnected(false);
            console.log('wallet is not connected ');
        } else {
            setConnected(true);
            console.log('wallet is connected')
        }
    }, []);

    const addListeners = () => {

    }

    const openDialog = () => {
        connector.createSession();
    }

    const disconnect = () => {
        connector.killSession();
        setConnected(false);
    }

    return (
        <>
            {!connected &&
                <div className={styles.box}>
                    <Button onClick={() => openDialog()} type="primary">
                        Connect Wallet
                    </Button>
                </div>
            }
            {connected &&
                <div>
                    <div className={styles.Title}>
                        <img className={styles.ImageLogo} src={CYFSWalletLogo} alt="CYFSWalletLogo"/>
                        <p className={styles.TilteText}>CYFS Wallet</p>
                        <a onClick={disconnect}>Disconnect</a>
                    </div>
                    <div className={styles.Container}>
                        <div className={styles.AccountWallet}>
                            <p className={styles.TilteText}>Account 1</p>
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
                                <p className={styles.CurrencyAmountText}>{currencyAmount}</p>
                                <p className={styles.CurrencyAmountText}>{currency}</p>
                            </div>
                            <div className={styles.NationalCurrencyValueContainer}>
                                <p className={styles.NationalCurrencyAmountText}>{'$' + nationalCurrencyAmount}</p>
                                <p className={styles.NationalCurrencyAmountText}>{nationalCurrency}</p>
                            </div>
                        </div>
                        <div className={styles.AllButtonsContainer}>
                            <img className={styles.ImageBuyButton} src={buyit} alt="buyit"/>
                            <img className={styles.ImageSendButton} src={send} alt="send"/>
                            <img className={styles.ImageSendButton} src={swap} alt="swap"/>
                        </div>
                    </div>
                </div>
            }
        </>
    );
}

const mapStateToProps = ({wallet}: ApplicationState) => ({
    wallet: wallet
});

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
    return {
        setWallets: (address: string, chainId: string) => dispatch(fetchWalletInfo(address, chainId))
    }
}

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps)(Welcome);
