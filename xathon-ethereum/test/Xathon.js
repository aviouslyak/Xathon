const Xathon = artifacts.require("Xathon");

contract("Xathon", (accounts) => {
  const to = accounts[9];
  const minimum = 0;
  const unit = "miles";
  const name = "foo";
  const description = "boo";

  let xathon;
  beforeEach(async () => {
    xathon = await Xathon.new(accounts[9], 0, unit, name, description);
  });

  it("constructor should set values on creation", async () => {
    const toRetrieved = await xathon.recipient();
    const minimumRetrieved = await xathon.minimumUnitDeposit();
    const unitRetrieved = await xathon.xathonUnit();
    const nameRetrieved = await xathon.xathonName();
    const descriptionRetrieved = await xathon.xathonDescription();
    const donationPerUnitRetrieved = await xathon.donationPerUnit();

    assert.equal(to, toRetrieved);
    assert.equal(minimum, minimumRetrieved);
    assert.equal(unit, unitRetrieved);
    assert.equal(name, nameRetrieved);
    assert.equal(description, descriptionRetrieved);
    assert.equal(0, donationPerUnitRetrieved);
  });

  it("contribute should require a certain amount of ether as a deposit", async () => {
    const w = await Xathon.new(accounts[9], 10, unit, name, description);

    let failed = false;

    try {
      await w.contribute(5, { from: accounts[0], value: "0" });
    } catch (err) {
      failed = true;
    }
    assert(failed);
  });

  it("contribute should increment donationPerUnit by amount passed to contribute", async () => {
    await xathon.contribute(5);
    await xathon.contribute(15);
    const donationPerUnit = await xathon.donationPerUnit();
    assert.equal(20, donationPerUnit);
  });

  it("collectFunds should only run if sender is address recipient", async () => {
    let failed = false;
    try {
      await xathon.collectFunds(10, { from: accounts[9] });
    } catch (err) {
      failed = true;
    }
    assert(!failed);
  });

  it("collectFunds should fail if sender is not address recipient", async () => {
    let failed = false;
    try {
      await xathon.collectFunds(10, { from: accounts[1] });
    } catch (err) {
      failed = true;
    }
    assert(failed);
  });

  it("collectFunds should end with donationPerUnit at 0", async () => {
    await xathon.contribute(5);
    await xathon.contribute(5);
    await xathon.collectFunds(10, { from: accounts[9] });
    const donationPerUnit = await xathon.donationPerUnit();
    assert.equal(0, donationPerUnit);
  });

  it("collectFunds should pay out contract money to recipient", async () => {
    await xathon.contribute(web3.utils.toWei("5", "ether"), {
      value: web3.utils.toWei("20", "ether"),
    });
    const beforeBalance = await web3.eth.getBalance(accounts[9]);
    await xathon.collectFunds(4, { from: accounts[9] });
    const afterBalance = await web3.eth.getBalance(accounts[9]);
    const diff = afterBalance - beforeBalance;
    assert(
      diff >= web3.utils.toWei("19.9", "ether") &&
        diff <= web3.utils.toWei("20", "ether")
    );
  });

  it("claimRemainingFunds should fail if caller has not contributed yet", async () => {
    let failed = false;
    try {
      await xathon.claimUnspentFunds({ from: accounts[1] });
    } catch (err) {
      failed = true;
    }
    assert(failed);
  });

  it("claimRemainingFunds should fail if collectFunds has not been run", async () => {
    let failed = false;
    try {
      await xathon.contribute(1, { from: accounts[1] });
      await xathon.claimUnspentFunds({ from: accounts[1] });
    } catch (err) {
      failed = true;
    }
    assert(failed);
  });

  it("claimRemainingFunds should fail if all money was spent", async () => {
    let failed = false;
    try {
      await xathon.contribute(1, { from: accounts[1], value: 1 });
      await xathon.collectFunds(1, { from: accounts[9] });
      await xathon.claimUnspentFunds({ from: accounts[1] });
    } catch (err) {
      failed = true;
    }
    assert(failed);
  });

  it("claimRemainingFunds should deposit ether back into contributor account if not all money was spent", async () => {
    await xathon.contribute(web3.utils.toWei("1", "ether"), {
      from: accounts[1],
      value: web3.utils.toWei("10", "ether"),
    });
    await xathon.collectFunds(5, { from: accounts[9] });
    const beforeBalance = await web3.eth.getBalance(accounts[1]);
    await xathon.claimUnspentFunds({ from: accounts[1] });
    const afterBalance = await web3.eth.getBalance(accounts[1]);
    const diff = afterBalance - beforeBalance;
    assert(
      diff >= web3.utils.toWei("4.9", "ether") &&
        diff <= web3.utils.toWei("5", "ether")
    );
  });
});
