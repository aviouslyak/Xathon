import { getWeb3Writer, web3ReadOnly } from "../web3";
import { XathonFactory as XathonFactoryType } from "../../types/web3-v1-contracts/XathonFactory";
const contractJSON = require("../../ethereum/contracts/XathonFactory.json");

const ADDRESSES = {
  rinkeby: "0x7d6a89f57cF666e613baA13a1cce354237b070b0",
};

interface XathonValues {
  address: string;
  name: string;
  description: string;
  unit: string;
  minimumDeposit: number;
}

export default class XathonFactory {
  private static ReadOnlyXF: XathonFactoryType = new web3ReadOnly.eth.Contract(
    contractJSON.abi,
    ADDRESSES.rinkeby
  ) as any as XathonFactoryType;

  private WriteOnlyXF: XathonFactoryType;
  private addresses: string[];

  constructor() {
    const web3 = getWeb3Writer();
    this.WriteOnlyXF = new web3.eth.Contract(
      contractJSON.abi,
      ADDRESSES.rinkeby
    ) as any as XathonFactoryType;
    this.addresses = [];
  }
  static async getContractNames() {
    return await this.ReadOnlyXF.methods.getDeployedXathons().call();
  }

  static async getContractAddress(name: string) {
    return await this.ReadOnlyXF.methods.getAddress(name).call();
  }

  async setAddresses() {
    this.addresses = await web3ReadOnly.eth.requestAccounts();
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
