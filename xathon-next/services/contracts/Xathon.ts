import { Xathon as XathonType } from "../../types/web3-v1-contracts/Xathon";
import { TransactionReceipt } from "web3-core";
import { getWeb3Writer, web3ReadOnly } from "../web3";
import Web3 from "web3";

const contractJson = require("../../ethereum/contracts/Xathon.json");
const abi = contractJson.abi;

class Xathon {
  private xathonContract: XathonType;
  private addresses: string[];
  private web3: Web3;

  constructor(address: string) {
    this.web3 = getWeb3Writer();
    this.xathonContract = new this.web3.eth.Contract(
      abi,
      address
    ) as any as XathonType;
    this.addresses = [];
  }

  // get eth address: this.addresses[0]
  async getAddresses(): Promise<void> {
    this.addresses = await this.web3.eth.requestAccounts();
  }

  async getName(): Promise<string> {
    return await this.xathonContract.methods.xathonName().call();
  }

  async getUnit(): Promise<string> {
    return await this.xathonContract.methods.xathonUnit().call();
  }

  async getDonationPerUnit(): Promise<string> {
    return await this.xathonContract.methods.donationPerUnit().call();
  }

  async getMinimumDeposit(): Promise<string> {
    return await this.xathonContract.methods.minimumUnitDeposit().call();
  }

  async getDescription(): Promise<string> {
    return await this.xathonContract.methods.xathonDescription().call();
  }

  async getRecipient(): Promise<string> {
    return await this.xathonContract.methods.recipient().call();
  }

  async contribute(
    valuePerUnit: number,
    value: number // max
  ): Promise<TransactionReceipt> {
    await this.getAddresses();
    return await this.xathonContract.methods.contribute(valuePerUnit).send({
      from: this.addresses[0],
      value: this.web3.utils.toWei(value.toString(), "ether"),
    });
  }

  async collectFunds(walked: number): Promise<TransactionReceipt> {
    await this.getAddresses();
    return await this.xathonContract.methods.collectFunds(walked).send({
      from: this.addresses[0],
    });
  }

  async claimUnspentFunds(walked: number): Promise<TransactionReceipt> {
    await this.getAddresses();
    return await this.xathonContract.methods.claimUnspentFunds().send({
      from: this.addresses[0],
    });
  }
}

export default Xathon;
