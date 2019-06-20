const GoodluckEkeneToken = artifacts.require("./GoodluckEkeneToken.sol");


module.exports = async function(deployer) {
  const _name = "GoodluckEkeneToken";
  const _symbol = "GET";
  const _decimals = 18;

    deployer.deploy(GoodluckEkeneToken, _name, _symbol, _decimals).then(async function(){
    	var token = await GoodluckEkeneToken.deployed();
    	console.log(token.address)
   })

  }