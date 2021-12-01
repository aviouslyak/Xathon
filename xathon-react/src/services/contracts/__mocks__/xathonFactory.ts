interface XathonValues {
  address: string;
  name: string;
  description: string;
  unit: string;
  minimumDeposit: number;
}

class XathonFactory {
  static async getDeployedXathons(): Promise<string[]> {
    return new Promise((resolve) =>
      resolve(["foo", "boo", "moo", "coo", "soo"])
    );
  }

  public static deployXathon = jest.fn(
    (values: XathonValues): Promise<unknown> => {
      return new Promise(() => {});
    }
  );
}
export default XathonFactory;
