import { Xathon as XathonType } from "../../types/web3-v1-contracts/Xathon";
import { TransactionReceipt } from "web3-core";
import { getWeb3Writer, web3ReadOnly } from "../web3";

const contractJson = require("../../build/contracts/Xathon.json");
const abi = contractJson.abi;

class Xathon {
  private xathonContract: XathonType;
  private addresses: string[];

  constructor(address: string, readOnly = true) {
    this.web3 = getWeb3Writer();
    this.ReadOnlyX = web3ReadOnly.eth.Contract;
    this.xathonContract = new web3.eth.Contract(
      abi,
      address
    ) as any as XathonType;
    this.addresses = [];
  }

  async getAddresses(): Promise<void> {
    this.addresses = await web3.eth.requestAccounts();
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
    value: number
  ): Promise<TransactionReceipt> {
    return await this.xathonContract.methods.contribute(valuePerUnit).send({
      from: this.addresses[0],
      value: web3.utils.toWei(value.toString(), "ether"),
    });
  }

  async collectFunds(walked: number): Promise<TransactionReceipt> {
    return await this.xathonContract.methods.collectFunds(walked).send({
      from: this.addresses[0],
    });
  }

  async claimUnspentFunds(walked: number): Promise<TransactionReceipt> {
    return await this.xathonContract.methods.claimUnspentFunds().send({
      from: this.addresses[0],
    });
  }
}

export default Xathon;
