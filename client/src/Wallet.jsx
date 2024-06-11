import server from "./server";

function Wallet({ address, setAddress, balance, setBalance, privateKey, setPrivateKey }) {
  async function onAddChange(evt) {
    const address = evt.target.value;
    setAddress(address);
    if (address) {
      const {
        data: { balance },
      } = await server.get(`balance/${address}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }
  async function onPkChange(evt) {
    const pk = evt.target.value;
    setPrivateKey(pk);
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        Wallet Address
        <input placeholder="Type an address, for example: 0x1" value={address} onChange={onAddChange}></input>
      </label>

      <div className="balance">Balance: {balance}</div>

      <label>
        Adress private key
        <input placeholder="set private key to sign transfer" value={privateKey} onChange={onPkChange}></input>
      </label>
    </div>
  );
}

export default Wallet;
