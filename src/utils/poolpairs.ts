import {
  EnvironmentNetwork,
  newOceanOptions,
  newWhaleAPIClient,
} from "@waveshq/walletkit-core";
import BigNumber from "bignumber.js";

interface Token {
  id: string;
  name: string;
  symbol: string;
  displaySymbol: string;
  reserve: string;
  blockCommission: string;
  fee?: {
    pct?: string;
    inPct?: string;
    outPct?: string;
  };
}

export interface PoolPairData {
  id: string;
  symbol: string;
  displaySymbol: string;
  name: string;
  status: boolean;
  tokenA: Token;
  tokenB: Token;
}

/**
 * Recursively get all poolpairs
 * @param network
 * @returns allPoolpairs
 */
export const getAllPoolpairs = async (
  network: EnvironmentNetwork
): Promise<PoolPairData[]> => {
  const allPoolpairs: PoolPairData[] = [];
  let hasNext = false;
  let next;

  const oceanOptions = newOceanOptions(network);
  const whaleApiClient = newWhaleAPIClient(oceanOptions);
  do {
    // eslint-disable-next-line no-await-in-loop
    const poolpairs = await whaleApiClient.poolpairs.list(200, next);
    allPoolpairs.push(...poolpairs);
    hasNext = poolpairs.hasNext;
    next = poolpairs.nextToken;
  } while (hasNext);
  return allPoolpairs;
};

/**
 * Filters poolpairs with DEX stabilization fee
 * @param poolpairs
 * @returns poolpairsWithStabFee
 *
 * Logic for filter would be to:
 * - check if there is `inPct` fee for tokenA or tokenB
 * - check if the fee inPct is > 0.001 as DEX stabilization fees are more than 0.001 (0.1%)
 */
export const getPoolpairsWithStabilizationFee = (poolpairs: PoolPairData[]) => {
  const poolpairsWithStabFee = poolpairs.filter(
    (pair) =>
      (pair.tokenA.fee?.inPct !== undefined &&
        new BigNumber(pair.tokenA.fee?.inPct ?? 0).isGreaterThan(
          MIN_STAB_FEE_PCT
        )) ||
      (pair.tokenB.fee?.inPct !== undefined &&
        new BigNumber(pair.tokenB.fee?.inPct ?? 0).isGreaterThan(
          MIN_STAB_FEE_PCT
        ))
  );
  return poolpairsWithStabFee;
};

/* Anything greater than this percentage is considered to be stab fee */
export const MIN_STAB_FEE_PCT = 0.001; // (0.1%)
