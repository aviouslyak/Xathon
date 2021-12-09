import web3 from "../web3";
import { XathonFactory as XathonFactoryType } from "../../types/web3-v1-contracts/XathonFactory";
const contractJson = require("../../build/contracts/XathonFactory.json");

const addresses = {
  localhost: "0x80dbA3D7D54ea6dA24737eCa742d7a2F29Df8AE8",
  rinkeby: "0x7d6a89f57cF666e613baA13a1cce354237b070b0",
};

const abi = contractJson.abi;

interface XathonValues {
  address: string;
  name: string;
  description: string;
  unit: string;
  minimumDeposit: number;
}

class XathonFactory {
  private static wFactory = new web3.eth.Contract(
    abi,
    addresses["rinkeby"]
  ) as any as XathonFactoryType;

  static async getDeployedXathons() {
    return await this.wFactory.methods.getDeployedXathons().call();
  }

  static async deployXathon(values: XathonValues) {
    const addresses = await web3.eth.requestAccounts();
    return await this.wFactory.methods
      .deployXathon(
        values.address,
        values.minimumDeposit,
        values.unit,
        values.name,
        values.description
      )
      .send({ from: addresses[0] });
  }

  static async getAddress(name: string) {
    return await this.wFactory.methods.getAddress(name).call();
  }
}
export default XathonFactory;
