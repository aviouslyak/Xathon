class XathonFactory {
  static async getDeployedXathons(): Promise<string[]> {
    return new Promise((resolve) =>
      resolve(["foo", "boo", "moo", "coo", "soo"])
    );
  }
}
export default XathonFactory;
