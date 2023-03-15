import BigNumber from "bignumber.js";
import { NextApiRequest, NextApiResponse } from "next";
import { newOceanOptions, newWhaleAPIClient } from "@waveshq/walletkit-core";
import Cors from "cors";
import { runMiddleware } from "../../../../utils/middleware";

type Fees = {
  fee: string | BigNumber;
};

export const cors = Cors({
  methods: ["GET", "HEAD"],
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Fees>
) {
  await runMiddleware(req, res, cors);
  const { tokenADisplaySymbol, tokenBDisplaySymbol, network } = req.body;

  let fee;
  const oceanOptions = newOceanOptions(network);
  const whaleApiClient = newWhaleAPIClient(oceanOptions);
  const poolpairs = await whaleApiClient.poolpairs.list(200);

  const pairWithFees = poolpairs.filter((pair) => {
    return (
      pair.displaySymbol.includes("DUSD") &&
      pair.displaySymbol.includes(tokenBDisplaySymbol) &&
      tokenADisplaySymbol === "DUSD"
    );
  });

  if (pairWithFees.length === 0) {
    fee = "0";
  } else {
    fee = pairWithFees[0].tokenB.fee
      ? pairWithFees[0].tokenB.fee?.pct
      : pairWithFees[0].tokenA.fee?.pct;
  }

  res.send(fee === "0" ? fee : new BigNumber(fee).multipliedBy(100).toFixed(2));
}
