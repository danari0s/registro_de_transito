import React, { useState } from "react";
import { IDL } from "../public/solana_transito";
import { Connection, PublicKey, clusterApiUrl, Keypair } from "@solana/web3.js";
import { Program, Provider, web3 } from "@project-serum/anchor";
import { useRouter } from "next/router";

export default function AddVehicle() {
  const router = useRouter();
  const [inputVehicleValue, setInputVehicleValue] = useState("");
  const programID = new PublicKey(IDL.metadata.address);

  const { SystemProgram, Keypair } = web3;
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

  const stringToBytes = (input) => {
    return new TextEncoder().encode(input);
  };

  const AddVehicle = async () => {
    if (inputVehicleValue.length > 0) {
      console.log("Vehicle:", inputVehicleValue);
      console.log("programID:", programID);

      var provider = getProvider();
      console.log("provider:", provider);
      console.log("IDL:", IDL);
      var program = new Program(IDL, programID, provider);

      const [pda] = await PublicKey.findProgramAddress(
        [
          stringToBytes("vehicle_account"),
          provider.wallet.publicKey.toBytes(),
          stringToBytes(inputVehicleValue),
        ],
        program.programId
      );
      console.log("pda:", pda);
      let signer_key = provider.wallet.publicKey //Keypair.generate();
      
      console.log("signer_key:", signer_key);

      let tx = await program.rpc.initialize(
        inputVehicleValue, 
        {
          accounts: {
            vehicleData: pda,
            user: signer_key,
            systemProgram: SystemProgram.programId,
          },
        }
      );

      console.log("tx:", tx);

      setInputVehicleValue("");
      router.push("/");
    } else {
      console.log("Empty input. Try again.");
    }
  };

  return (
    <div className="flex justify-center">
      <div className="w-1/2 flex flex-col pb-12">
        <input
          placeholder="URL Vehicle"
          className="mt-8 border rounded p-4"
          onChange={(e) => setInputVehicleValue(e.target.value)}
        />
        <button
          onClick={AddVehicle}
          className="font-bold mt-4 bg-blue-500 text-white rounded p-4 shadow-lg"
        >
          Add Vehicle
        </button>
      </div>
    </div>
  );
}