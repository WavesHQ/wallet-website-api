import { NextApiRequest, NextApiResponse } from "next";
// @ts-ignore
import Cors from "cors";
import { EnvironmentNetwork } from "@waveshq/walletkit-core";
import { runMiddleware } from "../../../../utils/middleware";
import {
  getAllPoolpairs,
  getPoolpairsWithStabilizationFee,
  PoolPairData,
} from "./poolpairs.utils";

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
    const poolpairs: PoolPairData[] = await getAllPoolpairs(network);
    const poolpairsWithStabFee = getPoolpairsWithStabilizationFee(poolpairs);

    const bestPathPairs: IBestPath[] = [];
    poolpairsWithStabFee.forEach((pair) => {
      const bestPathPair = {
        tokenADisplaySymbol: "",
        tokenBDisplaySymbol: "",
      };
      // this is to set DUSD as token A for the bestPath mapping
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
