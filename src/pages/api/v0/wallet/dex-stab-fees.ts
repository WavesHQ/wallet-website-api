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

type dexStabFeeRequestBody = {
  tokenADisplaySymbol: string;
  tokenBDisplaySymbol: string;
  network: EnvironmentNetwork;
};

interface DexStabRequest extends NextApiRequest {
  body: dexStabFeeRequestBody;
}

export const cors = Cors({
  methods: ["GET", "HEAD"],
});

export default async function handler(
  req: DexStabRequest,
  res: NextApiResponse<Fees>
) {
  await runMiddleware(req, res, cors);
  const { tokenADisplaySymbol, tokenBDisplaySymbol, network } = req.body;

  const oceanOptions = newOceanOptions(network);
  const whaleApiClient = newWhaleAPIClient(oceanOptions);
  const poolpairs = await whaleApiClient.poolpairs.list(200);

  console.log(poolpairs);

  const pairWithDUSD = poolpairs.filter(
    (pair) =>
      pair.tokenB.displaySymbol === tokenBDisplaySymbol &&
      pair.tokenA.displaySymbol === tokenADisplaySymbol &&
      (pair.tokenA.displaySymbol === "DUSD" ||
        pair.tokenB.displaySymbol === "DUSD")
  );

  let fee;
  if (
    pairWithDUSD.length === 0 ||
    (pairWithDUSD[0].tokenB.fee == undefined &&
      pairWithDUSD[0].tokenA.fee === undefined)
  ) {
    fee = "0";
  } else {
    fee = pairWithDUSD[0].tokenB.fee
      ? pairWithDUSD[0].tokenB.fee?.pct
      : pairWithDUSD[0].tokenA.fee?.pct;
  }

  res.send(fee === "0" ? fee : new BigNumber(fee).multipliedBy(100).toFixed(2));
}
