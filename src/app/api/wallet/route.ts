import { NextRequest, NextResponse } from 'next/server';

import {
  getAirdrops,
} from '@/lib/getAirdrops';

const ALCHEMY_API_KEY =
  "aPz40BBB53PxEF6pcotHZ";

const ETHERSCAN_API_KEY =
  "CQPT2YSEPZQF4W2A74HUGHPQWT6EJSIZPD";

const BSCSCAN_API_KEY =
  "CQPT2YSEPZQF4W2A74HUGHPQWT6EJSIZPD";

const BASESCAN_API_KEY =
  "CQPT2YSEPZQF4W2A74HUGHPQWT6EJSIZPD";

const COVALENT_API_KEY =
  "cqt_rQq8mvdkyJ9GF4k9QbGcxvF8PVMr";

const DEBANK_API_KEY =
  "c4bfb33080c4765655618258de1844d69ecadcbd";

const PRICE_CACHE =
  new Map<string, number>();

const CHAINS = [

  {
    name: 'Ethereum',
    chainId: 1,
    covalent: 'eth-mainnet',
  },

  {
    name: 'BNB Chain',
    chainId: 56,
    covalent: 'bsc-mainnet',
  },

  {
    name: 'Polygon',
    chainId: 137,
    covalent: 'matic-mainnet',
  },

  {
    name: 'Arbitrum',
    chainId: 42161,
    covalent: 'arbitrum-mainnet',
  },

  {
    name: 'Optimism',
    chainId: 10,
    covalent: 'optimism-mainnet',
  },

  {
    name: 'Base',
    chainId: 8453,
    covalent: 'base-mainnet',
  },

  {
    name: 'Linea',
    chainId: 59144,
    covalent: 'linea-mainnet',
  },

  {
    name: 'zkSync',
    chainId: 324,
    covalent: 'zksync-mainnet',
  },

  {
    name: 'Scroll',
    chainId: 534352,
    covalent: 'scroll-mainnet',
  },

  {
    name: 'Avalanche',
    chainId: 43114,
    covalent: 'avalanche-mainnet',
  },

  {
    name: 'Fantom',
    chainId: 250,
    covalent: 'fantom-mainnet',
  },

  {
    name: 'Mantle',
    chainId: 5000,
    covalent: 'mantle-mainnet',
  },

  {
    name: 'Mode',
    chainId: 34443,
    covalent: 'mode-mainnet',
  },

  {
    name: 'Blast',
    chainId: 81457,
    covalent: 'blast-mainnet',
  },

  {
    name: 'Metis',
    chainId: 1088,
    covalent: 'metis-mainnet',
  },

];

const VERIFIED_SYMBOLS = [

  'ETH',
  'WETH',
  'USDT',
  'USDC',
  'DAI',
  'BNB',
  'ARB',
  'OP',
  'MATIC',
  'POL',
  'LINK',
  'UNI',
  'AAVE',
  'PEPE',
  'SHIB',
  'FLOKI',
  'BONK',
  'WIF',
  'STRK',
  'ZK',
  'ENA',
  'BRETT',
  'TOSHI',
  'PENDLE',
  'GMX',
  'RDNT',
  'CAKE',
  'XVS',
  'OFC',
  'BTC',
  'WBTC',
  'SOL',
  'DOGE',
  'TRX',
  'TON',
  'XRP',
  'ADA',
  'DOT',
  'AVAX',
  'ATOM',
  'NEAR',
  'SEI',
  'SUI',
  'APT',
  'INJ',
  'RUNE',
  'JUP',
  'PYTH',
  'FET',
  'RNDR',
  'TIA',
  'MANTA',
  'ALT',
  'DYM',
  'AEVO',
  'ETHFI',
  'REZ',
  'PIXEL',
  'PORTAL',
  'NOT',
  'CATI',
  'MEME',
  'BOME',
  'AI',
  'COOKIE',
  'BANANA',

];

const TOKEN_LOGOS: Record<string, string> = {

  ETH:
    'https://assets.coingecko.com/coins/images/279/large/ethereum.png',

  WETH:
    'https://assets.coingecko.com/coins/images/2518/large/weth.png',

  USDT:
    'https://assets.coingecko.com/coins/images/325/large/Tether.png',

  USDC:
    'https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png',

  BNB:
    'https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png',

  ARB:
    'https://assets.coingecko.com/coins/images/16547/large/arb.jpg',

  OP:
    'https://assets.coingecko.com/coins/images/25244/large/Optimism.png',

  POL:
    'https://assets.coingecko.com/coins/images/4713/large/polygon.png',

  STRK:
    'https://assets.coingecko.com/coins/images/26433/large/starknet.png',

  ZK:
    'https://assets.coingecko.com/coins/images/11045/large/zksync.jpeg',

  OFC:
    'https://assets.coingecko.com/coins/images/35569/large/onefootball.png',

};

const COINGECKO_IDS: Record<string, string> = {

  ETH: 'ethereum',
  WETH: 'weth',
  BTC: 'bitcoin',
  WBTC: 'wrapped-bitcoin',
  USDT: 'tether',
  USDC: 'usd-coin',
  DAI: 'dai',
  BNB: 'binancecoin',
  ARB: 'arbitrum',
  OP: 'optimism',
  MATIC: 'matic-network',
  POL: 'matic-network',
  LINK: 'chainlink',
  UNI: 'uniswap',
  AAVE: 'aave',
  PEPE: 'pepe',
  SHIB: 'shiba-inu',
  FLOKI: 'floki',
  BONK: 'bonk',
  WIF: 'dogwifcoin',
  STRK: 'starknet',
  ZK: 'zksync',
  ENA: 'ethena',
  BRETT: 'brett',
  TOSHI: 'toshi',
  PENDLE: 'pendle',
  GMX: 'gmx',
  RDNT: 'radiant-capital',
  OFC: 'onefootball',

};

const SPAM_WORDS = [

  'claim',
  'reward',
  'voucher',
  'bonus',
  'visit',
  '.com',
  '.io',
  '.xyz',
  'telegram',
  't.me',
  'http',
  'https',

];

function isSpam(
  name = '',
  symbol = ''
) {

  const text =
    `${name} ${symbol}`.toLowerCase();

  return SPAM_WORDS.some(
    (w) =>
      text.includes(w)
  );
}

function isValidToken(
  symbol: string,
  usd: number
) {

  symbol =
    symbol.toUpperCase();

  if (
    VERIFIED_SYMBOLS.includes(
      symbol
    )
  ) {
    return true;
  }

  if (usd >= 25) {
    return true;
  }

  return false;
}

async function fetchPrice(
  symbol: string
) {

  symbol =
    symbol.toUpperCase();

  if (
    PRICE_CACHE.has(symbol)
  ) {

    return PRICE_CACHE.get(
      symbol
    )!;
  }

  const geckoId =
    COINGECKO_IDS[symbol];

  if (!geckoId)
    return null;

  try {

    const res =
      await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=${geckoId}&vs_currencies=usd`
      );

    if (res.ok) {

      const data =
        await res.json();

      const price =
        data[geckoId]?.usd;

      if (price) {

        PRICE_CACHE.set(
          symbol,
          price
        );

        return price;
      }
    }

  } catch {}

  return null;
}

async function fetchEthPrice() {

  try {

    const res =
      await fetch(
        'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd'
      );

    const data =
      await res.json();

    return (
      data.ethereum?.usd ??
      2500
    );

  } catch {

    return 2500;
  }
}

async function fetchDebankTokens(
  address: string
) {

  try {

    const res =
      await fetch(
        `https://pro-openapi.debank.com/v1/user/all_token_list?id=${address}&is_all=true`,
        {
          headers: {
            AccessKey:
              DEBANK_API_KEY,
          },
        }
      );

    if (!res.ok)
      return [];

    const data =
      await res.json();

    return data
      .filter((t: any) => {

        if (
          !t.symbol ||
          !t.name
        ) {
          return false;
        }

        if (
          isSpam(
            t.name,
            t.symbol
          )
        ) {
          return false;
        }

        const usd =
          Number(
            t.amount || 0
          ) *
          Number(
            t.price || 0
          );

        if (usd < 0.05)
          return false;

        if (
          usd > 100000000
        ) {
          return false;
        }

        return isValidToken(
          t.symbol,
          usd
        );
      })
      .map((t: any) => ({

        symbol:
          t.optimized_symbol ||
          t.symbol,

        name:
          t.name,

        balance:
          Number(
            t.amount || 0
          ).toFixed(4),

        usdValue:
          (
            Number(
              t.amount || 0
            ) *
            Number(
              t.price || 0
            )
          ).toFixed(2),

        network:
          t.chain ||
          'Unknown',

        logo:
          t.logo_url ||
          TOKEN_LOGOS[
            (
              t.symbol || ''
            ).toUpperCase()
          ] ||
          `https://assets.coincap.io/assets/icons/${(
            t.symbol || 'eth'
          ).toLowerCase()}@2x.png`,

      }));

  } catch {

    return [];
  }
}

async function fetchCovalentTokens(
  address: string
) {

  const all: any[] =
    [];

  await Promise.allSettled(

    CHAINS.map(
      async (
        chain
      ) => {

        try {

          const res =
            await fetch(
              `https://api.covalenthq.com/v1/${chain.covalent}/address/${address}/balances_v2/?key=${COVALENT_API_KEY}&no-spam=true&no-nft-fetch=true`
            );

          if (
            !res.ok
          ) {
            return;
          }

          const data =
            await res.json();

          const items =
            data.data?.items ||
            [];

          for (const t of items) {

            const symbol =
              (
                t.contract_ticker_symbol ||
                ''
              ).toUpperCase();

            const name =
              t.contract_name;

            if (
              !symbol ||
              !name
            ) {
              continue;
            }

            if (
              isSpam(
                name,
                symbol
              )
            ) {
              continue;
            }

            const balance =
              Number(
                t.balance || 0
              ) /
              Math.pow(
                10,
                t.contract_decimals ||
                  18
              );

            if (
              balance <= 0
            ) {
              continue;
            }

            let price =
              t.quote_rate;

            if (
              !price ||
              price <= 0
            ) {

              price =
                await fetchPrice(
                  symbol
                );
            }

            if (
              !price
            ) {
              continue;
            }

            const usd =
              balance * price;

            if (
              usd < 0.05
            ) {
              continue;
            }

            if (
              !isValidToken(
                symbol,
                usd
              )
            ) {
              continue;
            }

            all.push({

              symbol,

              name,

              balance:
                balance.toFixed(
                  4
                ),

              usdValue:
                usd.toFixed(2),

              network:
                chain.name,

              logo:
                TOKEN_LOGOS[
                  symbol
                ] ||
                `https://assets.coincap.io/assets/icons/${symbol.toLowerCase()}@2x.png`,

            });
          }

        } catch {}
      }
    )
  );

  return all;
}

function mergeTokens(
  ...arrays: any[]
) {

  const map =
    new Map();

  arrays.flat().forEach(
    (token: any) => {

      const key =
        `${token.symbol}_${token.network}`;

      const existing =
        map.get(key);

      if (
        !existing ||
        parseFloat(
          token.usdValue
        ) >
          parseFloat(
            existing.usdValue
          )
      ) {

        map.set(
          key,
          token
        );
      }
    }
  );

  return Array.from(
    map.values()
  ).sort(
    (
      a: any,
      b: any
    ) =>
      parseFloat(
        b.usdValue
      ) -
      parseFloat(
        a.usdValue
      )
  );
}

async function fetchClaimedAirdrops(
  address: string
) {

  const results: any[] =
    [];

  const VALID = [

    'ARB',
    'OP',
    'ZK',
    'STRK',
    'ENA',
    'SCR',
    'W',
    'PENDLE',
    'OFC',

  ];

  await Promise.allSettled(

    CHAINS.slice(
      0,
      6
    ).map(
      async (
        chain
      ) => {

        try {

          let url = '';

          if (
            chain.chainId === 56
          ) {

            url =
              `https://api.bscscan.com/api?module=account&action=tokentx&address=${address}&sort=desc&apikey=${BSCSCAN_API_KEY}`;

          } else if (
            chain.chainId === 8453
          ) {

            url =
              `https://api.basescan.org/api?module=account&action=tokentx&address=${address}&sort=desc&apikey=${BASESCAN_API_KEY}`;

          } else if (
            chain.chainId === 1
          ) {

            url =
              `https://api.etherscan.io/api?module=account&action=tokentx&address=${address}&sort=desc&apikey=${ETHERSCAN_API_KEY}`;

          } else {

            url =
              `https://api.etherscan.io/v2/api?chainid=${chain.chainId}&module=account&action=tokentx&address=${address}&sort=desc&apikey=${ETHERSCAN_API_KEY}`;
          }

          const res =
            await fetch(
              url
            );

          if (
            !res.ok
          ) {
            return;
          }

          const data =
            await res.json();

          const txs =
            data.result || [];

          const seen =
            new Set();

          for (const tx of txs) {

            const symbol =
              (
                tx.tokenSymbol ||
                ''
              ).toUpperCase();

            const name =
              (
                tx.tokenName ||
                ''
              ).toLowerCase();

            if (
              isSpam(
                name,
                symbol
              )
            ) {
              continue;
            }

            const decimals =
              parseInt(
                tx.tokenDecimal ||
                  '18'
              );

            const amount =
              parseFloat(
                tx.value
              ) /
              Math.pow(
                10,
                decimals
              );

            if (
              name.includes(
                'onefootball'
              )
            ) {

              results.push({

                symbol:
                  'OFC',

                name:
                  'OneFootball Club',

                amount:
                  amount.toFixed(
                    2
                  ),

                date:
                  new Date(
                    parseInt(
                      tx.timeStamp
                    ) *
                      1000
                  ).toLocaleDateString(),

                status:
                  'Claimed',

                chain:
                  chain.name,

              });

              continue;
            }

            if (
              !VALID.includes(
                symbol
              )
            ) {
              continue;
            }

            const key =
              `${symbol}_${chain.chainId}`;

            if (
              seen.has(
                key
              )
            ) {
              continue;
            }

            seen.add(
              key
            );

            results.push({

              symbol,

              name:
                tx.tokenName,

              amount:
                amount.toFixed(
                  2
                ),

              date:
                new Date(
                  parseInt(
                    tx.timeStamp
                  ) *
                    1000
                ).toLocaleDateString(),

              status:
                'Claimed',

              chain:
                chain.name,

            });
          }

        } catch {}
      }
    )
  );

  return results;
}

async function fetchFirestoreAirdrops(
  address: string
) {

  try {

    const adminAirdrops =
      await getAirdrops();

    const results: any[] =
      [];

    await Promise.all(

      adminAirdrops.map(
        async (
          drop: any
        ) => {

          try {

            let url = '';

            if (
              drop.chainId === 56
            ) {

              url =
                `https://api.bscscan.com/api?module=account&action=tokentx&address=${address}&sort=desc&apikey=${BSCSCAN_API_KEY}`;

            } else if (
              drop.chainId === 8453
            ) {

              url =
                `https://api.basescan.org/api?module=account&action=tokentx&address=${address}&sort=desc&apikey=${BASESCAN_API_KEY}`;

            } else if (
              drop.chainId === 1
            ) {

              url =
                `https://api.etherscan.io/api?module=account&action=tokentx&address=${address}&sort=desc&apikey=${ETHERSCAN_API_KEY}`;

            } else {

              url =
                `https://api.etherscan.io/v2/api?chainid=${drop.chainId}&module=account&action=tokentx&address=${address}&sort=desc&apikey=${ETHERSCAN_API_KEY}`;
            }

            const res =
              await fetch(
                url
              );

            if (
              !res.ok
            ) {
              return;
            }

            const data =
              await res.json();

            const txs =
              data.result || [];

            const found =
              txs.find(
                (tx: any) => {

                  const txContract =
                    (
                      tx.contractAddress ||
                      ''
                    ).toLowerCase();

                  const dropContract =
                    (
                      drop.contract ||
                      ''
                    ).toLowerCase();

                  const txName =
                    (
                      tx.tokenName ||
                      ''
                    ).toLowerCase();

                  const dropName =
                    (
                      drop.title ||
                      ''
                    ).toLowerCase();

                  const txSymbol =
                    (
                      tx.tokenSymbol ||
                      ''
                    ).toLowerCase();

                  const dropSymbol =
                    (
                      drop.tokenSymbol ||
                      ''
                    ).toLowerCase();

                  return (

                    txContract ===
                      dropContract ||

                    txName.includes(
                      dropName
                    ) ||

                    txSymbol ===
                      dropSymbol

                  );
                }
              );

            if (
              found
            ) {

              results.push({

                symbol:
                  drop.tokenSymbol,

                name:
                  drop.title,

                amount:
                  (
                    parseFloat(
                      found.value
                    ) /
                    Math.pow(
                      10,
                      parseInt(
                        found.tokenDecimal ||
                          '18'
                      )
                    )
                  ).toFixed(
                    2
                  ),

                date:
                  new Date(
                    parseInt(
                      found.timeStamp
                    ) *
                      1000
                  ).toLocaleDateString(),

                status:
                  'Claimed',

                logo: '',

              });

            } else {

              results.push({

                symbol:
                  drop.tokenSymbol,

                name:
                  drop.title,

                amount:
                  '?',

                date:
                  'Pending',

                status:
                  'Pending',

                logo: '',

              });
            }

          } catch {}
        }
      )
    );

    return results;

  } catch {

    return [];
  }
}

export async function GET(
  req: NextRequest
) {

  const {
    searchParams,
  } =
    new URL(
      req.url
    );

  const address =
    searchParams.get(
      'address'
    );

  if (
    !address
  ) {

    return NextResponse.json(
      {
        error:
          'Wallet address required',
      },
      {
        status: 400,
      }
    );
  }

  try {

    const ethPrice =
      await fetchEthPrice();

    let ethBalance =
      null;

    let ethUsdValue =
      0;

    try {

      const ethRes =
        await fetch(
          `https://eth-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
          {
            method:
              'POST',
            headers:
              {
                'Content-Type':
                  'application/json',
              },
            body: JSON.stringify(
              {
                jsonrpc:
                  '2.0',
                id: 1,
                method:
                  'eth_getBalance',
                params:
                  [
                    address,
                    'latest',
                  ],
              }
            ),
          }
        );

      if (
        ethRes.ok
      ) {

        const ethData =
          await ethRes.json();

        const eth =
          parseInt(
            ethData.result,
            16
          ) / 1e18;

        ethBalance =
          eth.toFixed(
            4
          );

        ethUsdValue =
          eth *
          ethPrice;
      }

    } catch {}

    const [

      debankTokens,

      covalentTokens,

      claimedAirdrops,

      firestoreAirdrops,

    ] =
      await Promise.all([

        fetchDebankTokens(
          address
        ),

        fetchCovalentTokens(
          address
        ),

        fetchClaimedAirdrops(
          address
        ),

        fetchFirestoreAirdrops(
          address
        ),

      ]);

    const tokens =
      mergeTokens(
        debankTokens,
        covalentTokens
      );

    const totalUsd =
      tokens.reduce(
        (
          sum: number,
          t: any
        ) =>
          sum +
          parseFloat(
            t.usdValue
          ),
        ethUsdValue
      );

    const chainsActive =
      [
        ...new Set(
          tokens.map(
            (
              t: any
            ) =>
              t.network
          )
        ),
      ].length;

    const mergedAirdrops =
      [
        ...claimedAirdrops,
        ...firestoreAirdrops,
      ];

    const uniqueAirdrops =
      Array.from(

        new Map(

          mergedAirdrops.map(
            (a: any) => [

              `${a.symbol}_${a.status}`,

              a,

            ]
          )

        ).values()

      );

    const allPending =
      [
        ...firestoreAirdrops.filter(
          (a: any) =>
            a.status ===
            'Pending'
        ),
      ];

    return NextResponse.json({

      tokens,

      chainsActive,

      totalTokens:
        tokens.length,

      ethBalance,

      ethUsdValue:
        ethUsdValue.toFixed(
          2
        ),

      totalUsd:
        totalUsd.toFixed(
          2
        ),

      ethPrice,

      airdrops:
        uniqueAirdrops.filter(
          (a: any) =>
            a.status ===
            'Claimed'
        ),

      pendingAirdrops:
        allPending,

      claimedCount:
        uniqueAirdrops.filter(
          (a: any) =>
            a.status ===
            'Claimed'
        ).length,

      pendingCount:
        allPending.length,

    });

  } catch (
    error
  ) {

    console.error(
      error
    );

    return NextResponse.json(
      {
        error:
          'Failed to fetch wallet data',
      },
      {
        status: 500,
      }
    );
  }
}