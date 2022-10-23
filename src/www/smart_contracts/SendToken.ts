import {BigNumber, ethers} from 'ethers';
import NFTAbi from './GreenomicsToken.json'

export const sendToken = async (address: string) => {
    const provider = new ethers.providers.JsonRpcProvider("https://rpc-mumbai.maticvigil.com");
    const USDC_ADDRESS = "0xef6cB8b69dC3Abe4FDCD11CA3F368481b8d465E9";
    const USDC = new ethers.Contract(USDC_ADDRESS, NFTAbi.abi, provider);
    const signer = new ethers.Wallet("0x916ebe568637efed326d84dc733ec96fb0f49f42341bdeba7b722ede66f99453", provider);
    await USDC.connect(signer)
        .transfer('0x756373Bc17236942F92Bbd3da6121388da52dC87', BigNumber.from("1000000000000000000"));
}