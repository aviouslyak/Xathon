const ADDRESS = "0x0000000000000000000000000000000000000000";

export default class XathonFactory {
  static async getContractNames() {
    return await new Promise((resolve) => resolve(["foo", "boo", "zoo"]));
  }

  static async getContractAddress(name: string) {
    return await new Promise((resolve) => resolve(ADDRESS));
  }
}
