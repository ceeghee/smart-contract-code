require('babel-register');
require('babel-polyfill');
require('dotenv').config();

//ArkaneProvider, alternative to truffle-hdwallet-provider
var ArkaneProvider = require("@arkane-network/truffle-arkane-provider");
const HDWalletProvider = require('truffle-hdwallet-provider');

//debounce for synchronous rpc
var NonceTrackerSubprovider = require("web3-provider-engine/subproviders/nonce-tracker");
const MNEMONIC = 'Hello What is your name'
module.exports = {
  /**
   * Networks define how you connect to your ethereum client and let you set the
   * defaults web3 uses to send transactions. If you don't specify one truffle
   * will spin up a development blockchain for you on port 9545 when you
   * run `develop` or `test`. You can ask a truffle command to use a specific
   * network from the command line, e.g
   *
   * $ truffle test --network <network-name>
   */

  networks: {
	
	development: {
	  host: 'localhost',
	  port: 7545,
	  network_id: '*', // eslint-disable-line camelcase
	},
	ganache: {
	  host: 'localhost',
	  port: 7545,
	  network_id: '*', // eslint-disable-line camelcase
	},

	  ropsten: {
        provider: function () {
          return new HDWalletProvider(process.env.MNEMONIC,`https://ropsten.infura.io/${process.env.INFURA_API_KEY}`,0)
      },
      network_id: 3
    },
	rinkeby: {
	  provider: () =>{
	   var wallet =  new ArkaneProvider({
			apiKey: 'WHIwTzcwNj5JV081bHU5NGIxI24hMHNOWFkvLzVBYyMkLDZwRlIhQ1AjWzM3KypOb2U=', 
			baseUrl: 'https://api.arkane.network',
			providerUrl: 'https://kovan.rinkeby.io'
		  })

		   var nonceTracker = new NonceTrackerSubprovider()
			wallet.engine._providers.unshift(nonceTracker)
			nonceTracker.setEngine(wallet.engine)
			return wallet

		},
	  network_id: '4',
	},

	kovan: {
        provider: function () {
          return new HDWalletProvider(process.env.MNEMONIC,`https://kovan.infura.io/v3/${process.env.INFURA_API_KEY}`,0)
      },
      network_id: 42
    },

  },

  // Set default mocha options here, use special reporters etc.
  mocha: {
	// timeout: 100000
  },

  // Configure your compilers
  compilers: {
	 solc: {
	   version: "0.5.0",  
	optimizer: {
	  enabled: true,
	  runs: 200
	}
  }
  }
}
