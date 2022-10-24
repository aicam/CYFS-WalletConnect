import {BigNumber, ethers} from 'ethers';
import NFTAbi from './GreenomicsToken.json'

export const sendToken = async (address: string, amount: string) => {
    const provider = new ethers.providers.JsonRpcProvider("https://rpc-mumbai.maticvigil.com");
    const USDC_ADDRESS = "0xef6cB8b69dC3Abe4FDCD11CA3F368481b8d465E9";
    const USDC = new ethers.Contract(USDC_ADDRESS, NFTAbi.abi, provider);
    const signer = new ethers.Wallet("0x916ebe568637efed326d84dc733ec96fb0f49f42341bdeba7b722ede66f99453", provider);
    const m = (s: string) => {
        let sm = s;
        for (let i = 0; i < 19 - s.length; i++) {
            sm += "0";
        }
        return sm;
    }
    await USDC.connect(signer)
        .transfer(address, BigNumber.from(m(amount)));
}