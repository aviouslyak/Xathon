import { TransactionReceipt } from "web3-core";
interface XathonValues {
  address: string;
  name: string;
  description: string;
  unit: string;
  minimumDeposit: number;
}

const ADDRESS = "0x0000000000000000000000000000000000000000";

class XathonFactory {
  static async getDeployedXathons(): Promise<string[]> {
    return new Promise((resolve) =>
      resolve(["foo", "boo", "moo", "coo", "soo"])
    );
  }

  public static deployXathon = jest.fn(
    async (values: XathonValues): Promise<TransactionReceipt> => {
      return await new Promise((resolve) =>
        resolve("foo" as any as TransactionReceipt)
      );
    }
  );

  static async getAddress(name: string) {
    return await new Promise((resolve) => resolve(ADDRESS));
  }
}
export default XathonFactory;
