import Web3 from "web3";

export const web3ReadOnly = new Web3(
  new Web3.providers.WebsocketProvider(
    "wss://rinkeby.infura.io/ws/v3/5d605eeddb374e6c889f7c36f0dd687d"
  )
);

declare let window: any;
export const getWeb3Writer = () => new Web3(window.ethereum);
