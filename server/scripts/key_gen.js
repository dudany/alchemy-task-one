
const {secp256k1} = require("ethereum-cryptography/secp256k1");
const {keccak256}  = require("ethereum-cryptography/keccak");
const { toHex, utf8ToBytes }  = require( "ethereum-cryptography/utils");


// Generate 2 new private keys
const privateKey1 = secp256k1.utils.randomPrivateKey();
const privateKey2 = secp256k1.utils.randomPrivateKey();
console.log("privateKey1: ", toHex(privateKey1));
console.log("privateKey2: ", toHex(privateKey2));

// Derive the public key from the private key
const publicKey1 = secp256k1.getPublicKey(privateKey1);
const publicKey2 = secp256k1.getPublicKey(privateKey2);
console.log("Public Key1:", toHex(publicKey1));
console.log("Public Key2:", toHex(publicKey2));

// Derive the Ethereum address from the public key
const address1 = "0x" + toHex(keccak256(publicKey1.slice(1)).slice(-20));
const address2 = "0x" + toHex(keccak256(publicKey2.slice(1)).slice(-20));

console.log("Ethereum Address1:", address1);
console.log("Ethereum Address2:", address2);

// Sign a message
const message = "";
const messageHash = keccak256(utf8ToBytes(message));
const signature1 = secp256k1.sign(messageHash, privateKey1);
const signature2 = secp256k1.sign(messageHash, privateKey2);
const isValid1 = secp256k1.verify(signature1,messageHash,publicKey1);
const isValid2 = secp256k1.verify(signature2,messageHash,publicKey2);

// Verify the signature

console.log("Message:", message);
console.log("Message Hash:", toHex(messageHash));
console.log("Signature1:", signature1);
console.log("Is the signature1 valid?", isValid1);
console.log("Signature2:", signature2);
console.log("Is the signature2 valid?", isValid2);

