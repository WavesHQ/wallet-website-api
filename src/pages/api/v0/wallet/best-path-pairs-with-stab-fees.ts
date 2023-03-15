import { NextApiRequest, NextApiResponse } from "next";
// @ts-ignore
import Cors from "cors";
import { runMiddleware } from "../../../../utils/middleware";
import { newOceanOptions, newWhaleAPIClient } from "@waveshq/walletkit-core";

export const cors = Cors({
  methods: ["GET", "HEAD"],
});

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  await runMiddleware(req, res, cors);
  const { network } = req.body;

  const oceanOptions = newOceanOptions(network);
  const whaleApiClient = newWhaleAPIClient(oceanOptions);
  const poolpairs = await whaleApiClient.poolpairs.list(200);

  const pairsWithFees = poolpairs.filter(
    (pair) =>
      (pair.tokenA.displaySymbol === "DUSD" ||
        pair.tokenB.displaySymbol === "DUSD") &&
      (pair.tokenA.fee !== undefined || pair.tokenB.fee !== undefined)
  );

  interface IBestPath {
    tokenADisplaySymbol: string;
    tokenBDisplaySymbol: string;
  }

  const bestPathPairs: IBestPath[] = [];

  // this is to set DUSD as token A for the bestPath mapping
  for (let i = 0; i < pairsWithFees.length; i++) {
    let pair = pairsWithFees[i];
    let bestPathPair = {
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
