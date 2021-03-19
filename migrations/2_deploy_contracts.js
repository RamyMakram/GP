const MigrationOne = artifacts.require("Pharmacy");
const MigrationTwo = artifacts.require("Mediciences");
const MigrationThree = artifacts.require("Mainifactors");
const MigrationFour = artifacts.require("SimpleStorage");

module.exports = function(deployer, network, accounts) {
    deployer.deploy(MigrationOne, {from: accounts[0]});
    deployer.deploy(MigrationTwo, {from: accounts[0]});
    deployer.deploy(MigrationThree, {from: accounts[0]});
    deployer.deploy(MigrationFour, {from: accounts[0]});
};