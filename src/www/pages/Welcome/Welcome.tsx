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
        <div className={styles.box}>
            {!connected &&
                <Button onClick={() => openDialog()} type="primary">
                    Connect Wallet
                </Button>
            }
            {connected &&
                <Row>
                    <Col span={12}>
                        <Button onClick={() => disconnect()} type="primary">
                            Disconnect
                        </Button>
                    </Col>
                </Row>
            }
        </div>
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
