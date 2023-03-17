import BigNumber from "bignumber.js";
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

type Error = {
  error: string;
};

type PairWithStabInfo = {
  tokenADisplaySymbol: string;
  tokenBDisplaySymbol: string;
  dexStabilizationFee: string;
  highFeesUrl: string;
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

      /* Set DUSD as tokenA - so that tokenA is always `DUSD` */
      if (pair.tokenA.displaySymbol === "DUSD") {
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

      /* Set the high fees URL */
      const highFeesUrls = {
        DFI: "https://defiscan.live/dex/DUSD",
        dUSDT: "https://defiscan.live/dex/dUSDT-DUSD",
        dUSDC: "https://defiscan.live/dex/dUSDC-DUSD",
        dEUROC: "https://defiscan.live/dex/dEUROC-DUSD",
      };
      const highFeesUrl = highFeesUrls[tokenBDisplaySymbol];

      pairsWithStabInfo.push({
        tokenADisplaySymbol,
        tokenBDisplaySymbol,
        dexStabilizationFee,
        highFeesUrl,
      });
    });

    res.json(pairsWithStabInfo);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}
