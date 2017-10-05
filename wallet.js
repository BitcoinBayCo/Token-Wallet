var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/wYbAQ0x0FE5CdA81154AfB2EadaafAe3e320127F88F171eDRWhCcYpGOaSK9e'));
var mnemonic = 'moment into test brave cover add life candy situate seat crumble lunch';
var hdkey = require('ethereumjs-wallet/hdkey');
var Wallet = require('ethereumjs-wallet');
var EthereumTx = require('ethereumjs-tx');
var privateKey = hdkey.fromMasterSeed(mnemonic)._hdkey._privateKey;
var wallet = Wallet.fromPrivateKey(privateKey);
var utils = require('ethereumjs-util');
var address = wallet.getChecksumAddressString();
const Buffer = require('safe-buffer').Buffer;

var data = utils.sha3('transfer(address,uint256)');

data = data.slice(0,4);
console.log(data);
var arg1 = utils.toBuffer('0x715f2B46902b1B0809832506B9AC965abFA7Ad96');
console.log(arg1.length);
if (arg1.length < 32) {
  var zeros = utils.zeros(32 - arg1.length);
  var arg1 = Buffer.concat([zeros, arg1]);
}

var arg2 = utils.toBuffer(500);

//
if (arg2.length < 32) {
  var zeros = utils.zeros(32 - arg2.length);
  var arg2 = Buffer.concat([zeros, arg2]);
  console.log(arg2.length);
}

var data = Buffer.concat([data, arg1, arg2]);
data = utils.bufferToHex(data);

console.log(data);

//
web3.eth.getTransactionCount(address, function (error, txCount) {

  var nonce = '0x' + txCount.toString(16);
  console.log(nonce);
  var txParams = {
    nonce: nonce,
    gasPrice: '0x19184e72a0',
    gasLimit: '0xDF642',
    to: '0xfBe9aFa8282986e3F642C1a3B7D4451B6E251861',
    data: data,
    chainId: 3,
  };
  var tx = new EthereumTx(txParams);
  tx.sign(privateKey);
  var serializedTx = '0x' + (tx.serialize()).toString('hex');
  console.log(serializedTx);
  web3.eth.sendSignedTransaction(serializedTx, console.log);
});
