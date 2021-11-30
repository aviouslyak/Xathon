const WalkathonFactory = artifacts.require("WalkathonFactory"); 
module.exports = function(_deployer) {
  _deployer.deploy(WalkathonFactory); 
};
