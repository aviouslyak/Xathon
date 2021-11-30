const HDWalletProvider = require("truffle-hdwallet-provider");
const mnemonic =
  "bench cheese over science tuna style distance vote verb caught strong refuse";
module.exports = {
  networks: {
    development: {
      host: "127.0.0.1", // Localhost (default: none)
      port: 8545, // Standard Ethereum port (default: none)
      network_id: "*", // Any network (default: none)
    },
    rinkeby: {
      provider: function () {
        return new HDWalletProvider(
          mnemonic,
          "https://rinkeby.infura.io/v3/73b6a38ccef64657b17d730de0fe7db6"
        );
      },
      network_id: 4,
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
