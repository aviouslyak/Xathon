import { TransactionReceipt } from "web3-core";
const ADDRESS = "0x0000000000000000000000000000000000000000";

export default class XathonFactory {
  static async getContractNames() {
    return await new Promise((resolve) => resolve(["foo", "boo", "zoo"]));
  }

  static async getContractAddress(name: string) {
    return await new Promise((resolve) => resolve(ADDRESS));
  }

  async setAddresses() {
    return;
  }

  async deployXathon() {
    return await new Promise((resolve) =>
      resolve("foo" as any as TransactionReceipt)
    );
  }
}
