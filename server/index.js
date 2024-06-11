const {secp256k1} = require("ethereum-cryptography/secp256k1");
const { sha256 } = require("ethereum-cryptography/sha256");
const { toHex, utf8ToBytes }  = require( "ethereum-cryptography/utils");
const { keccak256 } = require("ethereum-cryptography/keccak.js");
const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  /*public key:*/ "03825d16d52825418bc2f5850246fa058021bb3bbb9dc533b6dea66bf9dac59c71": 100, // Private Key: ffdd727a87baf53072621777d4984fca4333bce0a9636e89af96b2d7b44535d3
  /*public key:*/ "0246f81caa7018dc21e1fd89b334581bb547f17c4c7d54a1d46c0b47e2363b31fe": 50 , // Private Key: 6bc35c27bdaf613f11d539e91b792f8792f1b839633e1e30beb9f3b6f88844c0
  };
const decoder = (key, value) => {
  if (key === "r" || key === "s") {
      return BigInt(value);
  }
  return value;
};
const getSignature = (signature) => {
  const sign = JSON.parse(signature, decoder);
  const construcSign = new secp256k1.Signature(sign.r, sign.s, sign.recovery);
  return construcSign;
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});
function verify(signature,sender){
  const message = "";
  const messageHash = keccak256(utf8ToBytes(message));
  return secp256k1.verify(getSignature(signature),messageHash,sender);
}

app.post("/send", (req, res) => {
  const { sender, recipient, amount, signature } = req.body;
  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else if (verify(signature,sender)) {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
  else{
    res.status(404).send({message: "Signature is not verifed, try again"})
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
