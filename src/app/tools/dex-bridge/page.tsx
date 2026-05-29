"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";

const INTEGRATOR_WALLET = "0xa9d77C5d8E509096eAd5685A363eEC86d679b780";
const NATIVE_ADDRESS = "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE";

function encodeApprove(spender: string, amount: bigint): string {
  const sig = "0x095ea7b3";
  const paddedSpender = spender.toLowerCase().replace("0x", "").padStart(64, "0");
  const paddedAmount = amount.toString(16).padStart(64, "0");
  return sig + paddedSpender + paddedAmount;
}

function encodeAllowance(owner: string, spender: string): string {
  const sig = "0xdd62ed3e";
  const paddedOwner = owner.toLowerCase().replace("0x", "").padStart(64, "0");
  const paddedSpender = spender.toLowerCase().replace("0x", "").padStart(64, "0");
  return sig + paddedOwner + paddedSpender;
}

function encodeBalanceOf(account: string): string {
  const sig = "0x70a08231";
  return sig + account.toLowerCase().replace("0x", "").padStart(64, "0");
}

function toHex(n: number) { return "0x" + n.toString(16); }

const CHAINS = [
  { id: 1,      name: "Ethereum",   symbol: "ETH",   logo: "https://assets.coingecko.com/coins/images/279/small/ethereum.png",                           explorer: "https://etherscan.io/tx/",            rpc: "https://ethereum.publicnode.com" },
  { id: 8453,   name: "Base",       symbol: "ETH",   logo: "https://raw.githubusercontent.com/base-org/brand-kit/001c0e9b40a67799ebe0418671ac4e02a0c683ce/logo/in-product/Base_Network_Logo.svg", explorer: "https://basescan.org/tx/",             rpc: "https://mainnet.base.org" },
  { id: 42161,  name: "Arbitrum",   symbol: "ETH",   logo: "https://assets.coingecko.com/coins/images/16547/small/photo_2023-03-29_21.47.00.jpeg",       explorer: "https://arbiscan.io/tx/",             rpc: "https://arb1.arbitrum.io/rpc" },
  { id: 10,     name: "Optimism",   symbol: "ETH",   logo: "https://assets.coingecko.com/coins/images/25244/small/Optimism.png",                         explorer: "https://optimistic.etherscan.io/tx/", rpc: "https://mainnet.optimism.io" },
  { id: 56,     name: "BNB Chain",  symbol: "BNB",   logo: "https://assets.coingecko.com/coins/images/825/small/bnb-icon2_2x.png",                       explorer: "https://bscscan.com/tx/",             rpc: "https://bsc-dataseed.binance.org" },
  { id: 137,    name: "Polygon",    symbol: "MATIC", logo: "https://assets.coingecko.com/coins/images/4713/small/matic-token-icon.png",                  explorer: "https://polygonscan.com/tx/",         rpc: "https://polygon-rpc.com" },
  { id: 43114,  name: "Avalanche",  symbol: "AVAX",  logo: "https://assets.coingecko.com/coins/images/12559/small/Avalanche_Circle_RedWhite_Trans.png",  explorer: "https://snowtrace.io/tx/",            rpc: "https://api.avax.network/ext/bc/C/rpc" },
  { id: 250,    name: "Fantom",     symbol: "FTM",   logo: "https://assets.coingecko.com/coins/images/4001/small/Fantom_round.png",                      explorer: "https://ftmscan.com/tx/",             rpc: "https://rpc.ftm.tools" },
  { id: 534352, name: "Scroll",     symbol: "ETH",   logo: "https://assets.coingecko.com/coins/images/33571/small/scroll.png",                           explorer: "https://scrollscan.com/tx/",          rpc: "https://rpc.scroll.io" },
  { id: 59144,  name: "Linea",      symbol: "ETH",   logo: "https://assets.coingecko.com/coins/images/33158/small/linea.png",                            explorer: "https://lineascan.build/tx/",         rpc: "https://rpc.linea.build" },
  { id: 324,    name: "zkSync Era", symbol: "ETH",   logo: "https://assets.coingecko.com/coins/images/38043/small/ZKTokenBlack.png",                     explorer: "https://explorer.zksync.io/tx/",      rpc: "https://mainnet.era.zksync.io" },
  { id: 5000,   name: "Mantle",     symbol: "MNT",   logo: "https://assets.coingecko.com/coins/images/30980/small/token.png",                            explorer: "https://explorer.mantle.xyz/tx/",     rpc: "https://rpc.mantle.xyz" },
  { id: 100,    name: "Gnosis",     symbol: "xDAI",  logo: "https://assets.coingecko.com/coins/images/11062/small/Identity-Primary-DarkBG.png",          explorer: "https://gnosisscan.io/tx/",           rpc: "https://rpc.gnosischain.com" },
  { id: 25,     name: "Cronos",     symbol: "CRO",   logo: "https://assets.coingecko.com/coins/images/7310/small/cro_token_logo.png",                    explorer: "https://cronoscan.com/tx/",           rpc: "https://evm.cronos.org" },
  { id: 1088,   name: "Metis",      symbol: "METIS", logo: "https://assets.coingecko.com/coins/images/15595/small/metis.jpeg",                           explorer: "https://andromeda-explorer.metis.io/tx/", rpc: "https://andromeda.metis.io/?owner=1088" },
];

function getKyberChain(id: number) {
  const m: Record<number, string> = { 1:"ethereum",8453:"base",42161:"arbitrum",10:"optimism",56:"bsc",137:"polygon",43114:"avalanche",250:"fantom",534352:"scroll",59144:"linea",324:"zksync",5000:"mantle",100:"xdai",25:"cronos",1088:"metis" };
  return m[id] || "";
}
function getOOChain(id: number) {
  const m: Record<number, string> = { 1:"eth",8453:"base",42161:"arbitrum",10:"optimism",56:"bsc",137:"polygon",43114:"avax",250:"ftm",534352:"scroll",59144:"linea",324:"zksync",5000:"mantle",100:"xdai" };
  return m[id] || "";
}
function get1inchChain(id: number) {
  const supported = [1,56,137,42161,10,43114,8453,100,250];
  return supported.includes(id) ? id : 0;
}
function getOdosChain(id: number) {
  const supported = [1,56,137,42161,10,43114,8453,324,59144,534352,250,5000];
  return supported.includes(id) ? id : 0;
}

// Native token address for each chain (Odos/Paraswap needs chain-specific native)
function getNativeForOdos(chainId: number): string {
  const m: Record<number, string> = {
    1:"0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
    56:"0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
    137:"0x0000000000000000000000000000000000001010",
    42161:"0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
    10:"0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
    43114:"0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
    8453:"0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
    324:"0x000000000000000000000000000000000000800A",
    59144:"0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
    534352:"0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
    250:"0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
    5000:"0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
  };
  return m[chainId] || NATIVE_ADDRESS;
}

const TOKEN_LOGOS: Record<string, string> = {
  ETH:"https://assets.coingecko.com/coins/images/279/small/ethereum.png",
  WETH:"https://assets.coingecko.com/coins/images/2518/small/weth.png",
  WBTC:"https://assets.coingecko.com/coins/images/7598/small/wrapped_bitcoin_wbtc.png",
  USDC:"https://assets.coingecko.com/coins/images/6319/small/usdc.png",
  USDT:"https://assets.coingecko.com/coins/images/325/small/Tether.png",
  DAI:"https://assets.coingecko.com/coins/images/9956/small/4943.png",
  BNB:"https://assets.coingecko.com/coins/images/825/small/bnb-icon2_2x.png",
  WBNB:"https://assets.coingecko.com/coins/images/825/small/bnb-icon2_2x.png",
  MATIC:"https://assets.coingecko.com/coins/images/4713/small/matic-token-icon.png",
  ARB:"https://assets.coingecko.com/coins/images/16547/small/photo_2023-03-29_21.47.00.jpeg",
  OP:"https://assets.coingecko.com/coins/images/25244/small/Optimism.png",
  LINK:"https://assets.coingecko.com/coins/images/877/small/chainlink-new-logo.png",
  UNI:"https://assets.coingecko.com/coins/images/12504/small/uniswap-uni.png",
  AAVE:"https://assets.coingecko.com/coins/images/12645/small/AAVE.png",
  CRV:"https://assets.coingecko.com/coins/images/12124/small/Curve.png",
  LDO:"https://assets.coingecko.com/coins/images/13573/small/Lido_DAO.png",
  GMX:"https://assets.coingecko.com/coins/images/18323/small/arbit.png",
  AVAX:"https://assets.coingecko.com/coins/images/12559/small/Avalanche_Circle_RedWhite_Trans.png",
  WAVAX:"https://assets.coingecko.com/coins/images/12559/small/Avalanche_Circle_RedWhite_Trans.png",
  FTM:"https://assets.coingecko.com/coins/images/4001/small/Fantom_round.png",
  WFTM:"https://assets.coingecko.com/coins/images/4001/small/Fantom_round.png",
  PEPE:"https://assets.coingecko.com/coins/images/29850/small/pepe-token.jpeg",
  SHIB:"https://assets.coingecko.com/coins/images/11939/small/shiba.png",
  CAKE:"https://assets.coingecko.com/coins/images/12632/small/pancakeswap-cake-logo_%281%29.png",
  ZK:"https://assets.coingecko.com/coins/images/38043/small/ZKTokenBlack.png",
  AERO:"https://assets.coingecko.com/coins/images/31059/small/token.png",
  PENDLE:"https://assets.coingecko.com/coins/images/15069/small/Pendle_Logo_Normal-03.png",
  STG:"https://assets.coingecko.com/coins/images/24413/small/STG_LOGO.png",
  RDNT:"https://assets.coingecko.com/coins/images/26536/small/RDNT.png",
  GRT:"https://assets.coingecko.com/coins/images/13397/small/Graph_Token.png",
  ENS:"https://assets.coingecko.com/coins/images/19785/small/acatxTm8_400x400.jpg",
  SUSHI:"https://assets.coingecko.com/coins/images/12271/small/512x512_Logo_no_chop.png",
  "1INCH":"https://assets.coingecko.com/coins/images/13469/small/1inch-token.png",
  VELO:"https://assets.coingecko.com/coins/images/25783/small/velo.png",
  BUSD:"https://assets.coingecko.com/coins/images/9576/small/BUSD.png",
  BRETT:"https://assets.coingecko.com/coins/images/35529/small/brett.jpeg",
  ENA:"https://assets.coingecko.com/coins/images/36530/small/ethena.png",
  MNT:"https://assets.coingecko.com/coins/images/30980/small/token.png",
  CRO:"https://assets.coingecko.com/coins/images/7310/small/cro_token_logo.png",
  METIS:"https://assets.coingecko.com/coins/images/15595/small/metis.jpeg",
  DOGE:"https://assets.coingecko.com/coins/images/5/small/dogecoin.png",
  XRP:"https://assets.coingecko.com/coins/images/44/small/xrp-symbol-white-128.png",
  ADA:"https://assets.coingecko.com/coins/images/975/small/cardano.png",
  DOT:"https://assets.coingecko.com/coins/images/12171/small/polkadot.png",
};

const DEFAULT_TOKENS: Record<number, {symbol:string;name:string;address:string;decimals:number}[]> = {
  1:[
    {symbol:"ETH",name:"Ethereum",address:"0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",decimals:18},
    {symbol:"USDC",name:"USD Coin",address:"0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",decimals:6},
    {symbol:"USDT",name:"Tether",address:"0xdAC17F958D2ee523a2206206994597C13D831ec7",decimals:6},
    {symbol:"WBTC",name:"Wrapped Bitcoin",address:"0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599",decimals:8},
    {symbol:"DAI",name:"Dai",address:"0x6B175474E89094C44Da98b954EedeAC495271d0F",decimals:18},
    {symbol:"WETH",name:"Wrapped Ether",address:"0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",decimals:18},
    {symbol:"UNI",name:"Uniswap",address:"0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984",decimals:18},
    {symbol:"LINK",name:"Chainlink",address:"0x514910771AF9Ca656af840dff83E8264EcF986CA",decimals:18},
    {symbol:"AAVE",name:"Aave",address:"0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9",decimals:18},
    {symbol:"LDO",name:"Lido DAO",address:"0x5A98FcBEA516Cf06857215779Fd812CA3beF1B32",decimals:18},
    {symbol:"PEPE",name:"Pepe",address:"0x6982508145454Ce325dDbE47a25d4ec3d2311933",decimals:18},
    {symbol:"SHIB",name:"Shiba Inu",address:"0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE",decimals:18},
    {symbol:"ENA",name:"Ethena",address:"0x57e114B691Db790C35207b2e685D4A43181e6061",decimals:18},
    {symbol:"PENDLE",name:"Pendle",address:"0x808507121B80c02388fAd14726482e061B8da827",decimals:18},
    {symbol:"STG",name:"Stargate",address:"0xAf5191B0De278C7286d6C7CC6ab6BB8A73bA2Cd6",decimals:18},
    {symbol:"ENS",name:"ENS",address:"0xC18360217D8F7Ab5e7c516566761Ea12Ce7F9D72",decimals:18},
    {symbol:"GRT",name:"The Graph",address:"0xc944E90C64B2c07662A292be6244BDf05Cda44a7",decimals:18},
    {symbol:"SUSHI",name:"SushiSwap",address:"0x6B3595068778DD592e39A122f4f5a5cF09C90fE2",decimals:18},
    {symbol:"1INCH",name:"1inch",address:"0x111111111117dC0aa78b770fA6A738034120C302",decimals:18},
    {symbol:"CRV",name:"Curve",address:"0xD533a949740bb3306d119CC777fa900bA034cd52",decimals:18},
  ],
  56:[
    {symbol:"BNB",name:"BNB",address:"0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",decimals:18},
    {symbol:"WBNB",name:"Wrapped BNB",address:"0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",decimals:18},
    {symbol:"USDT",name:"Tether",address:"0x55d398326f99059fF775485246999027B3197955",decimals:18},
    {symbol:"USDC",name:"USD Coin",address:"0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d",decimals:18},
    {symbol:"BUSD",name:"BUSD",address:"0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56",decimals:18},
    {symbol:"CAKE",name:"PancakeSwap",address:"0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82",decimals:18},
    {symbol:"ETH",name:"Ethereum (BSC)",address:"0x2170Ed0880ac9A755fd29B2688956BD959F933F8",decimals:18},
    {symbol:"WBTC",name:"Wrapped Bitcoin",address:"0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c",decimals:18},
    {symbol:"DAI",name:"Dai",address:"0x1AF3F329e8BE154074D8769D1FFa4eE058B1DBc3",decimals:18},
    {symbol:"LINK",name:"Chainlink",address:"0xF8A0BF9cF54Bb92F17374d9e9A321E6a111a51bD",decimals:18},
    {symbol:"DOGE",name:"Dogecoin (BSC)",address:"0xbA2aE424d960c26247Dd6c32edC70B295c744C43",decimals:8},
    {symbol:"XRP",name:"XRP Token",address:"0x1D2F0da169ceB9fC7B3144628dB156f3F6c60dBE",decimals:18},
    {symbol:"ADA",name:"Cardano Token",address:"0x3EE2200Efb3400fAbB9AacF31297cBdD1d435D47",decimals:18},
    {symbol:"DOT",name:"Polkadot Token",address:"0x7083609fCE4d1d8Dc0C979AAb8c869Ea2C873402",decimals:18},
    {symbol:"STG",name:"Stargate",address:"0xB0D502E938ed5f4df2E681fE6E419ff29631d62b",decimals:18},
  ],
  8453:[
    {symbol:"ETH",name:"Ethereum",address:"0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",decimals:18},
    {symbol:"USDC",name:"USD Coin",address:"0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",decimals:6},
    {symbol:"WETH",name:"Wrapped Ether",address:"0x4200000000000000000000000000000000000006",decimals:18},
    {symbol:"DAI",name:"Dai",address:"0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb",decimals:18},
    {symbol:"AERO",name:"Aerodrome",address:"0x940181a94A35A4569E4529A3CDfB74e38FD98631",decimals:18},
    {symbol:"BRETT",name:"Brett",address:"0x532f27101965dd16442E59d40670FaF5eBB142E4",decimals:18},
    {symbol:"USDT",name:"Tether",address:"0xfde4C96c8593536E31F229EA8f37b2ADa2699bb2",decimals:6},
    {symbol:"STG",name:"Stargate",address:"0xE3B53AF74a4BF62Ae5511055290838050bf764Df",decimals:18},
  ],
  42161:[
    {symbol:"ETH",name:"Ethereum",address:"0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",decimals:18},
    {symbol:"USDC",name:"USD Coin",address:"0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8",decimals:6},
    {symbol:"USDT",name:"Tether",address:"0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9",decimals:6},
    {symbol:"ARB",name:"Arbitrum",address:"0x912CE59144191C1204E64559FE8253a0e49E6548",decimals:18},
    {symbol:"WETH",name:"Wrapped Ether",address:"0x82aF49447D8a07e3bd95BD0d56f35241523fBab1",decimals:18},
    {symbol:"GMX",name:"GMX",address:"0xfc5A1A6EB076a2C7aD06eD22C90d7E710E35ad0a",decimals:18},
    {symbol:"RDNT",name:"Radiant",address:"0x3082CC23568eA640225c2467653dB90e9250AaA0",decimals:18},
    {symbol:"PENDLE",name:"Pendle",address:"0x0c880f6761F1af8d9Aa9C466984b80DAb9a8c9e8",decimals:18},
    {symbol:"LINK",name:"Chainlink",address:"0xf97f4df75117a78c1A5a0DBb814Af92458539FB4",decimals:18},
    {symbol:"WBTC",name:"Wrapped Bitcoin",address:"0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f",decimals:8},
  ],
  10:[
    {symbol:"ETH",name:"Ethereum",address:"0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",decimals:18},
    {symbol:"USDC",name:"USD Coin",address:"0x7F5c764cBc14f9669B88837ca1490cCa17c31607",decimals:6},
    {symbol:"USDT",name:"Tether",address:"0x94b008aA00579c1307B0EF2c499aD98a8ce58e58",decimals:6},
    {symbol:"OP",name:"Optimism",address:"0x4200000000000000000000000000000000000042",decimals:18},
    {symbol:"WETH",name:"Wrapped Ether",address:"0x4200000000000000000000000000000000000006",decimals:18},
    {symbol:"AAVE",name:"Aave",address:"0x76FB31fb4af56892A25e32cFC43De717950c9278",decimals:18},
    {symbol:"VELO",name:"Velodrome",address:"0x3c8B650257cFb5f272f799F5e2b4e65093a11a05",decimals:18},
    {symbol:"DAI",name:"Dai",address:"0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1",decimals:18},
  ],
  137:[
    {symbol:"MATIC",name:"Polygon",address:"0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",decimals:18},
    {symbol:"USDC",name:"USD Coin",address:"0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",decimals:6},
    {symbol:"USDT",name:"Tether",address:"0xc2132D05D31c914a87C6611C10748AEb04B58e8F",decimals:6},
    {symbol:"DAI",name:"Dai",address:"0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063",decimals:18},
    {symbol:"WETH",name:"Wrapped Ether",address:"0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619",decimals:18},
    {symbol:"WBTC",name:"Wrapped Bitcoin",address:"0x1BFD67037B42Cf73acF2047067bd4F2C47D9BfD6",decimals:8},
    {symbol:"AAVE",name:"Aave",address:"0xD6DF932A45C0f255f85145f286eA0b292B21C90B",decimals:18},
    {symbol:"LINK",name:"Chainlink",address:"0x53E0bca35eC356BD5ddDFebbD1Fc0fD03FaBad39",decimals:18},
  ],
  43114:[
    {symbol:"AVAX",name:"Avalanche",address:"0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",decimals:18},
    {symbol:"USDC",name:"USD Coin",address:"0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E",decimals:6},
    {symbol:"USDT",name:"Tether",address:"0x9702230A8Ea53601f5cD2dc00fDBc13d4dF4A8c7",decimals:6},
    {symbol:"WAVAX",name:"Wrapped AVAX",address:"0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7",decimals:18},
    {symbol:"WBTC",name:"Wrapped Bitcoin",address:"0x50b7545627a5162F82A992c33b87aDc75187B218",decimals:8},
    {symbol:"LINK",name:"Chainlink",address:"0x5947BB275c521040051D82396192181b413227A3",decimals:18},
    {symbol:"DAI",name:"Dai",address:"0xd586E7F844cEa2F87f50152665BCbc2C279D8d70",decimals:18},
  ],
  250:[
    {symbol:"FTM",name:"Fantom",address:"0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",decimals:18},
    {symbol:"USDC",name:"USD Coin",address:"0x04068DA6C83AFCFA0e13ba15A6696662335D5B75",decimals:6},
    {symbol:"DAI",name:"Dai",address:"0x8D11eC38a3EB5E956B052f67Da8Bdc9bef8Abf3E",decimals:18},
    {symbol:"WBTC",name:"Wrapped Bitcoin",address:"0x321162Cd933E2Be498Cd2267a90534A804051b11",decimals:8},
    {symbol:"WFTM",name:"Wrapped FTM",address:"0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83",decimals:18},
  ],
  534352:[
    {symbol:"ETH",name:"Ethereum",address:"0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",decimals:18},
    {symbol:"USDC",name:"USD Coin",address:"0x06eFdBFf2a14a7c8E15944D1F4A48F9F95F663A4",decimals:6},
    {symbol:"USDT",name:"Tether",address:"0xf55BEC9cafDbE8730f096Aa55dad6D22d44099Df",decimals:6},
    {symbol:"WETH",name:"Wrapped Ether",address:"0x5300000000000000000000000000000000000004",decimals:18},
  ],
  59144:[
    {symbol:"ETH",name:"Ethereum",address:"0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",decimals:18},
    {symbol:"USDC",name:"USD Coin",address:"0x176211869cA2b568f2A7D4EE941E073a821EE1ff",decimals:6},
    {symbol:"USDT",name:"Tether",address:"0xA219439258ca9da29E9Cc4cE5596924745e12B93",decimals:6},
    {symbol:"WBTC",name:"Wrapped Bitcoin",address:"0x3aAB2285ddcDdaD8edf438C1bAB47e1a9D05a9b4",decimals:8},
    {symbol:"WETH",name:"Wrapped Ether",address:"0xe5D7C2a44FfDDf6b295A15c148167daaAf5Cf34e",decimals:18},
  ],
  324:[
    {symbol:"ETH",name:"Ethereum",address:"0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",decimals:18},
    {symbol:"USDC",name:"USD Coin",address:"0x3355df6D4c9C3035724Fd0e3914dE96A5a83aaf4",decimals:6},
    {symbol:"ZK",name:"zkSync",address:"0x5A7d6b2F92C77FAD6CCaBd7EE0624E64907Eaf3E",decimals:18},
    {symbol:"USDT",name:"Tether",address:"0x493257fD37EDB34451f62EDf8D2a0C418852bA4C",decimals:6},
    {symbol:"WETH",name:"Wrapped Ether",address:"0x5AEa5775959fBC2557Cc8789bC1bf90A239D9a91",decimals:18},
  ],
  5000:[
    {symbol:"MNT",name:"Mantle",address:"0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",decimals:18},
    {symbol:"USDC",name:"USD Coin",address:"0x09Bc4E0D864854c6aFB6eB9A9cdF58aC190D0dF9",decimals:6},
    {symbol:"USDT",name:"Tether",address:"0x201EBa5CC46D216Ce6DC03F6a759e8E766e956aE",decimals:6},
    {symbol:"WETH",name:"Wrapped Ether",address:"0xdEAddEaDdeadDEadDEADDEAddEADDEAddead1111",decimals:18},
  ],
  100:[
    {symbol:"xDAI",name:"xDAI",address:"0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",decimals:18},
    {symbol:"USDC",name:"USD Coin",address:"0xDDAfbb505ad214D7b80b1f830fcCc89B60fb7A83",decimals:6},
    {symbol:"USDT",name:"Tether",address:"0x4ECaBa5870353805a9F068101A40E0f32ed605C6",decimals:6},
    {symbol:"WETH",name:"Wrapped Ether",address:"0x6A023CCd1ff6F2045C3309768eAd9E68F978f6e1",decimals:18},
  ],
  25:[
    {symbol:"CRO",name:"Cronos",address:"0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",decimals:18},
    {symbol:"USDC",name:"USD Coin",address:"0xc21223249CA28397B4B6541dfFaEcC539BfF0c59",decimals:6},
    {symbol:"USDT",name:"Tether",address:"0x66e428c3f67a68878562e79A0234c1F83c208770",decimals:6},
    {symbol:"WETH",name:"Wrapped Ether",address:"0xe44Fd7fCb2b1581822D0c862B68222998a0c299a",decimals:18},
  ],
  1088:[
    {symbol:"METIS",name:"Metis",address:"0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",decimals:18},
    {symbol:"USDC",name:"USD Coin",address:"0xEA32A96608495e54156Ae48931A7c20f0dcc1a21",decimals:6},
    {symbol:"USDT",name:"Tether",address:"0xbB06DCA3AE6887fAbF931640f67cab3e3a16F4dC",decimals:6},
  ],
};

interface Token { symbol:string; name:string; address:string; decimals:number; logoURI?:string; }
interface Chain { id:number; name:string; symbol:string; logo:string; explorer:string; rpc:string; }

function ChainLogo({ chain, size=24 }: { chain:Chain; size?:number }) {
  const [err, setErr] = useState(false);
  if (err) return <div style={{width:size,height:size,fontSize:size*0.4}} className="rounded-full bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center font-black text-white">{chain.symbol.slice(0,1)}</div>;
  return <img src={chain.logo} alt={chain.name} style={{width:size,height:size}} className="rounded-full object-cover flex-shrink-0" onError={()=>setErr(true)} />;
}

function TokenLogo({ token, size=32 }: { token:Token; size?:number }) {
  const [err, setErr] = useState(false);
  const logo = token.logoURI || TOKEN_LOGOS[token.symbol.toUpperCase()];
  if (err || !logo) return (
    <div style={{width:size,height:size,fontSize:size*0.36,minWidth:size}} className="rounded-full bg-gradient-to-br from-violet-600 to-blue-600 flex items-center justify-center font-black border border-white/10 text-white flex-shrink-0">
      {token.symbol.slice(0,2)}
    </div>
  );
  return <img src={logo} alt={token.symbol} style={{width:size,height:size,minWidth:size}} className="rounded-full object-cover flex-shrink-0" onError={()=>setErr(true)} />;
}

async function rpcCall(rpcUrl: string, method: string, params: any[]): Promise<any> {
  const res = await fetch(rpcUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ jsonrpc:"2.0", id:1, method, params }),
    signal: AbortSignal.timeout(8000),
  });
  const json = await res.json();
  if (json.error) throw new Error(json.error.message);
  return json.result;
}

async function waitForReceipt(rpcUrl: string, txHash: string, maxRetries=40): Promise<"success"|"failed"|"timeout"> {
  for (let i=0; i<maxRetries; i++) {
    await new Promise(r=>setTimeout(r,3000));
    try {
      const receipt = await rpcCall(rpcUrl, "eth_getTransactionReceipt", [txHash]);
      if (receipt?.status==="0x1") return "success";
      if (receipt?.status==="0x0") return "failed";
    } catch {}
  }
  return "timeout";
}

// ── Server-side proxy helper (avoids CORS for Odos/Magpie) ──────────
async function serverProxy(url: string, options?: RequestInit): Promise<any> {
  const res = await fetch("/api/proxy", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url, method: options?.method||"GET", headers: options?.headers||{}, body: options?.body }),
    signal: AbortSignal.timeout(15000),
  });
  if (!res.ok) throw new Error(`proxy ${res.status}`);
  return res.json();
}

export default function DexBridgePage() {
  const [activeTab, setActiveTab] = useState<"swap"|"bridge">("swap");
  const [fromChain, setFromChain] = useState<Chain>(CHAINS[0]);
  const [toChain, setToChain] = useState<Chain>(CHAINS[4]);
  const [fromToken, setFromToken] = useState<Token>(DEFAULT_TOKENS[1][0]);
  const [toToken, setToToken] = useState<Token>(DEFAULT_TOKENS[1][1]);
  const [amount, setAmount] = useState("");
  const [slippage, setSlippage] = useState("0.5");
  const [showSlippage, setShowSlippage] = useState(false);
  const [quoteLoading, setQuoteLoading] = useState(false);
  const [quote, setQuote] = useState<any>(null);
  const [allQuotes, setAllQuotes] = useState<any[]>([]);
  const [showFromTokenModal, setShowFromTokenModal] = useState(false);
  const [showToTokenModal, setShowToTokenModal] = useState(false);
  const [showFromChainModal, setShowFromChainModal] = useState(false);
  const [showToChainModal, setShowToChainModal] = useState(false);
  const [customTokens, setCustomTokens] = useState<Record<number,Token[]>>({});
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [bridgeQuote, setBridgeQuote] = useState<any>(null);
  const [bridgeLoading, setBridgeLoading] = useState(false);
  const [lastTx, setLastTx] = useState<any>(null);
  const [txStatus, setTxStatus] = useState<"submitted"|"success"|"failed"|"timeout"|null>(null);
  const [txCount, setTxCount] = useState(0);
  const [volume, setVolume] = useState(0);
  const [swapError, setSwapError] = useState("");
  const [approving, setApproving] = useState(false);
  const [balances, setBalances] = useState<Record<string,string>>({});
  const [balanceLoading, setBalanceLoading] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const quoteAbortRef = useRef<AbortController|null>(null);

  useEffect(() => {
    if (typeof window==="undefined") return;
    const savedFromChainId = parseInt(localStorage.getItem("cds_fromChain")||"1");
    const savedToChainId = parseInt(localStorage.getItem("cds_toChain")||"56");
    const fc = CHAINS.find(c=>c.id===savedFromChainId)||CHAINS[0];
    const tc = CHAINS.find(c=>c.id===savedToChainId)||CHAINS[4];
    setFromChain(fc); setToChain(tc);
    setFromToken(DEFAULT_TOKENS[fc.id]?.[0]||DEFAULT_TOKENS[1][0]);
    setToToken(DEFAULT_TOKENS[fc.id]?.[1]||DEFAULT_TOKENS[1][1]);
    const savedTx = parseInt(localStorage.getItem("cds_tx_count")||"0");
    const savedVol = parseFloat(localStorage.getItem("cds_volume")||"0");
    setTxCount(savedTx); setVolume(savedVol);
    setInitialized(true);
    if (!(window as any).ethereum) return;
    (window as any).ethereum.request({method:"eth_accounts"}).then((a:string[])=>{
      if (a[0]) { setWalletAddress(a[0]); setWalletConnected(true); }
    }).catch(()=>{});
    (window as any).ethereum.on("accountsChanged",(a:string[])=>{
      if (a[0]) { setWalletAddress(a[0]); setWalletConnected(true); }
      else { setWalletAddress(""); setWalletConnected(false); }
    });
    (window as any).ethereum.on("chainChanged",(hexId:string)=>{
      const id = parseInt(hexId,16);
      const chain = CHAINS.find(c=>c.id===id);
      if (chain) {
        setFromChain(chain);
        setFromToken(DEFAULT_TOKENS[chain.id]?.[0]||DEFAULT_TOKENS[1][0]);
        setToToken(DEFAULT_TOKENS[chain.id]?.[1]||DEFAULT_TOKENS[1][1]);
        localStorage.setItem("cds_fromChain",chain.id.toString());
        setQuote(null); setAllQuotes([]); setSwapError("");
      }
    });
  }, []);

  useEffect(()=>{ if(!initialized) return; localStorage.setItem("cds_fromChain",fromChain.id.toString()); localStorage.setItem("cds_toChain",toChain.id.toString()); },[fromChain.id,toChain.id,initialized]);
  useEffect(()=>{ if(walletConnected&&walletAddress) fetchBalances(); },[walletConnected,walletAddress,fromChain.id]);

  async function fetchBalances() {
    if (!walletAddress) return;
    setBalanceLoading(true);
    const tokenList = getTokenList(fromChain.id);
    const newBalances: Record<string,string> = {};
    await Promise.allSettled(tokenList.map(async (token)=>{
      try {
        let rawHex: string;
        if (token.address.toLowerCase()===NATIVE_ADDRESS.toLowerCase()) {
          rawHex = await rpcCall(fromChain.rpc,"eth_getBalance",[walletAddress,"latest"]);
        } else {
          rawHex = await rpcCall(fromChain.rpc,"eth_call",[{to:token.address,data:encodeBalanceOf(walletAddress)},"latest"]);
        }
        const bal = parseInt(rawHex,16)/Math.pow(10,token.decimals);
        newBalances[token.address.toLowerCase()] = bal>0?(bal<0.0001?bal.toFixed(8):bal.toFixed(4)):"0";
      } catch { newBalances[token.address.toLowerCase()]="0"; }
    }));
    setBalances(prev=>({...prev,...newBalances}));
    setBalanceLoading(false);
  }

  async function refreshTokenBalance(token: Token) {
    if (!walletAddress) return;
    try {
      let rawHex: string;
      if (token.address.toLowerCase()===NATIVE_ADDRESS.toLowerCase()) {
        rawHex = await rpcCall(fromChain.rpc,"eth_getBalance",[walletAddress,"latest"]);
      } else {
        rawHex = await rpcCall(fromChain.rpc,"eth_call",[{to:token.address,data:encodeBalanceOf(walletAddress)},"latest"]);
      }
      const bal = parseInt(rawHex,16)/Math.pow(10,token.decimals);
      setBalances(prev=>({...prev,[token.address.toLowerCase()]:bal>0?(bal<0.0001?bal.toFixed(8):bal.toFixed(4)):"0"}));
    } catch {}
  }

  function getBalance(token: Token) { return balances[token.address.toLowerCase()]||"0"; }

  function setAmountPercent(pct: number) {
    const bal = parseFloat(getBalance(fromToken));
    if (!bal||bal<=0) return;
    let amt = bal*pct/100;
    if (fromToken.address.toLowerCase()===NATIVE_ADDRESS.toLowerCase()&&pct===100) amt=Math.max(0,amt-0.002);
    setAmount(amt>0?amt.toFixed(6):"0");
  }

  async function switchChainInWallet(chainId: number): Promise<boolean> {
    try {
      await (window as any).ethereum.request({method:"wallet_switchEthereumChain",params:[{chainId:toHex(chainId)}]});
      await new Promise(r=>setTimeout(r,800));
      return true;
    } catch(e:any) {
      if (e.code===4902) {
        const chain = CHAINS.find(c=>c.id===chainId);
        if (!chain) return false;
        try {
          await (window as any).ethereum.request({method:"wallet_addEthereumChain",params:[{chainId:toHex(chainId),chainName:chain.name,nativeCurrency:{name:chain.symbol,symbol:chain.symbol,decimals:18},rpcUrls:[chain.rpc],blockExplorerUrls:[chain.explorer.replace("/tx/","")]}]});
          await new Promise(r=>setTimeout(r,1000));
          return true;
        } catch { return false; }
      }
      return false;
    }
  }

  async function ensureApproval(tokenAddress: string, spender: string, amt: bigint): Promise<boolean> {
    if (tokenAddress.toLowerCase()===NATIVE_ADDRESS.toLowerCase()) return true;
    if (!spender) return true;
    try {
      const res = await rpcCall(fromChain.rpc,"eth_call",[{to:tokenAddress,data:encodeAllowance(walletAddress,spender)},"latest"]);
      if (BigInt(res)>=amt) return true;
      setApproving(true); setSwapError("");
      const MAX = BigInt("0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff");
      const txHash = await (window as any).ethereum.request({method:"eth_sendTransaction",params:[{from:walletAddress,to:tokenAddress,data:encodeApprove(spender,MAX)}]});
      const status = await waitForReceipt(fromChain.rpc,txHash,20);
      setApproving(false);
      if (status==="failed") { setSwapError("Approval transaction failed."); return false; }
      return true;
    } catch(e:any) {
      setApproving(false);
      setSwapError(e.code===4001?"Approval rejected.":"Approval failed: "+(e.message||""));
      return false;
    }
  }

  function addTx(amountUsd: number) {
    const newTx = txCount+1; const newVol = volume+amountUsd;
    setTxCount(newTx); setVolume(newVol);
    localStorage.setItem("cds_tx_count",newTx.toString());
    localStorage.setItem("cds_volume",newVol.toString());
  }

  function formatVolume(v: number) {
    const b = 200000+v;
    if (b>=1e9) return "$"+(b/1e9).toFixed(2)+"B";
    if (b>=1e6) return "$"+(b/1e6).toFixed(2)+"M";
    return "$"+(b/1e3).toFixed(1)+"K";
  }
  function formatTxCount(n: number) {
    const b = 12000+n;
    if (b>=1e6) return (b/1e6).toFixed(1)+"M";
    return (b/1e3).toFixed(1)+"K";
  }

  async function connectWallet() {
    if (typeof window!=="undefined"&&(window as any).ethereum) {
      try {
        const a = await (window as any).ethereum.request({method:"eth_requestAccounts"});
        if (a[0]) { setWalletAddress(a[0]); setWalletConnected(true); }
      } catch(e) { console.error(e); }
    } else { alert("Please install MetaMask or Rabby Wallet!"); }
  }
  function shortAddress(addr: string) { return addr?`${addr.slice(0,6)}...${addr.slice(-4)}`:""; }

  const getTokenList = useCallback((chainId: number)=>{
    return [...(DEFAULT_TOKENS[chainId]||DEFAULT_TOKENS[1]),...(customTokens[chainId]||[])];
  },[customTokens]);

  function getSortedTokens(chainId: number, search: string): Token[] {
    let list = getTokenList(chainId);
    if (search) {
      const s = search.toLowerCase();
      list = list.filter(t=>t.symbol.toLowerCase().includes(s)||t.name.toLowerCase().includes(s)||t.address.toLowerCase()===s);
    }
    return list.sort((a,b)=>{
      const ba = parseFloat(balances[a.address.toLowerCase()]||"0");
      const bb = parseFloat(balances[b.address.toLowerCase()]||"0");
      if (bb!==ba) return bb-ba;
      return a.symbol.localeCompare(b.symbol);
    });
  }

  // ─── SWAP QUOTE ────────────────────────────────────────────────────
  async function getSwapQuote() {
    if (!amount||parseFloat(amount)<=0) return;
    if (quoteAbortRef.current) quoteAbortRef.current.abort();
    const abortController = new AbortController();
    quoteAbortRef.current = abortController;
    const { signal } = abortController;

    setQuoteLoading(true); setQuote(null); setAllQuotes([]); setSwapError("");
    const chainId = fromChain.id;
    const sellAmount = BigInt(Math.floor(parseFloat(amount)*Math.pow(10,fromToken.decimals))).toString();
    const quotes: any[] = [];
    const kyberChain = getKyberChain(chainId);
    const ooChain = getOOChain(chainId);
    const inchChainId = get1inchChain(chainId);
    const odosChainId = getOdosChain(chainId);
    const walletAddr = walletAddress||"0x0000000000000000000000000000000000000000";

    const isNativeFrom = fromToken.address.toLowerCase()===NATIVE_ADDRESS.toLowerCase();
    const isNativeTo = toToken.address.toLowerCase()===NATIVE_ADDRESS.toLowerCase();

    // OpenOcean uses EEE address for native
    const ooFromAddr = isNativeFrom ? NATIVE_ADDRESS : fromToken.address;
    const ooToAddr = isNativeTo ? NATIVE_ADDRESS : toToken.address;

    // Odos uses chain-specific native address
    const odosFromAddr = isNativeFrom ? getNativeForOdos(chainId) : fromToken.address;
    const odosToAddr = isNativeTo ? getNativeForOdos(chainId) : toToken.address;

    await Promise.allSettled([

      // ── KyberSwap ─────────────────────────────────────────────────
      (async()=>{
        if (!kyberChain) return;
        try {
          const r = await fetch(
            `https://aggregator-api.kyberswap.com/${kyberChain}/api/v1/routes`+
            `?tokenIn=${fromToken.address}&tokenOut=${toToken.address}&amountIn=${sellAmount}`+
            `&feeAmount=8&chargeFeeBy=currency_out&isInBps=true&feeReceiver=${INTEGRATOR_WALLET}`,
            { signal:AbortSignal.timeout(10000) }
          );
          if (!r.ok||signal.aborted) return;
          const d = await r.json();
          const rs = d?.data?.routeSummary;
          if (!rs?.amountOut) return;
          const buyAmt = parseFloat(rs.amountOut)/Math.pow(10,toToken.decimals);
          if (buyAmt<=0) return;
          const txRes = await fetch(
            `https://aggregator-api.kyberswap.com/${kyberChain}/api/v1/route/build`,
            {
              method:"POST", headers:{"Content-Type":"application/json"},
              body: JSON.stringify({
                routeSummary:rs, sender:walletAddr, recipient:walletAddr,
                slippageTolerance:Math.round(parseFloat(slippage)*100),
                deadline:Math.floor(Date.now()/1000)+1200,
                feeConfig:{ feeBps:8, chargeFeeBy:"currency_out", feeReceiver:INTEGRATOR_WALLET, isInBps:true },
              }),
              signal:AbortSignal.timeout(10000),
            }
          );
          const txData = txRes.ok?await txRes.json():null;
          quotes.push({ source:"KyberSwap", buyAmount:buyAmt.toFixed(8), gasUsd:rs.gasUsd?`~$${parseFloat(rs.gasUsd).toFixed(3)}`:"~$0.10", txData:txData?.data, routerAddress:txData?.data?.routerAddress, routeSummary:rs });
        } catch(e:any) { if(e.name!=="AbortError") console.error("KyberSwap:",e); }
      })(),

      // ── Paraswap ─────────────────────────────────────────────────
      (async()=>{
        try {
          const r = await fetch(
            `https://apiv5.paraswap.io/prices/?srcToken=${fromToken.address}&destToken=${toToken.address}&amount=${sellAmount}&srcDecimals=${fromToken.decimals}&destDecimals=${toToken.decimals}&side=SELL&network=${chainId}`,
            { signal:AbortSignal.timeout(10000) }
          );
          if (!r.ok||signal.aborted) return;
          const d = await r.json();
          const buyAmt = parseFloat(d.priceRoute?.destAmount||"0")/Math.pow(10,toToken.decimals);
          if (buyAmt<=0) return;
          quotes.push({ source:"Paraswap", buyAmount:buyAmt.toFixed(8), gasUsd:`~$${parseFloat(d.priceRoute?.gasCostUSD||"0").toFixed(3)}`, priceRoute:d.priceRoute, tokenTransferProxy:d.priceRoute?.tokenTransferProxy });
        } catch(e:any) { if(e.name!=="AbortError") console.error("Paraswap:",e); }
      })(),

      // ── OpenOcean ─────────────────────────────────────────────────
      (async()=>{
        if (!ooChain) return;
        try {
          const r = await fetch(
            `https://open-api.openocean.finance/v3/${ooChain}/quote?inTokenAddress=${ooFromAddr}&outTokenAddress=${ooToAddr}&amount=${parseFloat(amount)}&gasPrice=5&slippage=${slippage}`,
            { signal:AbortSignal.timeout(10000) }
          );
          if (!r.ok||signal.aborted) return;
          const d = await r.json();
          const buyAmt = parseFloat(d.data?.outAmount||"0")/Math.pow(10,toToken.decimals);
          if (buyAmt<=0) return;
          const gasEst = parseFloat(d.data?.estimatedGas||"0")*5e-9*2000;
          quotes.push({ source:"OpenOcean", buyAmount:buyAmt.toFixed(8), gasUsd:`~$${gasEst.toFixed(3)}`, ooChain, ooFromAddr, ooToAddr });
        } catch(e:any) { if(e.name!=="AbortError") console.error("OpenOcean:",e); }
      })(),

      // ── 1inch ────────────────────────────────────────────────────
      (async()=>{
        if (!inchChainId) return;
        try {
          const r = await fetch(
            `https://api.1inch.dev/swap/v6.0/${inchChainId}/quote?src=${fromToken.address}&dst=${toToken.address}&amount=${sellAmount}`,
            { headers:{"Authorization":"Bearer eplMH3KFwolnEEMRCBzilq6qkEa0B5zg"}, signal:AbortSignal.timeout(10000) }
          );
          if (!r.ok||signal.aborted) return;
          const d = await r.json();
          const buyAmt = parseFloat(d.dstAmount||"0")/Math.pow(10,toToken.decimals);
          if (buyAmt<=0) return;
          quotes.push({ source:"1inch", buyAmount:buyAmt.toFixed(8), gasUsd:`~$${(parseFloat(d.gas||"0")*5e-9*2000).toFixed(3)}`, inchChainId, srcToken:fromToken.address, dstToken:toToken.address, sellAmount });
        } catch(e:any) { if(e.name!=="AbortError") console.error("1inch:",e); }
      })(),

      // ── Odos (via proxy to avoid CORS) ────────────────────────────
      (async()=>{
        if (!odosChainId) return;
        try {
          const d = await serverProxy("https://api.odos.xyz/sor/quote/v2", {
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body: JSON.stringify({
              chainId:odosChainId,
              inputTokens:[{tokenAddress:odosFromAddr, amount:sellAmount}],
              outputTokens:[{tokenAddress:odosToAddr, proportion:1}],
              slippageLimitPercent:parseFloat(slippage),
              referralCode:0, disableRFQs:false, compact:true,
            }),
          });
          if (signal.aborted) return;
          const buyAmt = parseFloat(d.outAmounts?.[0]||"0")/Math.pow(10,toToken.decimals);
          if (buyAmt<=0) return;
          quotes.push({ source:"Odos", buyAmount:buyAmt.toFixed(8), gasUsd:`~$${parseFloat(d.gasEstimateValue||"0").toFixed(3)}`, odosPath:d.pathId, odosChainId, odosFromAddr, odosToAddr });
        } catch(e:any) { if(e.name!=="AbortError") console.error("Odos:",e); }
      })(),

      // ── Magpie (via proxy to avoid CORS) ──────────────────────────
      (async()=>{
        try {
          const d = await serverProxy(
            `https://api.magpiefi.xyz/aggregator/quote?network=${chainId}&fromTokenAddress=${fromToken.address}&toTokenAddress=${toToken.address}&sellAmount=${sellAmount}&slippage=${parseFloat(slippage)/100}`
          );
          if (signal.aborted) return;
          const buyAmt = parseFloat(d.buyAmount||d.toTokenAmount||"0")/Math.pow(10,toToken.decimals);
          if (buyAmt<=0) return;
          quotes.push({ source:"Magpie", buyAmount:buyAmt.toFixed(8), gasUsd:"~$0.05", magpieData:d });
        } catch(e:any) { if(e.name!=="AbortError") console.error("Magpie:",e); }
      })(),

    ]);

    if (signal.aborted) return;
    quotes.sort((a,b)=>parseFloat(b.buyAmount)-parseFloat(a.buyAmount));
    setAllQuotes(quotes);
    if (quotes.length>0) setQuote(quotes[0]);
    else setSwapError("No routes found. Try a different amount or token pair.");
    setQuoteLoading(false);
  }

  // ─── BRIDGE QUOTE ─────────────────────────────────────────────────
  async function getBridgeQuote() {
    if (!amount||parseFloat(amount)<=0) return;
    setBridgeLoading(true); setBridgeQuote(null); setSwapError("");
    const fromAmt = BigInt(Math.floor(parseFloat(amount)*Math.pow(10,fromToken.decimals))).toString();
    const walletAddr = walletAddress||"0x0000000000000000000000000000000000000000";
    try {
      // Try LI.FI via proxy first
      const d = await serverProxy(
        `https://li.quest/v1/quote?fromChain=${fromChain.id}&toChain=${toChain.id}`+
        `&fromToken=${fromToken.address}&toToken=${toToken.address}&fromAmount=${fromAmt}`+
        `&fromAddress=${walletAddr}&integrator=cryptodropscout&fee=0.0008&referrer=${INTEGRATOR_WALLET}`
      );
      if (d.estimate?.toAmount) {
        const toAmt = (parseFloat(d.estimate.toAmount)/Math.pow(10,toToken.decimals)).toFixed(6);
        setBridgeQuote({ toAmount:toAmt, estimatedTime:d.estimate.executionDuration, tool:d.tool, source:"LI.FI", txData:d.transactionRequest, approvalAddress:d.estimate?.approvalAddress });
        setBridgeLoading(false); return;
      }
    } catch(e) { console.error("LIFI:",e); }
    // Fallback: try KyberSwap cross-chain if same-chain not applicable
    setBridgeLoading(false);
    setSwapError("No bridge route found for this pair. Try different tokens or chains.");
  }

  // ─── EXECUTE SWAP ──────────────────────────────────────────────────
  async function executeSwap() {
    if (!walletConnected) { connectWallet(); return; }
    if (!quote) { getSwapQuote(); return; }
    setSwapError(""); setTxStatus(null); setLastTx(null);
    try {
      await switchChainInWallet(fromChain.id);
      const sellAmountBig = BigInt(Math.floor(parseFloat(amount)*Math.pow(10,fromToken.decimals)));
      let txParams: any = null;
      const walletAddr = walletAddress;
      const isNative = fromToken.address.toLowerCase()===NATIVE_ADDRESS.toLowerCase();

      if (quote.source==="KyberSwap"&&quote.txData) {
        const spender = quote.routerAddress||quote.txData?.routerAddress;
        if (spender&&!isNative) { const ok = await ensureApproval(fromToken.address,spender,sellAmountBig); if(!ok) return; }
        txParams = {
          from:walletAddr, to:quote.txData.routerAddress,
          data:quote.txData.data,
          value:isNative?"0x"+sellAmountBig.toString(16):"0x0",
          gasLimit:"0x493E0", // 300k gas limit for safety
        };

      } else if (quote.source==="Paraswap"&&quote.priceRoute) {
        const spender = quote.tokenTransferProxy||"0x216b4b4ba9f3e719726886d34a177484278bfcae";
        if (!isNative) { const ok = await ensureApproval(fromToken.address,spender,sellAmountBig); if(!ok) return; }
        const txRes = await fetch(
          `https://apiv5.paraswap.io/transactions/${fromChain.id}?ignoreChecks=true`,
          { method:"POST", headers:{"Content-Type":"application/json"},
            body:JSON.stringify({ srcToken:fromToken.address, destToken:toToken.address, srcAmount:sellAmountBig.toString(), destAmount:quote.priceRoute.destAmount, priceRoute:quote.priceRoute, userAddress:walletAddr, txOrigin:walletAddr, receiver:walletAddr, slippage:parseFloat(slippage)*100 })
          }
        );
        if (txRes.ok) {
          const txData = await txRes.json();
          txParams = { from:walletAddr, to:txData.to, data:txData.data, value:txData.value||"0x0" };
        }

      } else if (quote.source==="OpenOcean"&&quote.ooChain) {
        const r = await fetch(
          `https://open-api.openocean.finance/v3/${quote.ooChain}/swap_quote?inTokenAddress=${quote.ooFromAddr}&outTokenAddress=${quote.ooToAddr}&amount=${parseFloat(amount)}&gasPrice=5&slippage=${slippage}&account=${walletAddr}`,
          { signal:AbortSignal.timeout(10000) }
        );
        if (r.ok) {
          const d = await r.json();
          const spender = d.data?.to;
          if (spender&&!isNative) { const ok = await ensureApproval(fromToken.address,spender,sellAmountBig); if(!ok) return; }
          const value = isNative ? "0x"+sellAmountBig.toString(16) : (d.data?.value||"0x0");
          txParams = { from:walletAddr, to:d.data?.to, data:d.data?.data, value };
        }

      } else if (quote.source==="1inch") {
        const r = await fetch(
          `https://api.1inch.dev/swap/v6.0/${quote.inchChainId}/swap?src=${fromToken.address}&dst=${toToken.address}&amount=${quote.sellAmount}&from=${walletAddr}&slippage=${slippage}&disableEstimate=true`,
          { headers:{"Authorization":"Bearer eplMH3KFwolnEEMRCBzilq6qkEa0B5zg"}, signal:AbortSignal.timeout(10000) }
        );
        if (r.ok) {
          const d = await r.json();
          const spender = "0x111111125421cA6dc452d289314280a0f8842A65";
          if (!isNative) { const ok = await ensureApproval(fromToken.address,spender,sellAmountBig); if(!ok) return; }
          txParams = { from:walletAddr, to:d.tx?.to, data:d.tx?.data, value:d.tx?.value||"0x0" };
        }

      } else if (quote.source==="Odos"&&quote.odosPath) {
        const d = await serverProxy("https://api.odos.xyz/sor/assemble", {
          method:"POST", headers:{"Content-Type":"application/json"},
          body: JSON.stringify({ pathId:quote.odosPath, userAddr:walletAddr }),
        });
        const spender = d.transaction?.to;
        if (spender&&!isNative) { const ok = await ensureApproval(fromToken.address,spender,sellAmountBig); if(!ok) return; }
        txParams = { from:walletAddr, to:d.transaction?.to, data:d.transaction?.data, value:d.transaction?.value||"0x0" };
      }

      if (!txParams?.to) { setSwapError("Could not build transaction. Please try again."); return; }
      const txHash = await (window as any).ethereum.request({method:"eth_sendTransaction",params:[txParams]});
      setLastTx({hash:txHash,chain:fromChain});
      setTxStatus("submitted");
      addTx(parseFloat(amount)*2000);
      waitForReceipt(fromChain.rpc,txHash,40).then(async(status)=>{
        setTxStatus(status);
        if (status==="success") {
          await refreshTokenBalance(fromToken);
          await refreshTokenBalance(toToken);
          setTimeout(()=>fetchBalances(),3000);
        }
      });
    } catch(e:any) {
      if (e.code===4001) setSwapError("Transaction rejected.");
      else setSwapError(e.message||"Transaction failed.");
    }
  }

  // ─── EXECUTE BRIDGE ────────────────────────────────────────────────
  async function executeBridge() {
    if (!walletConnected) { connectWallet(); return; }
    if (!bridgeQuote?.txData) { getBridgeQuote(); return; }
    setSwapError(""); setTxStatus(null); setLastTx(null);
    try {
      await switchChainInWallet(fromChain.id);
      const sellAmountBig = BigInt(Math.floor(parseFloat(amount)*Math.pow(10,fromToken.decimals)));
      if (bridgeQuote.approvalAddress&&fromToken.address.toLowerCase()!==NATIVE_ADDRESS.toLowerCase()) {
        const ok = await ensureApproval(fromToken.address,bridgeQuote.approvalAddress,sellAmountBig);
        if(!ok) return;
      }
      const txHash = await (window as any).ethereum.request({method:"eth_sendTransaction",params:[{from:walletAddress,to:bridgeQuote.txData.to,data:bridgeQuote.txData.data,value:bridgeQuote.txData.value||"0x0"}]});
      setLastTx({hash:txHash,chain:fromChain});
      setTxStatus("submitted");
      addTx(parseFloat(amount)*2000);
      waitForReceipt(fromChain.rpc,txHash,40).then(status=>{ setTxStatus(status); if(status==="success") fetchBalances(); });
    } catch(e:any) {
      setSwapError(e.code===4001?"Transaction rejected.":e.message||"Bridge failed.");
    }
  }

  useEffect(()=>{
    if (!amount||parseFloat(amount)<=0) { setQuote(null); setAllQuotes([]); setBridgeQuote(null); return; }
    const t = setTimeout(()=>{ if(activeTab==="swap") getSwapQuote(); else getBridgeQuote(); },700);
    return ()=>clearTimeout(t);
  },[amount,fromToken.address,toToken.address,fromChain.id,toChain.id,activeTab]);

  // ─── TOKEN MODAL (PancakeSwap style) ──────────────────────────────
  const TokenModal = ({onSelect,onClose,title,chainId}:{onSelect:(t:Token)=>void;onClose:()=>void;title:string;chainId:number}) => {
    const [search, setSearch] = useState("");
    const [importResult, setImportResult] = useState<Token|null>(null);
    const [importLoading, setImportLoading] = useState(false);

    async function doSearch(addr: string) {
      if (!addr||addr.length<10) return;
      setImportLoading(true); setImportResult(null);
      try {
        const r = await fetch(`https://api.coingecko.com/api/v3/coins/ethereum/contract/${addr}`,{signal:AbortSignal.timeout(5000)});
        if (r.ok) { const d=await r.json(); setImportResult({symbol:d.symbol?.toUpperCase()||"???",name:d.name||"Unknown",address:addr,decimals:d.detail_platforms?.ethereum?.decimal_place||18,logoURI:d.image?.small}); setImportLoading(false); return; }
      } catch {}
      try {
        const chain = CHAINS.find(c=>c.id===chainId)||CHAINS[0];
        const res = await rpcCall(chain.rpc,"eth_call",[{to:addr,data:"0x313ce567"},"latest"]);
        const decimals = parseInt(res,16)||18;
        setImportResult({symbol:"TOKEN",name:"Custom Token",address:addr,decimals});
      } catch { setImportResult({symbol:"TOKEN",name:"Custom Token",address:addr,decimals:18}); }
      setImportLoading(false);
    }

    const sorted = getSortedTokens(chainId,search);
    const currentChain = CHAINS.find(c=>c.id===chainId)||CHAINS[0];

    return (
      <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center" style={{background:"rgba(0,0,0,0.75)",backdropFilter:"blur(6px)"}}>
        <div className="w-full md:max-w-[420px] flex flex-col overflow-hidden" style={{background:"#1c1f2e",border:"1px solid rgba(255,255,255,0.08)",borderRadius:"24px 24px 0 0",maxHeight:"90vh",boxShadow:"0 -8px 40px rgba(0,0,0,0.6)"}}>

          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4" style={{borderBottom:"1px solid rgba(255,255,255,0.06)"}}>
            <h3 className="font-black text-white text-lg">{title}</h3>
            <button onClick={onClose} className="w-9 h-9 rounded-full flex items-center justify-center text-gray-400 hover:text-white text-lg transition" style={{background:"rgba(255,255,255,0.08)"}}>✕</button>
          </div>

          {/* Network badge */}
          <div className="px-5 pt-3 pb-1 flex items-center gap-2">
            <ChainLogo chain={currentChain} size={16}/>
            <span className="text-xs text-gray-400 font-semibold">Network: {currentChain.name}</span>
          </div>

          {/* Search */}
          <div className="px-4 py-2">
            <div className="flex items-center gap-3 rounded-2xl px-4 py-3" style={{background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.1)"}}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-gray-400 flex-shrink-0"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
              <input type="text" placeholder="Search name or paste address" value={search}
                onChange={e=>{setSearch(e.target.value);if(e.target.value.startsWith("0x")&&e.target.value.length>=40)doSearch(e.target.value);else setImportResult(null);}}
                className="flex-1 bg-transparent outline-none text-sm text-white placeholder-gray-500" autoFocus />
              {search&&<button onClick={()=>{setSearch("");setImportResult(null);}} className="text-gray-500 hover:text-white text-xs">✕</button>}
            </div>
          </div>

          {/* Import loading */}
          {importLoading&&<p className="text-xs text-violet-400 text-center py-2 animate-pulse px-4">🔍 Searching token...</p>}

          {/* Import result */}
          {importResult&&!importLoading&&(
            <div className="mx-4 my-1 p-3 rounded-2xl flex items-center justify-between" style={{background:"rgba(234,179,8,0.08)",border:"1px solid rgba(234,179,8,0.25)"}}>
              <div className="flex items-center gap-3">
                <TokenLogo token={importResult} size={36}/>
                <div>
                  <p className="font-black text-sm text-white">{importResult.symbol}</p>
                  <p className="text-xs text-gray-400 font-mono">{importResult.address.slice(0,12)}...</p>
                </div>
              </div>
              <button onClick={()=>{
                setCustomTokens(prev=>({...prev,[chainId]:[...(prev[chainId]||[]).filter(t=>t.address!==importResult.address),importResult]}));
                onSelect(importResult); onClose();
              }} className="px-4 py-2 rounded-xl text-xs font-black text-black" style={{background:"linear-gradient(90deg,#f59e0b,#fbbf24)"}}>Import</button>
            </div>
          )}

          {/* Quick picks — PancakeSwap style pill buttons */}
          {!search&&(
            <div className="px-4 py-3" style={{borderBottom:"1px solid rgba(255,255,255,0.05)"}}>
              <div className="flex flex-wrap gap-2">
                {(DEFAULT_TOKENS[chainId]||DEFAULT_TOKENS[1]).slice(0,7).map(t=>(
                  <button key={t.address} onClick={()=>{onSelect(t);onClose();}}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full transition hover:scale-105 active:scale-95"
                    style={{background:"rgba(255,255,255,0.07)",border:"1px solid rgba(255,255,255,0.12)"}}>
                    <TokenLogo token={t} size={18}/>
                    <span className="text-xs font-bold text-white">{t.symbol}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Token list — clean PancakeSwap style */}
          <div className="flex-1 overflow-y-auto" style={{scrollbarWidth:"thin",scrollbarColor:"rgba(255,255,255,0.1) transparent"}}>
            {sorted.length===0&&!importResult&&(
              <div className="flex flex-col items-center justify-center py-16 gap-2">
                <div className="text-4xl">🔍</div>
                <p className="text-gray-400 text-sm font-semibold">No tokens found</p>
                <p className="text-gray-600 text-xs">Paste a contract address to import</p>
              </div>
            )}
            {sorted.map(token=>{
              const bal = getBalance(token);
              const hasBal = parseFloat(bal)>0;
              return (
                <button key={token.address} onClick={()=>{onSelect(token);onClose();}}
                  className="w-full flex items-center gap-3 px-5 py-3.5 text-left transition active:scale-[0.99]"
                  style={{borderBottom:"1px solid rgba(255,255,255,0.03)"}}
                  onMouseEnter={e=>(e.currentTarget.style.background="rgba(255,255,255,0.05)")}
                  onMouseLeave={e=>(e.currentTarget.style.background="transparent")}>
                  {/* Logo */}
                  <TokenLogo token={token} size={40}/>
                  {/* Symbol + name */}
                  <div className="flex-1 min-w-0">
                    <p className="font-black text-sm text-white leading-tight">{token.symbol}</p>
                    <p className="text-xs text-gray-500 truncate leading-tight mt-0.5">{token.name}</p>
                  </div>
                  {/* Balance */}
                  <div className="text-right flex-shrink-0 ml-2">
                    {balanceLoading
                      ? <div className="w-14 h-3.5 rounded-full animate-pulse" style={{background:"rgba(255,255,255,0.08)"}}/>
                      : <p className={`text-sm font-bold tabular-nums ${hasBal?"text-white":"text-gray-700"}`}>{hasBal?bal:"0"}</p>
                    }
                    {hasBal&&<p className="text-[10px] text-gray-500 mt-0.5">{token.symbol}</p>}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  // ─── CHAIN MODAL ─────────────────────────────────────────────────
  const ChainModal = ({onSelect,onClose,selectedId}:{onSelect:(c:Chain)=>void;onClose:()=>void;selectedId:number}) => (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center" style={{background:"rgba(0,0,0,0.75)",backdropFilter:"blur(6px)"}}>
      <div className="w-full md:max-w-[420px] overflow-hidden" style={{background:"#1c1f2e",border:"1px solid rgba(255,255,255,0.08)",borderRadius:"24px 24px 0 0",maxHeight:"80vh",boxShadow:"0 -8px 40px rgba(0,0,0,0.6)"}}>
        <div className="flex items-center justify-between px-5 py-4" style={{borderBottom:"1px solid rgba(255,255,255,0.06)"}}>
          <h3 className="font-black text-white text-lg">Select Network</h3>
          <button onClick={onClose} className="w-9 h-9 rounded-full flex items-center justify-center text-gray-400 hover:text-white font-bold transition" style={{background:"rgba(255,255,255,0.08)"}}>✕</button>
        </div>
        <div className="overflow-y-auto" style={{maxHeight:"65vh",scrollbarWidth:"thin",scrollbarColor:"rgba(255,255,255,0.1) transparent"}}>
          {CHAINS.map(chain=>(
            <button key={chain.id} onClick={()=>{onSelect(chain);onClose();}}
              className="w-full flex items-center gap-3 px-5 py-3.5 text-left transition"
              style={{borderBottom:"1px solid rgba(255,255,255,0.03)",background:selectedId===chain.id?"rgba(139,92,246,0.12)":"transparent"}}
              onMouseEnter={e=>{if(selectedId!==chain.id)e.currentTarget.style.background="rgba(255,255,255,0.04)";}}
              onMouseLeave={e=>{e.currentTarget.style.background=selectedId===chain.id?"rgba(139,92,246,0.12)":"transparent";}}>
              <ChainLogo chain={chain} size={36}/>
              <div className="flex-1">
                <p className="font-bold text-sm text-white leading-tight">{chain.name}</p>
                <p className="text-xs text-gray-500 leading-tight mt-0.5">{chain.symbol}</p>
              </div>
              {selectedId===chain.id&&(
                <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-black" style={{background:"rgba(139,92,246,0.3)",color:"#a78bfa",border:"1px solid rgba(139,92,246,0.4)"}}>✓</div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  const txStatusInfo = {
    submitted:{ color:"#f59e0b",bg:"rgba(245,158,11,0.1)",border:"rgba(245,158,11,0.3)",icon:"⏳",text:"Transaction Submitted — Waiting for confirmation..." },
    success:{   color:"#22c55e",bg:"rgba(34,197,94,0.1)", border:"rgba(34,197,94,0.3)", icon:"✅",text:"Transaction Confirmed!" },
    failed:{    color:"#ef4444",bg:"rgba(239,68,68,0.1)",  border:"rgba(239,68,68,0.3)",  icon:"❌",text:"Transaction Failed on-chain." },
    timeout:{   color:"#f59e0b",bg:"rgba(245,158,11,0.1)",border:"rgba(245,158,11,0.3)",icon:"⌛",text:"Transaction taking long — check explorer." },
  };

  return (
    <main className="min-h-screen text-white" style={{fontFamily:"'DM Sans',system-ui,sans-serif",background:"#050a18"}}>

      {/* Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div style={{position:"absolute",top:-300,left:-200,width:700,height:700,background:"radial-gradient(circle,rgba(109,40,217,0.18),transparent 65%)"}}/>
        <div style={{position:"absolute",bottom:-300,right:-200,width:700,height:700,background:"radial-gradient(circle,rgba(37,99,235,0.15),transparent 65%)"}}/>
        <div style={{position:"absolute",top:"40%",left:"50%",transform:"translate(-50%,-50%)",width:500,height:500,background:"radial-gradient(circle,rgba(6,182,212,0.08),transparent 65%)"}}/>
        <div style={{position:"absolute",inset:0,backgroundImage:"linear-gradient(rgba(139,92,246,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(139,92,246,0.03) 1px,transparent 1px)",backgroundSize:"40px 40px"}}/>
      </div>

      {/* NAVBAR */}
      <nav className="relative z-50 sticky top-0" style={{background:"rgba(5,10,24,0.85)",backdropFilter:"blur(20px)",borderBottom:"1px solid rgba(255,255,255,0.06)"}}>
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2.5 flex-shrink-0 group">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center font-black text-sm transition group-hover:scale-105" style={{background:"linear-gradient(135deg,#7c3aed,#2563eb)"}}>C</div>
            <span className="font-black text-lg tracking-tight" style={{background:"linear-gradient(90deg,#a78bfa,#60a5fa)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>CryptoDropScout</span>
          </Link>
          <div className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-gray-400 hover:text-white transition text-sm font-medium">Home</Link>
            <Link href="/airdrops" className="text-gray-400 hover:text-white transition text-sm font-medium">Airdrops</Link>
          </div>
          <button onClick={walletConnected?()=>{setWalletConnected(false);setWalletAddress("");}:connectWallet}
            className="hidden md:flex px-4 py-2.5 rounded-xl font-bold text-sm transition items-center gap-2"
            style={walletConnected?{background:"rgba(34,197,94,0.1)",border:"1px solid rgba(34,197,94,0.25)",color:"#4ade80"}:{background:"linear-gradient(135deg,#7c3aed,#2563eb)",color:"white",boxShadow:"0 4px 15px rgba(124,58,237,0.3)"}}>
            {walletConnected?<><span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"/>{shortAddress(walletAddress)}</>:"Connect Wallet"}
          </button>
          <div className="md:hidden flex items-center gap-2">
            <button onClick={walletConnected?()=>{setWalletConnected(false);setWalletAddress("");}:connectWallet}
              className="px-3 py-2 rounded-xl font-bold text-xs"
              style={walletConnected?{background:"rgba(34,197,94,0.1)",border:"1px solid rgba(34,197,94,0.25)",color:"#4ade80"}:{background:"linear-gradient(135deg,#7c3aed,#2563eb)"}}>
              {walletConnected?shortAddress(walletAddress):"Connect"}
            </button>
            <button onClick={()=>setMobileMenuOpen(!mobileMenuOpen)}
              className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-gray-300"
              style={{background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.08)"}}>
              {mobileMenuOpen?"✕":"☰"}
            </button>
          </div>
        </div>
        {mobileMenuOpen&&(
          <div className="md:hidden px-4 py-3" style={{borderTop:"1px solid rgba(255,255,255,0.06)",background:"rgba(5,10,24,0.95)"}}>
            <Link href="/" className="block py-2.5 text-gray-400 hover:text-white text-sm font-medium">🏠 Home</Link>
            <Link href="/airdrops" className="block py-2.5 text-gray-400 hover:text-white text-sm font-medium">🪂 Airdrops</Link>
          </div>
        )}
      </nav>

      {/* HERO */}
      <div className="relative z-10 text-center pt-10 pb-5 px-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-5 text-sm font-semibold" style={{background:"rgba(139,92,246,0.1)",border:"1px solid rgba(139,92,246,0.25)",color:"#c4b5fd"}}>
          <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse"/>
          Best rates · KyberSwap · Paraswap · OpenOcean · 1inch · Odos · Magpie · LI.FI
        </div>
        <h1 className="text-4xl md:text-5xl font-black mb-3 tracking-tight">
          <span style={{background:"linear-gradient(90deg,#a78bfa,#60a5fa,#34d399)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>Swap & Bridge</span>
        </h1>
        <p className="text-gray-400 text-sm max-w-sm mx-auto">Zero platform fee. Best aggregated rates across all EVM chains.</p>
      </div>

      {/* MAIN CARD */}
      <div className="relative z-10 max-w-[480px] mx-auto px-4 pb-6">

        {/* Tab */}
        <div className="flex gap-1.5 mb-4 p-1 rounded-2xl" style={{background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.07)"}}>
          <button onClick={()=>{setActiveTab("swap");setQuote(null);setAllQuotes([]);setSwapError("");setTxStatus(null);}}
            className="flex-1 py-3 rounded-xl font-bold text-sm transition"
            style={activeTab==="swap"?{background:"linear-gradient(135deg,#7c3aed,#2563eb)",color:"white",boxShadow:"0 4px 16px rgba(124,58,237,0.35)"}:{color:"#6b7280"}}>
            🔄 Swap
          </button>
          <button onClick={()=>{setActiveTab("bridge");setBridgeQuote(null);setSwapError("");setTxStatus(null);}}
            className="flex-1 py-3 rounded-xl font-bold text-sm transition"
            style={activeTab==="bridge"?{background:"linear-gradient(135deg,#7c3aed,#2563eb)",color:"white",boxShadow:"0 4px 16px rgba(124,58,237,0.35)"}:{color:"#6b7280"}}>
            🌉 Bridge
          </button>
        </div>

        <div className="rounded-3xl p-5 shadow-2xl" style={{background:"linear-gradient(145deg,#0c1426,#0a1020)",border:"1px solid rgba(139,92,246,0.15)",boxShadow:"0 20px 60px rgba(0,0,0,0.5),inset 0 1px 0 rgba(255,255,255,0.05)"}}>

          {/* Bridge chain selector */}
          {activeTab==="bridge"&&(
            <div className="flex items-center gap-2 mb-4">
              <button onClick={()=>setShowFromChainModal(true)} className="flex-1 flex items-center gap-2 px-3 py-2.5 rounded-xl font-semibold text-sm transition hover:opacity-80" style={{background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.08)"}}>
                <ChainLogo chain={fromChain} size={20}/><span className="truncate flex-1 text-left text-white">{fromChain.name}</span><span className="text-gray-500 text-xs ml-auto">▼</span>
              </button>
              <button onClick={()=>{const t=fromChain;setFromChain(toChain);setToChain(t);setBridgeQuote(null);setSwapError("");}} className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-gray-400 hover:text-white transition text-lg flex-shrink-0" style={{background:"rgba(139,92,246,0.1)",border:"1px solid rgba(139,92,246,0.2)"}}>⇄</button>
              <button onClick={()=>setShowToChainModal(true)} className="flex-1 flex items-center gap-2 px-3 py-2.5 rounded-xl font-semibold text-sm transition hover:opacity-80" style={{background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.08)"}}>
                <ChainLogo chain={toChain} size={20}/><span className="truncate flex-1 text-left text-white">{toChain.name}</span><span className="text-gray-500 text-xs ml-auto">▼</span>
              </button>
            </div>
          )}

          {/* FROM */}
          <div className="rounded-2xl p-4 mb-2" style={{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.07)"}}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">You Pay</span>
              {activeTab==="swap"&&(
                <button onClick={()=>setShowFromChainModal(true)} className="flex items-center gap-1.5 text-xs font-semibold transition rounded-lg px-2 py-1 hover:opacity-80" style={{background:"rgba(139,92,246,0.1)",color:"#a78bfa",border:"1px solid rgba(139,92,246,0.2)"}}>
                  <ChainLogo chain={fromChain} size={12}/>{fromChain.name} <span className="text-[10px]">▼</span>
                </button>
              )}
            </div>
            {walletConnected&&(
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs text-gray-500">Balance:</span>
                  <span className="text-xs font-bold text-white">
                    {balanceLoading?<span className="inline-block w-12 h-2.5 rounded bg-white/10 animate-pulse"/>:`${getBalance(fromToken)} ${fromToken.symbol}`}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  {[25,50,75,100].map(pct=>(
                    <button key={pct} onClick={()=>setAmountPercent(pct)} className="px-2 py-1 rounded-lg text-[11px] font-black transition hover:scale-105 active:scale-95" style={{background:"linear-gradient(135deg,rgba(124,58,237,0.15),rgba(37,99,235,0.15))",border:"1px solid rgba(124,58,237,0.3)",color:"#a78bfa"}}>
                      {pct===100?"MAX":`${pct}%`}
                    </button>
                  ))}
                </div>
              </div>
            )}
            <div className="flex items-center gap-3">
              <input type="number" placeholder="0.00" value={amount} onChange={e=>setAmount(e.target.value)}
                className="flex-1 bg-transparent text-3xl font-black outline-none placeholder-gray-800 min-w-0 text-white"
                min="0" style={{letterSpacing:"-0.02em"}}/>
              <button onClick={()=>setShowFromTokenModal(true)} className="flex items-center gap-2 px-3 py-2.5 rounded-2xl font-bold text-sm whitespace-nowrap flex-shrink-0 transition hover:opacity-80 active:scale-95" style={{background:"rgba(139,92,246,0.15)",border:"1px solid rgba(139,92,246,0.3)"}}>
                <TokenLogo token={fromToken} size={26}/>
                <span className="text-white font-black">{fromToken.symbol}</span>
                <span className="text-gray-500 text-xs">▼</span>
              </button>
            </div>
          </div>

          {/* Arrow */}
          <div className="flex justify-center my-2">
            <button onClick={()=>{const t=fromToken;setFromToken(toToken);setToToken(t);setQuote(null);setAllQuotes([]);setBridgeQuote(null);setSwapError("");setTxStatus(null);}}
              className="w-10 h-10 rounded-2xl flex items-center justify-center font-black text-gray-400 hover:text-white transition active:rotate-180"
              style={{background:"rgba(139,92,246,0.12)",border:"1px solid rgba(139,92,246,0.25)",fontSize:20,transition:"all 0.3s ease"}}>
              ↕
            </button>
          </div>

          {/* TO */}
          <div className="rounded-2xl p-4 mb-4" style={{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.07)"}}>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">You Receive</span>
              <div className="flex items-center gap-1.5 text-xs font-semibold rounded-lg px-2 py-1" style={{background:"rgba(255,255,255,0.05)",color:"#6b7280"}}>
                <ChainLogo chain={activeTab==="bridge"?toChain:fromChain} size={12}/>
                {activeTab==="bridge"?toChain.name:fromChain.name}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex-1 min-w-0">
                {quoteLoading||bridgeLoading?(
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-32 rounded-xl animate-pulse" style={{background:"rgba(139,92,246,0.15)"}}/>
                    <span className="text-xs text-violet-400 animate-pulse">Finding best rate...</span>
                  </div>
                ):(
                  <span className="text-3xl font-black tracking-tight" style={{color:(quote?.buyAmount||bridgeQuote?.toAmount)?"white":"#374151",letterSpacing:"-0.02em"}}>
                    {quote?.buyAmount||bridgeQuote?.toAmount||"0.00"}
                  </span>
                )}
              </div>
              <button onClick={()=>setShowToTokenModal(true)} className="flex items-center gap-2 px-3 py-2.5 rounded-2xl font-bold text-sm whitespace-nowrap flex-shrink-0 transition hover:opacity-80 active:scale-95" style={{background:"rgba(139,92,246,0.15)",border:"1px solid rgba(139,92,246,0.3)"}}>
                <TokenLogo token={toToken} size={26}/>
                <span className="text-white font-black">{toToken.symbol}</span>
                <span className="text-gray-500 text-xs">▼</span>
              </button>
            </div>
          </div>

          {/* Rate comparison */}
          {allQuotes.length>0&&!quoteLoading&&(
            <div className="mb-4">
              <p className="text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-2 flex items-center gap-1.5">📊 Rate Comparison</p>
              <div className="space-y-1.5">
                {allQuotes.map((q,i)=>(
                  <button key={q.source} onClick={()=>setQuote(q)}
                    className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs transition active:scale-[0.99]"
                    style={{background:quote?.source===q.source?"rgba(139,92,246,0.15)":"rgba(255,255,255,0.03)",border:`1px solid ${quote?.source===q.source?"rgba(139,92,246,0.4)":"rgba(255,255,255,0.06)"}`}}>
                    <div className="flex items-center gap-1.5 flex-1">
                      {i===0&&<span className="text-yellow-400">⭐</span>}
                      <span className="font-black text-white">{q.source}</span>
                      {i===0&&<span className="text-[10px] px-1.5 py-0.5 rounded-full font-black" style={{background:"rgba(34,197,94,0.15)",color:"#4ade80",border:"1px solid rgba(34,197,94,0.25)"}}>BEST</span>}
                    </div>
                    <span className="font-black text-green-400 tabular-nums">{q.buyAmount}</span>
                    <span className="text-gray-600 text-[10px]">{q.gasUsd}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quote info */}
          {(quote||bridgeQuote)&&!quoteLoading&&!bridgeLoading&&(
            <div className="rounded-2xl p-3.5 mb-4" style={{background:"rgba(139,92,246,0.08)",border:"1px solid rgba(139,92,246,0.18)"}}>
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between"><span className="text-gray-400">Best Rate via</span><span className="font-black text-violet-300">{quote?.source||bridgeQuote?.source}</span></div>
                {bridgeQuote?.estimatedTime&&<div className="flex justify-between"><span className="text-gray-400">Estimated Time</span><span className="font-semibold text-white">{Math.ceil(bridgeQuote.estimatedTime/60)} min</span></div>}
                {bridgeQuote?.tool&&<div className="flex justify-between"><span className="text-gray-400">Bridge Protocol</span><span className="font-semibold text-white">{bridgeQuote.tool}</span></div>}
                <div className="flex justify-between pt-1" style={{borderTop:"1px solid rgba(255,255,255,0.06)"}}>
                  <span className="text-gray-400">Platform Fee</span>
                  <span className="font-black text-green-400">0% Free ✓</span>
                </div>
              </div>
            </div>
          )}

          {/* Approving */}
          {approving&&(
            <div className="rounded-2xl p-3 mb-4 flex items-center gap-3" style={{background:"rgba(245,158,11,0.08)",border:"1px solid rgba(245,158,11,0.25)"}}>
              <div className="w-5 h-5 rounded-full border-2 border-yellow-400 border-t-transparent animate-spin flex-shrink-0"/>
              <p className="text-xs text-yellow-300 font-semibold">Approving token — confirm in your wallet</p>
            </div>
          )}

          {/* Error */}
          {swapError&&(
            <div className="rounded-2xl p-3 mb-4 flex items-start gap-2" style={{background:"rgba(239,68,68,0.08)",border:"1px solid rgba(239,68,68,0.25)"}}>
              <span className="text-red-400 flex-shrink-0">❌</span>
              <p className="text-xs text-red-400 leading-relaxed">{swapError}</p>
            </div>
          )}

          {/* Tx status */}
          {lastTx&&txStatus&&(
            <div className="rounded-2xl p-3 mb-4" style={{background:txStatusInfo[txStatus].bg,border:`1px solid ${txStatusInfo[txStatus].border}`}}>
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <span>{txStatusInfo[txStatus].icon}</span>
                  <span className="text-xs font-bold" style={{color:txStatusInfo[txStatus].color}}>{txStatusInfo[txStatus].text}</span>
                </div>
                <a href={lastTx.chain.explorer+lastTx.hash} target="_blank" rel="noreferrer" className="text-[11px] text-blue-400 hover:underline flex-shrink-0 flex items-center gap-1 font-semibold">
                  {lastTx.hash.slice(0,6)}...{lastTx.hash.slice(-4)} ↗
                </a>
              </div>
              {txStatus==="submitted"&&(
                <div className="mt-2 h-1 rounded-full overflow-hidden" style={{background:"rgba(255,255,255,0.1)"}}>
                  <div className="h-full rounded-full animate-pulse" style={{width:"60%",background:txStatusInfo[txStatus].color}}/>
                </div>
              )}
            </div>
          )}

          {/* Slippage */}
          <div className="flex items-center justify-between mb-4">
            <button onClick={()=>setShowSlippage(!showSlippage)} className="text-xs text-gray-400 hover:text-white transition flex items-center gap-1.5">
              ⚙️ Slippage: <span className="text-white font-bold">{slippage}%</span> <span className="text-gray-600 text-[10px]">{showSlippage?"▲":"▼"}</span>
            </button>
            {showSlippage&&(
              <div className="flex gap-1.5">
                {["0.1","0.5","1.0","3.0"].map(s=>(
                  <button key={s} onClick={()=>{setSlippage(s);setShowSlippage(false);}} className="px-2.5 py-1.5 rounded-xl text-xs font-black transition" style={{background:slippage===s?"linear-gradient(135deg,#7c3aed,#2563eb)":"rgba(255,255,255,0.06)",color:slippage===s?"white":"#6b7280",border:`1px solid ${slippage===s?"transparent":"rgba(255,255,255,0.08)"}`}}>
                    {s}%
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* CTA */}
          <button onClick={activeTab==="swap"?executeSwap:executeBridge} disabled={quoteLoading||bridgeLoading||approving}
            className="w-full py-4 rounded-2xl font-black text-base transition disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.99]"
            style={{background:"linear-gradient(135deg,#7c3aed,#2563eb)",boxShadow:"0 8px 32px rgba(124,58,237,0.4)",letterSpacing:"0.01em"}}>
            <span className="flex items-center justify-center gap-2">
              {!walletConnected?"🔗 Connect Wallet"
               :approving?(<><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"/>Approving Token...</>)
               :(quoteLoading||bridgeLoading)?(<><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"/>Getting Best Rate...</>)
               :activeTab==="swap"?"🔄 Swap Now":"🌉 Bridge Now"}
            </span>
          </button>
        </div>
      </div>

      {/* STATS */}
      <div className="relative z-10 max-w-[480px] mx-auto px-4 pb-12">
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-2xl p-5 text-center" style={{background:"linear-gradient(145deg,#0c1426,#0a1020)",border:"1px solid rgba(255,255,255,0.07)"}}>
            <p className="text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-1">Total Transactions</p>
            <p className="text-3xl font-black tabular-nums" style={{background:"linear-gradient(90deg,#a78bfa,#60a5fa)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>{formatTxCount(txCount)}</p>
          </div>
          <div className="rounded-2xl p-5 text-center" style={{background:"linear-gradient(145deg,#0c1426,#0a1020)",border:"1px solid rgba(255,255,255,0.07)"}}>
            <p className="text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-1">Total Volume</p>
            <p className="text-3xl font-black tabular-nums" style={{background:"linear-gradient(90deg,#60a5fa,#34d399)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>{formatVolume(volume)}</p>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="relative z-10 px-4 py-8" style={{borderTop:"1px solid rgba(255,255,255,0.06)"}}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-sm">© 2026 CryptoDropScout. All rights reserved.</p>
          <div className="flex items-center gap-5 flex-wrap justify-center">
            <a href="https://t.me/CryptoDropScoutt" target="_blank" rel="noreferrer" className="text-gray-500 hover:text-white transition text-sm font-medium">✈ Telegram</a>
            <a href="https://x.com/cryptodrpscout" target="_blank" rel="noreferrer" className="text-gray-500 hover:text-white transition text-sm font-medium">𝕏 Twitter</a>
            <a href="https://github.com/Hunterkak/cryptodropscout" target="_blank" rel="noreferrer" className="text-gray-500 hover:text-white transition text-sm font-medium">GitHub</a>
          </div>
        </div>
      </footer>

      {/* MODALS */}
      {showFromTokenModal&&<TokenModal onSelect={t=>{setFromToken(t);setQuote(null);setAllQuotes([]);setSwapError("");setTxStatus(null);}} onClose={()=>setShowFromTokenModal(false)} title="Select Token" chainId={fromChain.id}/>}
      {showToTokenModal&&<TokenModal onSelect={t=>{setToToken(t);setQuote(null);setAllQuotes([]);setSwapError("");setTxStatus(null);}} onClose={()=>setShowToTokenModal(false)} title="Select Token" chainId={activeTab==="bridge"?toChain.id:fromChain.id}/>}
      {showFromChainModal&&<ChainModal onSelect={c=>{setFromChain(c);setFromToken(DEFAULT_TOKENS[c.id]?.[0]||DEFAULT_TOKENS[1][0]);setToToken(DEFAULT_TOKENS[c.id]?.[1]||DEFAULT_TOKENS[1][1]);setQuote(null);setAllQuotes([]);setSwapError("");setTxStatus(null);setTimeout(()=>fetchBalances(),300);}} onClose={()=>setShowFromChainModal(false)} selectedId={fromChain.id}/>}
      {showToChainModal&&<ChainModal onSelect={c=>{setToChain(c);setToToken(DEFAULT_TOKENS[c.id]?.[0]||DEFAULT_TOKENS[1][0]);setBridgeQuote(null);setSwapError("");}} onClose={()=>setShowToChainModal(false)} selectedId={toChain.id}/>}
    </main>
  );
}