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

async function getAllPoolpairs(
  network: EnvironmentNetwork,
  poolpairs: PoolPairData[] = [],
  next: string | undefined = undefined,
  hasNext = true
): Promise<PoolPairData[]> {
  const oceanOptions = newOceanOptions(network);
  const whaleApiClient = newWhaleAPIClient(oceanOptions);
  if (hasNext) {
    const fetchPoolpairs = await whaleApiClient.poolpairs.list(200, next);
    const { nextToken, hasNext: hasNextToken } = fetchPoolpairs;
    return getAllPoolpairs(network, fetchPoolpairs, nextToken, hasNextToken);
  }
  return poolpairs;
}

function getPoolpairsWithStabilizationFee(poolpairs: PoolPairData[]) {
  /**
   * Logic for filter would be to:
   * - check if either tokenA or tokenB is `DUSD`
   * - check if there is any fee for tokenA or tokenB
   * - check if the fee pct is > 0.001 as DEX stabilization fees are more than 0.001 (0.1%)
   */
  return poolpairs.filter(
    (pair) =>
      (pair.tokenA.displaySymbol === "DUSD" ||
        pair.tokenB.displaySymbol === "DUSD") &&
      (pair.tokenA.fee !== undefined || pair.tokenB.fee !== undefined) &&
      (new BigNumber(pair.tokenA.fee?.pct ?? 0).isGreaterThan(0.001) ||
        new BigNumber(pair.tokenB.fee?.pct ?? 0).isGreaterThan(0.001))
  );
}

export { getAllPoolpairs, getPoolpairsWithStabilizationFee };
