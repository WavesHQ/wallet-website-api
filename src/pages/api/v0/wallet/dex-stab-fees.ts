import BigNumber from "bignumber.js";
import { NextApiRequest, NextApiResponse } from "next";
import {
  EnvironmentNetwork,
  newOceanOptions,
  newWhaleAPIClient,
} from "@waveshq/walletkit-core";
import Cors from "cors";
import { runMiddleware } from "../../../../utils/middleware";

type Fees = {
  fee: string | BigNumber;
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
  res: NextApiResponse<Fees>
) {
  await runMiddleware(req, res, cors);
  const { tokenADisplaySymbol, tokenBDisplaySymbol, network } = req.query;

  const oceanOptions = newOceanOptions(network);
  const whaleApiClient = newWhaleAPIClient(oceanOptions);
  const poolpairs = await whaleApiClient.poolpairs.list(200);

  const pairWithDUSD = poolpairs.filter(
    (pair) =>
      pair.tokenA.displaySymbol === tokenADisplaySymbol &&
      pair.tokenB.displaySymbol === tokenBDisplaySymbol &&
      (pair.tokenA.displaySymbol === "DUSD" ||
        pair.tokenB.displaySymbol === "DUSD")
  );

  let fee;
  if (
    pairWithDUSD.length === 0 ||
    (pairWithDUSD[0].tokenA.fee === undefined &&
      pairWithDUSD[0].tokenB.fee === undefined)
  ) {
    fee = "0";
  } else {
    fee = pairWithDUSD[0].tokenB.fee
      ? pairWithDUSD[0].tokenB.fee?.pct
      : pairWithDUSD[0].tokenA.fee?.pct;
  }

  res.send(fee === "0" ? fee : new BigNumber(fee).multipliedBy(100).toFixed(2));
}
