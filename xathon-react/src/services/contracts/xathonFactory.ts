import web3 from "../web3";
import { AbiItem } from "web3-utils";
import { XathonFactory } from "../../types/web3-v1-contracts/XathonFactory";

const addresses = {
  localhost: "0x80dbA3D7D54ea6dA24737eCa742d7a2F29Df8AE8",
  rinkeby: "0xE64DC9d21522f54783Ede9cA54D2Ab311b37F3De",
};

const abi: AbiItem[] = [
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
        name: "name",
        type: "string",
      },
      {
        internalType: "string",
        name: "description",
        type: "string",
      },
    ],
    name: "deployWalkathon",
    outputs: [],
    stateMutability: "nonpayable",
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
        internalType: "contract Walkathon",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getDeployedWalkathons",
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
];

interface WalkathonValues {
  address: string;
  name: string;
  description: string;
  minimumDeposit: number;
}

class WalkathonFactory {
  private static wFactory = new web3.eth.Contract(
    abi,
    addresses["rinkeby"]
  ) as any as XathonFactory;

  static async getDeployedXathons() {
    return await this.wFactory.methods.getDeployedXathons().call();
  }

  static async deployXathon(values: WalkathonValues) {
    const addresses = await web3.eth.getAccounts();
    return await this.wFactory.methods
      .deployXathon(
        values.address,
        values.minimumDeposit,
        "miles",
        values.name,
        values.description
      )
      .send({ from: addresses[0] });
  }
}
export default WalkathonFactory;
