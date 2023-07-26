import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

import React, { useEffect, useState } from "react";
import { IDL } from "../public/solana_transito";
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";
import { Program, Provider, web3 } from "@project-serum/anchor";

export default function Home() {
  const [vehicles_up, setVehicles] = useState([]);

  const programID = new PublicKey(IDL.metadata.address);

  const network = clusterApiUrl("devnet");
  const opts = {
    preflightCommitment: "processed",
  };

  const getProvider = () => {
    const connection = new Connection(network, opts.preflightCommitment);
    let solana_provider_obj = null;
    if(window.solana){
        solana_provider_obj = window.solana;
    } else if(window.solflare) {
        solana_provider_obj = window.solflare;
    }
    const provider = new Provider(
      connection,
      solana_provider_obj,
      opts.preflightCommitment
    );
    return provider;
  };

  const getVehicleList = async () => {
    try {
      const provider = getProvider();
      console.log("IDL:", IDL);
      console.log("programID:", programID);
      console.log("provider:", provider);
      var program = new Program(IDL, programID, provider);
      console.log("program:", program);
      var getAllVehicles = await program.account.vehicleData.all();
      console.log("getAllVehicles: ", getAllVehicles);
      setVehicles(getAllVehicles);
    } catch (error) {
      console.log("Error in getVehicleList: ", error);
      setVehicles(null);
    }
  };

  useEffect(() => {
    getVehicleList();
  }, []);

  return (
    <div className="flex justify-center">
      <div className="px-4" style={{ maxWidth: "1600px" }}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
          {vehicles_up.map((vehicle, i) => (
            <div key={i} className="border shadow rounded-xl overflow-hidden">
              <div className="text_data">
                Placa: {vehicle.account.imgUrl}
              </div>
            </div>
          ))}
          {vehicles_up.map((vehicle, i) => (
            <div key={i} className="border shadow rounded-xl overflow-hidden">
              <div className="text_data">
                Dueño:<br></br>
                {vehicle.account.owner.toString()}
              </div>
            </div>
          ))}
          {vehicles_up.map((vehicle, i) => (
            <div key={i} className="border shadow rounded-xl overflow-hidden">
              <img key={vehicle.account.imgUrl} src={`imgs/${vehicle.account.imgUrl}.jpg`} alt={vehicle.account.imgUrl} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
