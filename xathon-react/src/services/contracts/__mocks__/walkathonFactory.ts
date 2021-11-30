class WalkathonFactory {
  static async getDeployedWalkathons(): Promise<string[]> {
    return new Promise((resolve) =>
      resolve(["foo", "boo", "moo", "coo", "soo"])
    );
  }
}
export default WalkathonFactory;
