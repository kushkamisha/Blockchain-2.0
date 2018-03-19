var Limited = artifacts.require("./Limited.sol");
module.exports = function(deployer) {
  deployer.deploy(Limited, {gas: 6700000});
};
