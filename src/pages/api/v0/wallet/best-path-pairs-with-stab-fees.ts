import { NextApiRequest, NextApiResponse } from "next";
// @ts-ignore
import Cors from "cors";
import {
  EnvironmentNetwork,
  newOceanOptions,
  newWhaleAPIClient,
} from "@waveshq/walletkit-core";
import { runMiddleware } from "../../../../utils/middleware";
import BigNumber from "bignumber.js";

export const cors = Cors({
  methods: ["GET", "HEAD"],
});

type BestPathPair = {
  tokenADisplaySymbol: string;
  tokenBDisplaySymbol: string;
  network: EnvironmentNetwork;
};

interface BestPathPairRequest extends NextApiRequest {
  query: BestPathPair;
}

export default async function handle(
  req: BestPathPairRequest,
  res: NextApiResponse
): Promise<void> {
  await runMiddleware(req, res, cors);
  const { network } = req.query;

  const oceanOptions = newOceanOptions(network);
  const whaleApiClient = newWhaleAPIClient(oceanOptions);
  const poolpairs = await whaleApiClient.poolpairs.list(200);

  const pairsWithFees = poolpairs.filter(
    (pair) =>
      (pair.tokenA.displaySymbol === "DUSD" ||
        pair.tokenB.displaySymbol === "DUSD") &&
      (pair.tokenA.fee !== undefined || pair.tokenB.fee !== undefined) &&
      (new BigNumber(pair.tokenA.fee?.pct ?? 0).isGreaterThan(0.01) ||
        new BigNumber(pair.tokenB.fee?.pct ?? 0).isGreaterThan(0.01))
  );

  interface IBestPath {
    tokenADisplaySymbol: string;
    tokenBDisplaySymbol: string;
  }

  const bestPathPairs: IBestPath[] = [];

  // this is to set DUSD as token A for the bestPath mapping
  for (let i = 0; i < pairsWithFees.length; i += 1) {
    const pair = pairsWithFees[i];
    const bestPathPair = {
      tokenADisplaySymbol: "",
      tokenBDisplaySymbol: "",
    };
    if (pair.tokenA.displaySymbol === "DUSD") {
      bestPathPair.tokenADisplaySymbol = pair.tokenA.displaySymbol;
      bestPathPair.tokenBDisplaySymbol = pair.tokenB.displaySymbol;
    } else {
      bestPathPair.tokenADisplaySymbol = pair.tokenB.displaySymbol;
      bestPathPair.tokenBDisplaySymbol = pair.tokenA.displaySymbol;
    }
    bestPathPairs.push(bestPathPair);
  }

  res.json(bestPathPairs);
}
