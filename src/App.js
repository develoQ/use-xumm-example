import "./App.css";
import { Buffer } from "buffer";
import useXumm from "@tequ/use-xumm-hook";

function App() {
  const { connect, disconnect, status, user, signTransaction } = useXumm(
    "7fcb00b9-b846-4ddf-ae02-2a94f18c0b2f"
  );

  const payment = () => {
    signTransaction({
      TransactionType: "Payment",
      Destination: "rQQQrUdN1cLdNmxH4dHfKgmX5P4kf3ZrM",
      Amount: "1000000",
    }).then((payload) => {
      if (payload.response.txid) {
        alert("txId:" + payload.response.txid);
      } else {
        alert("canceled");
      }
    });
  };
  const mintNFT = () => {
    signTransaction({
      TransactionType: "NFTokenMint",
      NFTokenTaxon: 0,
      Flags: 8,
      URI: Buffer.from("hogehoge").toString("hex"),
    }).then((payload) => {
      if (payload.response.txid) {
        alert("txId:" + payload.response.txid);
      } else {
        alert("canceled");
      }
    });
  };
  return (
    <div className="App">
      <div>
        <button onClick={connect}>Connect</button>
        <button onClick={disconnect}>Disconnect</button>
      </div>
      {status}
      {user?.account && (
        <pre>
          <code>{JSON.stringify(user, null, "  ")}</code>
        </pre>
      )}
      {user?.account && (
        <>
          <button onClick={payment}>Payment Transaction</button>
          <button onClick={mintNFT}>NFT Mint Transaction</button>
        </>
      )}
    </div>
  );
}

export default App;
