var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/wYbAQ0x0FE5CdA81154AfB2EadaafAe3e320127F88F171eDRWhCcYpGOaSK9e'));
var mnemonic = 'moment into test brave cover add life candy situate seat crumble lunch';
var hdkey = require('ethereumjs-wallet/hdkey');
var Wallet = require('ethereumjs-wallet');
var EthereumTx = require('ethereumjs-tx');
var privateKey = hdkey.fromMasterSeed(mnemonic)._hdkey._privateKey;
var wallet = Wallet.fromPrivateKey(privateKey);

var address = wallet.getChecksumAddressString();
web3.eth.getTransactionCount(address, function (error, txCount) {

  var nonce = '0x' + txCount.toString(16);
  console.log(nonce);
  var txParams = {
    nonce: nonce,
    gasPrice: '0x19184e72a0',
    gasLimit: '0xDF642',
    to: '0x0FE5CdA81154AfB2EadaafAe3e320127F88F171e',
    value: '1000000',
    data: '0x7f7465737432000000000000000000000000000000000000000000000000000000600057',
    chainId: 3,
  };
  var tx = new EthereumTx(txParams);
  tx.sign(privateKey);
  var serializedTx = '0x' + (tx.serialize()).toString('hex');
  console.log(serializedTx);
  web3.eth.sendSignedTransaction(serializedTx, console.log);
});
