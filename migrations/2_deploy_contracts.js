var Records = artifacts.require("./Records.sol");
module.exports = function(deployer) {
  deployer.deploy(Records, {gas: 6700000});
};
