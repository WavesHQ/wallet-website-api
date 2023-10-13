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
    max: string;
  }[];
};

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse<BridgeLimits>
): Promise<void> {
  await runMiddleware(req, res, cors);

  const TESTNET_LIMITS = [
    { symbol: "USDT", id: "5", max: "50000" },
    { symbol: "BTC", id: "1", max: "5000" },
    { symbol: "ETH", id: "2", max: "5000" },
    { symbol: "USDC", id: "22", max: "2000" },
    { symbol: "EUROC", id: "216", max: "150000" },
  ];

  const MAINNET_LIMITS = [
    { symbol: "USDT", id: "3", max: "150000" },
    { symbol: "BTC", id: "2", max: "15" },
    { symbol: "ETH", id: "1", max: "70" },
    { symbol: "USDC", id: "13", max: "150000" },
    { symbol: "EUROC", id: "216", max: "150000" },
  ];

  res.json({
    DevNet: [],
    MainNet: MAINNET_LIMITS,
    Playground: [],
    TestNet: TESTNET_LIMITS,
    [EnvironmentNetwork.LocalPlayground]: [],
    Changi: TESTNET_LIMITS,
  });
}
