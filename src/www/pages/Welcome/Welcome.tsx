import React, {useEffect, useState} from 'react';
import styles from './Welcome.module.less';

import { helloWorldSimple, helloWorld } from '@src/www/apis/hello';
import { Button } from 'antd';
import WalletConnect from "@walletconnect/client";
import QRCodeModal from "@walletconnect/qrcode-modal";

export default function Welcome() {
    const [connected, setConnected] = useState(false);
    const [connectObject, setConnectObject] = useState();
    const connector = new WalletConnect({
        bridge: "https://bridge.walletconnect.org", // Required
        qrcodeModal: QRCodeModal,
    });

    useEffect( () => {
        if (!connector.connected) {
            // create new session
            setConnected(false)
        } else {
            // Subscribe to connection events

        }
    }, []);
    const EthApi = () => {
        return this.$axios.create({
            baseURL: "https://ethereum-api.xyz",
            timeout: 30000, // 30 secs
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        })
    }
    const openDialog = () => {
        connector.createSession();
        if (!connected) {
            connector.on("connect", (error, payload) => {
                if (error) {
                    throw error;
                }
                // Get provided accounts and chainId
                const { accounts, chainId } = payload.params[0];

                console.log('Accounts in payload ', accounts);
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

    return (
        <div className={styles.box}>
            <Button onClick={() => openDialog()} type="primary">
                Open Dialog
            </Button>
        </div>
    );
}
