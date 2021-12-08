import web3 from "../web3";
import { AbiItem } from "web3-utils";
import { XathonFactory } from "../../types/web3-v1-contracts/XathonFactory";

const addresses = {
  localhost: "0x80dbA3D7D54ea6dA24737eCa742d7a2F29Df8AE8",
  rinkeby: "0x7d6a89f57cF666e613baA13a1cce354237b070b0",
};

const abi: AbiItem[] = [
  {
    inputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    name: "takenNames",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "minimum",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "unit",
        type: "string",
      },
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "string",
        name: "description",
        type: "string",
      },
    ],
    name: "deployXathon",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getDeployedXathons",
    outputs: [
      {
        internalType: "string[]",
        name: "",
        type: "string[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
    ],
    name: "getAddress",
    outputs: [
      {
        internalType: "contract Xathon",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

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
  ) as any as XathonFactory;

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
}
export default XathonFactory;
