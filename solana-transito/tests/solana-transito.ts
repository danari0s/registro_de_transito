import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { SolanaTransito } from "../target/types/solana_transito";
import { TextEncoder } from "util";
const { PublicKey, SystemProgram } = anchor.web3;

var assert = require("assert");

const stringToBytes = (input: string): Uint8Array => {
  return new TextEncoder().encode(input);
};

describe("solana-transito", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.SolanaTransito as Program<SolanaTransito>;

  function assertNotNull<T>(v: T | null): T {
    if (!v) throw new Error();

    return v;
  }

  it("Is initialized!", async () => {
    // Add your test here.
    const imgUrl = "https://test.com";

    const [pda] = await PublicKey.findProgramAddressSync(
      [
        stringToBytes("vehicle_account"),
        anchor.getProvider().publicKey.toBytes(),
        stringToBytes(imgUrl),
      ],
      program.programId
    );

    let tx = await program.methods
      .initialize(imgUrl)
      .accounts({
        vehicleData: pda,
        user: anchor.getProvider().publicKey,
        systemProgram: SystemProgram.programId,
      })
      .rpc();

    assertNotNull(tx);
  });

  it("Get all vehicles", async () => {
    const dataByOwner = await program.account.vehicleData.all();

    assert.equal(1, dataByOwner.length);
  });

  it("Finds vehicles by pubkey!", async () => {
    const dataByOwner = await program.account.vehicleData.all([
      {
        memcmp: {
          bytes: anchor.getProvider().publicKey.toBase58(),
          offset: 8,
        },
      },
    ]);

    assert.equal(1, dataByOwner.length);
  });
});
