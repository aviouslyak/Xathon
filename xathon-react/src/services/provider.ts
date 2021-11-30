//@ts-ignore
import ganache from "ganache-cli";
declare let window: any;
const getProvider = () => {
  return window.ethereum;
};

const web3Provider = { getProvider };
export default web3Provider;
export { getProvider };
