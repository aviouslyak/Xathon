const HDWalletProvider = require("truffle-hdwallet-provider");

require("dotenv").config();

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1", // Localhost (default: none)
      port: 8545, // Standard Ethereum port (default: none)
      network_id: "*", // Any network (default: none)
    },
    goerli: {
      provider: function () {
        return new HDWalletProvider(
          process.env.WALLET_MNEMONIC,
          process.env.INFURA_GOERLI_URL
        );
      },

      network_id: 5,
      gas: 4500000,
      gasPrice: 10000000000,
    },
  },
  mocha: {},

  compilers: {
    solc: {
      version: "^0.8.10",
    },
  },
};
