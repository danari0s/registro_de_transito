export type SolanaTransito = {
  "version": "0.1.0",
  "name": "solana_transito",
  "instructions": [
    {
      "name": "initialize",
      "accounts": [
        {
          "name": "vehicleData",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "imgUrl",
          "type": "string"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "vehicleData",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "owner",
            "type": "publicKey"
          },
          {
            "name": "imgUrl",
            "type": "string"
          }
        ]
      }
    }
  ], 
  "metadata": {
    "address": "N4JdhqzrojrrXhzMYvyAS9smq3Ekp7nuHKpZ1YuhXy6"
  }
};

export const IDL: SolanaTransito = {
  "version": "0.1.0",
  "name": "solana_transito",
  "instructions": [
    {
      "name": "initialize",
      "accounts": [
        {
          "name": "vehicleData",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "imgUrl",
          "type": "string"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "vehicleData",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "owner",
            "type": "publicKey"
          },
          {
            "name": "imgUrl",
            "type": "string"
          }
        ]
      }
    }
  ], 
  "metadata": {
    "address": "N4JdhqzrojrrXhzMYvyAS9smq3Ekp7nuHKpZ1YuhXy6"
  }
};
