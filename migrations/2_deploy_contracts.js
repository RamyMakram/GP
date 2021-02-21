const MigrationOne = artifacts.require("Pharmacy");
const MigrationTwo = artifacts.require("Mediciences");
const MigrationThree = artifacts.require("Mainifactors");
const MigrationFour = artifacts.require("SimpleStorage");

module.exports = function(deployer) {
    deployer.deploy(MigrationOne);
    deployer.deploy(MigrationTwo);
    deployer.deploy(MigrationThree);
    deployer.deploy(MigrationFour);
};