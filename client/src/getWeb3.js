import Web3 from "web3";
import Shared_Vars from './components/Helper/shared'
var HDWalletProvider = require("@truffle/hdwallet-provider");
var mnemonic = "vital soul dentist check kite rebel used claim over monster excuse option";

const getWeb3 = () =>
  new Promise((resolve, reject) => {
    // Wait for loading completion to avoid race conditions with web3 injection timing.
    window.addEventListener("load", async () => {
      const provider = new HDWalletProvider(mnemonic, "https://ropsten.infura.io/v3/d8b7fcc1456a415e961fcd49c8b6e945", 5);
      const web3 = new Web3(provider);
      console.log("No web3 instance injected, using Local web3.");
      resolve(web3);
      Shared_Vars.web3 = web3;
      // const provider = new Web3.providers.HttpProvider(
      //   "http://127.0.0.1:8545"
      // );
      // const web3 = new Web3(provider);
      // console.log("No web3 instance injected, using Local web3.");
      // resolve(web3);
      // // Modern dapp browsers...
      // if (window.ethereum) {
      //   const web3 = new Web3(window.ethereum);
      //   try {
      //     // Request account access if needed
      //     await window.ethereum.enable();
      //     // Acccounts now exposed
      //     resolve(web3);
      //   } catch (error) {
      //     reject(error);
      //   }
      // }
      // // Legacy dapp browsers...
      // else if (window.web3) {
      //   // Use Mist/MetaMask's provider.
      //   const web3 = window.web3;
      //   console.log("Injected web3 detected.");
      //   resolve(web3);
      // }
      // // Fallback to localhost; use dev console port by default...
      // else {
      //   const provider = new Web3.providers.HttpProvider(
      //     "http://127.0.0.1:8545"
      //   );
      //   const web3 = new Web3(provider);
      //   console.log("No web3 instance injected, using Local web3.");
      //   resolve(web3);
      // }
    });
  });

export default getWeb3;
