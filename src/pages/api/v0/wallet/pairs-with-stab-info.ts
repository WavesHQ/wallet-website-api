import BigNumber from "bignumber.js";
import { NextApiRequest, NextApiResponse } from "next";
// @ts-ignore
import Cors from "cors";
import { EnvironmentNetwork } from "@waveshq/walletkit-core";
import { runMiddleware } from "../../../../utils/middleware";
import {
  FEE_PCT,
  getAllPoolpairs,
  getPoolpairsWithStabilizationFee,
  PoolPairData,
} from "utils/poolpairs";

export const cors = Cors({
  methods: ["GET", "HEAD"],
});

type Error = {
  error: string;
};

type PairWithStabInfo = {
  tokenADisplaySymbol: string;
  tokenBDisplaySymbol: string;
  dexStabilizationFee: string;
  highFeeScanUrl: string;
};

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
      if (new BigNumber(pair.tokenA.fee?.inPct ?? 0).isGreaterThan(FEE_PCT)) {
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

      /* Set the high fees URL on Scan */
      const highFeeScanUrl = `https://defiscan.live/dex/${pair.displaySymbol}`;

      pairsWithStabInfo.push({
        tokenADisplaySymbol,
        tokenBDisplaySymbol,
        dexStabilizationFee,
        highFeeScanUrl,
      });
    });

    res.json(pairsWithStabInfo);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}
