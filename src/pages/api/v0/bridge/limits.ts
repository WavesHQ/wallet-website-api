import { NextApiRequest, NextApiResponse } from "next";
import { EnvironmentNetwork } from "@waveshq/walletkit-core";
// @ts-ignore
import Cors from "cors";
import { runMiddleware } from "../../../../utils/middleware";

export const cors = Cors({
  methods: ["GET", "HEAD"],
});

type BridgeLimits = {
  [network in EnvironmentNetwork]: {
    symbol: string;
    id: string;
    daily: string;
    max: string;
  }[];
};

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse<BridgeLimits>
): Promise<void> {
  await runMiddleware(req, res, cors);

  const PLAYGROUND_LIMITS = [
    { symbol: "DFI", id: "0", daily: "1", max: "10" },
    { symbol: "BTC", id: "1", daily: "1", max: "5" },
    { symbol: "ETH", id: "2", daily: "2", max: "6" },
  ];

  res.json({
    DevNet: [],
    MainNet: [],
    Playground: PLAYGROUND_LIMITS,
    TestNet: [],
    [EnvironmentNetwork.LocalPlayground]: PLAYGROUND_LIMITS,
  });
}
