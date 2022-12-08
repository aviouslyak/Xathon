import Web3 from "web3";

export const web3ReadOnly = new Web3(
  new Web3.providers.WebsocketProvider(process.env.INFURA_URL as string)
);

declare let window: any;
export const getWeb3Writer = () => new Web3(window.ethereum);
