const WalkathonFactory = artifacts.require("WalkathonFactory");

contract("Walkathon Factory", (accounts) => {
  let wf;
  beforeEach(async () => {
    wf = await WalkathonFactory.deployed();
  });

  it("deployWalkathon should create instance of Walkathon contract", async () => {
    const address = await wf.deployWalkathon(accounts[1], 0, "foo", "boo");
    assert.ok(address);
  });

  it("deploywalkathon will fail if name is taken", async () => {
    let failed = false;
    try {
      const address = await wf.deployWalkathon(accounts[1], 0, "foo", "boo");
    } catch (err) {
      failed = true;
    }
    assert(failed);

  }); 
  it("deployWalkathon should place each name of walkathon in array", async () => {
    let names = await wf.getDeployedWalkathons();
    const initLen = names.length;
    await wf.deployWalkathon(accounts[1], 0, "foo2", "boo");
    await wf.deployWalkathon(accounts[1], 0, "foo3", "boo");

    names = await wf.getDeployedWalkathons();
    assert.equal(2 + initLen, names.length);
    assert(names.includes("foo"));
    assert(names.includes("foo2"));
  });

  it("deployWalkathon should place address of deployed contract in mapping", async () => {
    await wf.deployWalkathon(accounts[1], 0, "foo4", "boo");
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
