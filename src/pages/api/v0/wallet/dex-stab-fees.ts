import BigNumber from "bignumber.js";
import { NextApiRequest, NextApiResponse } from "next";
import { EnvironmentNetwork } from "@waveshq/walletkit-core";
import Cors from "cors";
import { runMiddleware } from "../../../../utils/middleware";
import {
  getAllPoolpairs,
  getPoolpairsWithStabilizationFee,
  PoolPairData,
} from "./poolpairs.utils";

type Fees = {
  fee: string | BigNumber;
};

type Error = {
  error: string;
};

type DexStabFeeRequestBody = {
  tokenADisplaySymbol: string;
  tokenBDisplaySymbol: string;
  network: EnvironmentNetwork;
};

interface DexStabRequest extends NextApiRequest {
  query: DexStabFeeRequestBody;
}

export const cors = Cors({
  methods: ["GET", "HEAD"],
});

export default async function handler(
  req: DexStabRequest,
  res: NextApiResponse<Fees | Error>
) {
  await runMiddleware(req, res, cors);
  const { tokenADisplaySymbol, tokenBDisplaySymbol, network } = req.query;

  if (!(tokenADisplaySymbol && tokenBDisplaySymbol)) {
    return res.status(400).send({
      error: "Required fields: tokenADisplaySymbol, tokenBDisplaySymbol",
    });
  }

  let fee: string = "0";
  try {
    const poolpairs: PoolPairData[] = await getAllPoolpairs(network);
    const poolpairsWithStabFee = getPoolpairsWithStabilizationFee(poolpairs);

    const requestedPoolpair = poolpairsWithStabFee.find(
      (pair) =>
        pair.tokenA.displaySymbol === tokenADisplaySymbol &&
        pair.tokenB.displaySymbol === tokenBDisplaySymbol
    );
    if (
      requestedPoolpair &&
      (requestedPoolpair.tokenA.fee?.pct || requestedPoolpair.tokenB.fee?.pct)
    ) {
      const tokenfee = requestedPoolpair.tokenB.fee
        ? requestedPoolpair.tokenB.fee?.pct
        : requestedPoolpair.tokenA.fee?.pct;
      fee = new BigNumber(tokenfee ?? 0).multipliedBy(100).toFixed(2);
    }

    return res.send({ fee });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
}
