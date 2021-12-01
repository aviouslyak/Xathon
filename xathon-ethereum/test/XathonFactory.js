const XathonFactory = artifacts.require("XathonFactory");

contract("Xathon Factory", (accounts) => {
  let wf;
  beforeEach(async () => {
    wf = await XathonFactory.deployed();
  });

  it("deployXathon should create instance of Xathon contract", async () => {
    const address = await wf.deployXathon(
      accounts[1],
      0,
      "miles",
      "foo",
      "boo"
    );
    assert.ok(address);
  });

  it("deployXathon will fail if name is taken", async () => {
    let failed = false;
    try {
      const address = await wf.deployXathon(
        accounts[1],
        0,
        "miles",
        "foo",
        "boo"
      );
    } catch (err) {
      failed = true;
    }
    assert(failed);
  });
  it("deployXathon should place each name of xathon in array", async () => {
    let names = await wf.getDeployedXathons();
    const initLen = names.length;
    await wf.deployXathon(accounts[1], 0, "miles", "foo2", "boo");
    await wf.deployXathon(accounts[1], 0, "miles", "foo3", "boo");

    names = await wf.getDeployedXathons();
    assert.equal(2 + initLen, names.length);
    assert(names.includes("foo"));
    assert(names.includes("foo2"));
  });

  it("deployXathon should place address of deployed contract in mapping", async () => {
    await wf.deployXathon(accounts[1], 0, "miles", "foo4", "boo");
    const address = await wf.getAddress("foo3");
    assert.ok(address);
  });

  it("getAddress should fail if name is not yet used", async () => {
    let failed = false;
    try {
      await wf.getAddresss("not in mapping");
    } catch (err) {
      failed = true;
    }
    assert(failed);
  });
});
