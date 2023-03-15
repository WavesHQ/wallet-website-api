import { NextApiRequest, NextApiResponse } from "next";
// @ts-ignore
import Cors from "cors";
import { runMiddleware } from "../../../../utils/middleware";

export const cors = Cors({
  methods: ["GET", "HEAD"],
});

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  await runMiddleware(req, res, cors);
  res.json([
    { tokenADisplaySymbol: "DUSD", tokenBDisplaySymbol: "DFI" },
    { tokenADisplaySymbol: "DUSD", tokenBDisplaySymbol: "dUSDT" },
    { tokenADisplaySymbol: "DUSD", tokenBDisplaySymbol: "dUSDC" },
    { tokenADisplaySymbol: "DUSD", tokenBDisplaySymbol: "dEUROC" },
  ]);
}
