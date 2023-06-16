import BigNumber from "bignumber.js";
import { NextApiRequest, NextApiResponse } from "next";
// @ts-ignore
import Cors from "cors";
import { EnvironmentNetwork } from "@waveshq/walletkit-core";
import {
  MIN_STAB_FEE_PCT,
  getAllPoolpairs,
  getPoolpairsWithStabilizationFee,
  PoolPairData,
} from "utils/poolpairs";
import { runMiddleware } from "../../../../utils/middleware";

export const cors = Cors({
  methods: ["GET", "HEAD"],
});

interface Error {
  error: string;
}

export interface PairWithStabInfo {
  pairDisplaySymbol: string;
  tokenADisplaySymbol: string;
  tokenBDisplaySymbol: string;
  dexStabilizationFee: string;
}

interface PairsWithStabInfoRequest extends NextApiRequest {
  query: { network: EnvironmentNetwork };
}

export default async function handle(
  req: PairsWithStabInfoRequest,
  res: NextApiResponse<PairWithStabInfo[] | Error>
): Promise<void> {
  await runMiddleware(req, res, cors);
  const { network } = req.query;

  try {
    const poolpairs: PoolPairData[] = await getAllPoolpairs(network);
    const poolpairsWithStabFee = getPoolpairsWithStabilizationFee(poolpairs);

    const pairsWithStabInfo: PairWithStabInfo[] = [];
    poolpairsWithStabFee.forEach((pair) => {
      let tokenADisplaySymbol = "";
      let tokenBDisplaySymbol = "";

      /* Set token with `inPct` to be the tokenA */
      if (
        new BigNumber(pair.tokenA.fee?.inPct ?? 0).isGreaterThan(
          MIN_STAB_FEE_PCT
        )
      ) {
        tokenADisplaySymbol = pair.tokenA.displaySymbol;
        tokenBDisplaySymbol = pair.tokenB.displaySymbol;
      } else {
        tokenADisplaySymbol = pair.tokenB.displaySymbol;
        tokenBDisplaySymbol = pair.tokenA.displaySymbol;
      }

      /* Set DEX stabilization fee */
      const fee = pair.tokenA.fee?.inPct ?? pair.tokenB.fee?.inPct;
      const dexStabilizationFee = new BigNumber(fee ?? 0)
        .multipliedBy(100)
        .toFixed(2);

      pairsWithStabInfo.push({
        pairDisplaySymbol: pair.displaySymbol,
        tokenADisplaySymbol,
        tokenBDisplaySymbol,
        dexStabilizationFee,
      });
    });

    res.json(pairsWithStabInfo);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}
