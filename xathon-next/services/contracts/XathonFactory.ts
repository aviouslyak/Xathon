import { web3ReadOnly } from "../web3";
import { XathonFactory as XathonFactoryType } from "../../types/web3-v1-contracts/XathonFactory";
const contractJSON = require("../../ethereum/contracts/XathonFactory.json");

const ADDRESSES = {
  rinkeby: "0x7d6a89f57cF666e613baA13a1cce354237b070b0",
};

export default class XathonFactory {
  static ReadOnlyXF: XathonFactoryType = new web3ReadOnly.eth.Contract(
    contractJSON.abi,
    ADDRESSES.rinkeby
  ) as any as XathonFactoryType;

  private WriteOnlyXF: XathonFactoryType;
  constructor() {
    this.WriteOnlyXF = null as any as XathonFactoryType;
  }
  static async getContractNames() {
    return await this.ReadOnlyXF.methods.getDeployedXathons().call();
  }

  static async getContractAddress(name: string) {
    return await this.ReadOnlyXF.methods.getAddress(name).call();
  }
}
