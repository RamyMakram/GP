const MigrationOne = artifacts.require("Pharmacy");
const MigrationTwo = artifacts.require("Mediciences");
const MigrationThree = artifacts.require("Mainifactors");

module.exports = function(deployer) {
    deployer.deploy(MigrationOne);
    deployer.deploy(MigrationTwo);
    deployer.deploy(MigrationThree);
};