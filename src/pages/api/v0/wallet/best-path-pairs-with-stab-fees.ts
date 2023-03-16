import { NextApiRequest, NextApiResponse } from "next";
// @ts-ignore
import Cors from "cors";
import {
  EnvironmentNetwork,
  newOceanOptions,
  newWhaleAPIClient,
} from "@waveshq/walletkit-core";
import BigNumber from "bignumber.js";
import { runMiddleware } from "../../../../utils/middleware";

export const cors = Cors({
  methods: ["GET", "HEAD"],
});

type BestPathPair = {
  tokenADisplaySymbol: string;
  tokenBDisplaySymbol: string;
  network: EnvironmentNetwork;
};

type Error = {
  error: string;
};

type IBestPath = {
  tokenADisplaySymbol: string;
  tokenBDisplaySymbol: string;
};

interface BestPathPairRequest extends NextApiRequest {
  query: BestPathPair;
}

export default async function handle(
  req: BestPathPairRequest,
  res: NextApiResponse<IBestPath[] | Error>
): Promise<void> {
  await runMiddleware(req, res, cors);
  const { network } = req.query;

  try {
    const oceanOptions = newOceanOptions(network);
    const whaleApiClient = newWhaleAPIClient(oceanOptions);
    const poolpairs = await whaleApiClient.poolpairs.list(200);

    // Logic for filter would be to
    // check if either tokenA or tokenB is `DUSD`
    // check if there is any fee for tokenA or tokenB
    // check for if the fee is > 0.001 as DEX stabilization fees are more than 0.001 (0.1%)
    const pairsWithFees = poolpairs.filter(
      (pair) =>
        (pair.tokenA.displaySymbol === "DUSD" ||
          pair.tokenB.displaySymbol === "DUSD") &&
        (pair.tokenA.fee !== undefined || pair.tokenB.fee !== undefined) &&
        (new BigNumber(pair.tokenA.fee?.pct ?? 0).isGreaterThan(0.001) ||
          new BigNumber(pair.tokenB.fee?.pct ?? 0).isGreaterThan(0.001))
    );

    const bestPathPairs: IBestPath[] = [];

    // this is to set DUSD as token A for the bestPath mapping
    pairsWithFees.forEach((pair) => {
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
    });

    res.json(bestPathPairs);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}
