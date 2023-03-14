import BigNumber from "bignumber.js";
import { NextApiRequest, NextApiResponse } from "next";
import Cors from "cors";
import { runMiddleware } from "../../../utils/middleware";

type Fees = {
  fee: string | BigNumber;
};

export const cors = Cors({
  methods: ["POST"],
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Fees>
) {
  await runMiddleware(req, res, cors);
  const { tokenADisplaySymbol, tokenBDisplaySymbol, pairs } = JSON.parse(
    req.body
  );

  let fee;

  const pairWithFees = pairs.filter((pair) => {
    return (
      pair.data.displaySymbol.includes("DUSD") &&
      pair.data.displaySymbol.includes(tokenBDisplaySymbol) &&
      tokenADisplaySymbol === "DUSD"
    );
  });

  if (pairWithFees.length === 0) {
    fee = "0";
  } else {
    fee = pairWithFees[0].data.tokenB.fee
      ? pairWithFees[0].data.tokenB.fee?.pct
      : pairWithFees[0].data.tokenA.fee?.pct;
  }

  res.send(fee === "0" ? fee : new BigNumber(fee).multipliedBy(100).toFixed(2));
}
