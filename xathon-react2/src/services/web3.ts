import Web3 from "web3";
import { getProvider } from "./provider";

const web3 = new Web3(getProvider());

export default web3;
