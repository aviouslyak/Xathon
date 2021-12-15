import { TransactionReceipt } from "web3-core";
const ADDRESS = "0x0000000000000000000000000000000000000000";

export class XathonFactoryReader {
  async getContractNames() {
    return await new Promise((resolve) => resolve(["foo", "boo", "zoo"]));
  }

  async getContractAddress(name: string) {
    return await new Promise((resolve) => resolve(ADDRESS));
  }
}

export class XathonFactoryWriter {
  async setAddresses() {
    return;
  }

  async deployXathon() {
    return await new Promise((resolve) =>
      resolve("foo" as any as TransactionReceipt)
    );
  }
}
