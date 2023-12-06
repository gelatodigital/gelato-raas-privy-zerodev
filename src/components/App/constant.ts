import { defineChain } from "viem-15";
export const config = {
    zKatana: {
        privyConfig: defineChain ({
            id: 1261120,
            network: "zkatana",
            name: "Astar ZKatana Testnet",
            nativeCurrency: {
                name: "zKatana Ether",
                symbol: "ETH",
                decimals: 18,
            },
            rpcUrls: {
                public: {
                    http: ["https://rpc.zkatana.gelato.digital"],
                },
                default: {
                    http: ["https://rpc.zkatana.gelato.digital"],
                },
            },
            blockExplorers: {
                default: {
                    name: "Block Scout",
                    url: "https://zkatana.blockscout.com/",
                },
            },
            contracts: {
          
                multicall3: {
                    address: "0xca11bde05977b3631167028862be2a173976ca11",
                    blockCreated: 31317,
                },
            },
            testnet: true,
        }),
        privyId:"clozhep2500gal50f4c2j9gan",
        zeroDevId:"ZERODEV ID",
        simpleCounter: "0x47A9064a8D242860ABb43FC8340B3680487CC088"
    },
    opTestnet: {
        privyConfig: defineChain ({
            id: 42069,
            network: "Op Testnet",
            name: "OP Testnet",
            nativeCurrency: {
                name: "Ether",
                symbol: "ETH",
                decimals: 18,
            },
            rpcUrls: {
                public: {
                    http: ["https://rpc.op-testnet.gelato.digital"],
                },
                default: {
                    http: ["https://rpc.op-testnet.gelato.digital"],
                },
            },
            blockExplorers: {
                default: {
                    name: "Block Scout",
                    url: "https://blockscout.op-testnet.gelato.digital",
                },
            },
            contracts: {
          
                multicall3: {
                    address: "0xca11bde05977b3631167028862be2a173976ca11",
                    blockCreated:1810305,
                },
            },
            testnet: true,
        }),
        privyId:"clozhep2500gal50f4c2j9gan",
        zeroDevId:"ZERODEV ID",
        simpleCounter: "0xA47789e8C1caC47Bd891e33C97cB3C6722037282"
    }
}



export const astarZKatana = defineChain({
    id: 1261120,
    name: "Astar zKatana",
    network: "astarZKatana",
    nativeCurrency: {
      decimals: 18,
      name: "Ether",
      symbol: "ETH",
    },
    rpcUrls: {
      default: {
        http: ["https://rpc.zkatana.gelato.digital"],
        webSocket: ["https://ws.zkatana.gelato.digital"],
      },
      public: {
        http: ["https://rpc.zkatana.gelato.digital"],
        webSocket: ["https://ws.zkatana.gelato.digital"],
      },
    },
    blockExplorers: {
      default: {
        name: "Explorer",
        url: "https://zkatana.blockscout.com",
      },
    },
  });
