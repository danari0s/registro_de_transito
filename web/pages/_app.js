import "../styles/globals.css";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";

function MyApp({ Component, pageProps }) {
  var checked_wallet = false;
  const [walletAddress, setWalletAddress] = useState(null);

  const checkIfWalletIsConnected = async () => {
    const { solana } = window;
    console.log(window);
    if (solana) {
      if (solana.isPhantom) {
        console.log("¡Phantom instalado correctamente!");
        const response = await solana.connect({ onlyIfTrusted: true });
        console.log("Public key: ", response.publicKey.toString());
        setWalletAddress(response.publicKey.toString());
      }
    }else if(window.solflare){
      console.log("¡Solflare instalado correctamente!");
      const response = await window.solflare.connect({ onlyIfTrusted: true });
      console.log("window.solflare.publicKey: ", window.solflare.publicKey);
      console.log("Public key: ", window.solflare.publicKey.toString());
      setWalletAddress(window.solflare.publicKey.toString());
    } else {
      console.log("Phantom no se encuentra instalado, tampoco Solflare");
    }
  };

  useEffect(() => {
    const onLoad = async () => {
      await checkIfWalletIsConnected();
    };
    if(!checked_wallet){
      onLoad();
      checked_wallet = true;
    }
  }, []);

  const connectWallet = async () => {
    const { solana } = window;
    if (solana) {
      const response = await solana.connect();
      console.log("Public key: ", response.publicKey.toString());
      setWalletAddress(response.publicKey.toString());
    }else if(window.solflare){
      const response = await window.solflare.connect();
      console.log("Public key: ", window.solflare.publicKey.toString());
      setWalletAddress(window.solflare.publicKey.toString());
    }
  };

  return (
    <div>
      {!walletAddress && (
        <div className={styles.container}>
          <button
            onClick={connectWallet}
            className={styles.walletButton}
          >
            Conectarse
          </button>
        </div>
      )}
      <div>
        <main>
          <nav className="border-b p-6">
            <p className="text-4xl font-bold">Registro de Tránsito</p>
            <div className="flex mt-4">
              <Link href="/">
                <a className="mr-4">Inicio</a>
              </Link>
              <Link href="/add-vehicle">
                <a className="mr-6">Agregar Vehículo</a>
              </Link>
              <Link href="/my-vehicles">
                <a className="mr-6">Mis Vehículos</a>
              </Link>
            </div>
          </nav>
        </main>
        <Component {...pageProps} />
      </div>
    </div>
  );
}

export default MyApp;
