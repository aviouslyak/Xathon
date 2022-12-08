import { getWeb3Writer, web3ReadOnly } from "../web3";
import { XathonFactory as XathonFactoryType } from "../../types/web3-v1-contracts/XathonFactory";
const contractJSON = require("../../ethereum/contracts/XathonFactory.json");

const ADDRESSES = {
  goerli: "0x2ED125efab457C48afFd1360759131CEbe99B7bC",
};

interface XathonValues {
  address: string;
  name: string;
  description: string;
  unit: string;
  minimumDeposit: number;
}

export class XathonFactoryReader {
  private ReadOnlyXF: XathonFactoryType;

  constructor() {
    this.ReadOnlyXF = new web3ReadOnly.eth.Contract(
      contractJSON.abi,
      ADDRESSES.goerli
    ) as any as XathonFactoryType;
  }

  async getContractNames() {
    return await this.ReadOnlyXF.methods.getDeployedXathons().call();
  }

  async getContractAddress(name: string) {
    return await this.ReadOnlyXF.methods.getAddress(name).call();
  }
}

export class XathonFactoryWriter {
  private WriteOnlyXF: XathonFactoryType;
  private addresses: string[];
  private web3;

  constructor() {
    this.web3 = getWeb3Writer();
    this.WriteOnlyXF = new this.web3.eth.Contract(
      contractJSON.abi,
      ADDRESSES.goerli
    ) as any as XathonFactoryType;
    this.addresses = [];
  }

  async setAddresses() {
    this.addresses = await this.web3.eth.requestAccounts();
  }

  async deployXathon(values: XathonValues) {
    return await this.WriteOnlyXF.methods
      .deployXathon(
        values.address,
        values.minimumDeposit,
        values.unit,
        values.name,
        values.description
      )
      .send({ from: this.addresses[0] });
  }
}
