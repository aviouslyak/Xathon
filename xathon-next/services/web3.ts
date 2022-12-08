import Web3 from "web3";

export const web3ReadOnly = new Web3(
  new Web3.providers.WebsocketProvider(
    /* PUT INFURA URL HERE */ undefined as unknown as string
  )
);

declare let window: any;
export const getWeb3Writer = () => new Web3(window.ethereum);
