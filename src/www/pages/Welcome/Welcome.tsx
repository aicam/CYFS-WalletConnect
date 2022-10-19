import React, {useEffect, useState} from 'react';
import { connect } from "react-redux";
import styles from './Welcome.module.less';
import { helloWorldSimple, helloWorld } from '@src/www/apis/hello';
import { Button } from 'antd';
import WalletConnect from "@walletconnect/client";
import QRCodeModal from "@walletconnect/qrcode-modal";
import {ApplicationState} from "../../stores";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import {fetchWalletInfo} from "../../stores/wallet/action";

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
    const connector = new WalletConnect({
        bridge: "https://bridge.walletconnect.org", // Required
        qrcodeModal: QRCodeModal,
    });
    useEffect( () => {
        if (!connector.connected) {
            // create new session
            setConnected(false)
            console.log('Not connected')
        } else {
            // Subscribe to connection events
            console.log('App is connected');
        }
    }, []);

    const openDialog = () => {
        connector.createSession();
        if (!connected) {
            connector.on("connect", (error, payload) => {
                if (error) {
                    throw error;
                }
                // Get provided accounts and chainId
                const { accounts, chainId } = payload.params[0];
                console.log('ChaiId is ', chainId);
                const mainAccount = accounts[0];
                setWallets(mainAccount, chainId);
                console.log('after set ', wallet);
            });
            // information updated event
            connector.on("session_update", (error, payload) => {
                if (error) {
                    throw error;
                }
                // Get updated accounts and chainId
                const { accounts, chainId } = payload.params[0];
            });

            connector.on("disconnect", (error, payload) => {
                if (error) {
                    throw error;
                }

                // Delete connector
            });

        }
    }

    const disconnect = () => {
        connector.killSession();
    }

    return (
        <div className={styles.box}>
            <Button onClick={() => openDialog()} type="primary">
                Open Dialog
            </Button>
            <Button onClick={() => disconnect()} type="primary">
                Disconnect
            </Button>
        </div>
    );
}

const mapStateToProps =({ wallet }: ApplicationState) => ({
    wallet: wallet
});

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
    return {
        setWallets: (address: string, chainId: string) => dispatch(fetchWalletInfo(address, chainId))
    }
}

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps)(Welcome);
