const path = require("path");
var HDWalletProvider = require("@truffle/hdwallet-provider");
var mnemonic = "vital soul dentist check kite rebel used claim over monster excuse option";
module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    develop: {
      port: 8545
    }, rinkeby: {
      provider: function () {
        return new HDWalletProvider(mnemonic, "https://ropsten.infura.io/v3/d8b7fcc1456a415e961fcd49c8b6e945",5);
      },
      from: "0x7d9bf8Ae9DDB624721b779859e2bd95f8dfFA977",
      network_id: 3,
      gas: 4500000,
      gasPrice: 10000000000,
    }
  }
};
