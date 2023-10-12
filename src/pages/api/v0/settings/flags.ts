import { NextApiRequest, NextApiResponse } from "next";
// @ts-ignore
import Cors from "cors";
import { EnvironmentNetwork, FeatureFlag } from "@waveshq/walletkit-core";
import { runMiddleware } from "../../../../utils/middleware";

export const cors = Cors({
  methods: ["GET", "HEAD"],
});

export default async function handle (
  req: NextApiRequest,
  res: NextApiResponse<FeatureFlag[]>
): Promise<void> {
  await runMiddleware(req, res, cors);
  res.json([
    {
      id: "loan",
      name: "Loans",
      stage: "public",
      version: ">=0.17.0",
      description: "Browse loan tokens provided by DeFiChain",
      networks: [
        EnvironmentNetwork.MainNet,
        EnvironmentNetwork.TestNet,
        EnvironmentNetwork.RemotePlayground,
        EnvironmentNetwork.LocalPlayground,
        EnvironmentNetwork.DevNet,
        EnvironmentNetwork.Changi,
      ],
      platforms: ["ios", "android", "web"],
      app: ["MOBILE_LW"],
    },
    {
      id: "auction",
      name: "Auction",
      stage: "public",
      version: ">=0.23.0",
      description: "Browse auctions provided by DeFiChain",
      networks: [
        EnvironmentNetwork.MainNet,
        EnvironmentNetwork.TestNet,
        EnvironmentNetwork.RemotePlayground,
        EnvironmentNetwork.LocalPlayground,
        EnvironmentNetwork.DevNet,
        EnvironmentNetwork.Changi,
      ],
      platforms: ["ios", "android", "web"],
      app: ["MOBILE_LW"],
    },
    {
      id: "dfi_loan_payment",
      name: "DFI Loan Payment",
      stage: "alpha",
      version: "<1.0.0",
      description: "DFI Loan Payment",
      networks: [
        EnvironmentNetwork.MainNet,
        EnvironmentNetwork.TestNet,
        EnvironmentNetwork.RemotePlayground,
        EnvironmentNetwork.LocalPlayground,
        EnvironmentNetwork.DevNet,
        EnvironmentNetwork.Changi,
      ],
      platforms: ["ios", "android", "web"],
      app: ["MOBILE_LW"],
    },
    {
      id: "local_storage",
      name: "Native local storage",
      stage: "public",
      version: ">1.6.0",
      description: "Native local storage",
      networks: [
        EnvironmentNetwork.MainNet,
        EnvironmentNetwork.TestNet,
        EnvironmentNetwork.RemotePlayground,
        EnvironmentNetwork.LocalPlayground,
        EnvironmentNetwork.DevNet,
        EnvironmentNetwork.Changi,
      ],
      platforms: ["ios", "android", "web"],
      app: ["MOBILE_LW"],
    },
    {
      id: "dusd_vault_share",
      name: "DUSD 50% contribution",
      stage: "public",
      version: ">1.8.1",
      description: "DUSD 50% contribution in required collateral token",
      networks: [
        EnvironmentNetwork.MainNet,
        EnvironmentNetwork.TestNet,
        EnvironmentNetwork.RemotePlayground,
        EnvironmentNetwork.LocalPlayground,
        EnvironmentNetwork.DevNet,
        EnvironmentNetwork.Changi,
      ],
      platforms: ["ios", "android", "web"],
      app: ["MOBILE_LW"],
    },
    {
      id: "dusd_loan_payment",
      name: "DUSD Loan Payment",
      stage: "alpha",
      version: ">1.8.1",
      description:
        "Allow DUSD payment on loans (+1% fee if paying a Non-DUSD loan)",
      networks: [
        EnvironmentNetwork.RemotePlayground,
        EnvironmentNetwork.LocalPlayground,
        EnvironmentNetwork.DevNet,
      ],
      platforms: ["ios", "android", "web"],
      app: ["MOBILE_LW"],
    },
    {
      id: "future_swap",
      name: "Future swap",
      stage: "public",
      version: ">1.11.0",
      description: "Allow Future Swap at Settlement block",
      networks: [
        EnvironmentNetwork.MainNet,
        EnvironmentNetwork.TestNet,
        EnvironmentNetwork.RemotePlayground,
        EnvironmentNetwork.LocalPlayground,
        EnvironmentNetwork.DevNet,
        EnvironmentNetwork.Changi,

      ],
      platforms: ["ios", "android", "web"],
      app: ["MOBILE_LW"],
    },
    {
      id: "service_provider",
      name: "Service Provider",
      stage: "beta",
      version: ">1.13.0",
      description: "Allows the usage of custom server provider url",
      networks: [
        EnvironmentNetwork.MainNet,
        EnvironmentNetwork.TestNet,
        EnvironmentNetwork.RemotePlayground,
        EnvironmentNetwork.LocalPlayground,
        EnvironmentNetwork.DevNet,
        EnvironmentNetwork.Changi,

      ],
      platforms: ["ios", "android", "web"],
      app: ["MOBILE_LW"],
    },
    {
      id: "onboarding_v2",
      name: "Onboarding 2.0",
      stage: "public",
      version: ">1.14.3",
      description: "Display redesigned onboarding flow for LW 2.0",
      networks: [
        EnvironmentNetwork.MainNet,
        EnvironmentNetwork.TestNet,
        EnvironmentNetwork.RemotePlayground,
        EnvironmentNetwork.LocalPlayground,
        EnvironmentNetwork.DevNet,
        EnvironmentNetwork.Changi,

      ],
      platforms: ["ios", "android", "web"],
      app: ["MOBILE_LW"],
    },
    {
      id: "dusd_dfi_high_fee",
      name: "DUSD-DFI High Fees",
      stage: "public",
      version: ">0.0.0",
      description:
        "There are high fees in some pairs with DUSD as of the moment",
      networks: [
        EnvironmentNetwork.MainNet,
        EnvironmentNetwork.TestNet,
        EnvironmentNetwork.RemotePlayground,
        EnvironmentNetwork.LocalPlayground,
        EnvironmentNetwork.DevNet,
      ],
      platforms: ["ios", "android", "web"],
      app: ["MOBILE_LW"],
    },
    {
      id: "dusd_dex_high_fee",
      name: "DUSD High Fees on specific tokens",
      stage: "public",
      version: ">0.0.0",
      description:
        "There are high fees in some pairs with DUSD as of the moment",
      networks: [
        EnvironmentNetwork.MainNet,
        EnvironmentNetwork.TestNet,
        EnvironmentNetwork.RemotePlayground,
        EnvironmentNetwork.LocalPlayground,
        EnvironmentNetwork.DevNet,
        EnvironmentNetwork.Changi,

      ],
      platforms: ["ios", "android", "web"],
      app: ["MOBILE_LW"],
    },
    {
      id: "setting_v2",
      name: "Setting 2.0",
      stage: "public",
      version: ">1.15.1",
      description: "Display redesigned Setting flow for LW 2.0",
      networks: [
        EnvironmentNetwork.MainNet,
        EnvironmentNetwork.TestNet,
        EnvironmentNetwork.RemotePlayground,
        EnvironmentNetwork.LocalPlayground,
        EnvironmentNetwork.DevNet,
        EnvironmentNetwork.Changi,

      ],
      platforms: ["ios", "android", "web"],
      app: ["MOBILE_LW"],
    },
    {
      id: "portfolio_v2",
      name: "Portfolio 2.0",
      stage: "alpha",
      version: ">1.16.0",
      description: "Display redesigned Portfolio flow for LW 2.0",
      networks: [
        EnvironmentNetwork.MainNet,
        EnvironmentNetwork.TestNet,
        EnvironmentNetwork.RemotePlayground,
        EnvironmentNetwork.LocalPlayground,
        EnvironmentNetwork.DevNet,
        EnvironmentNetwork.Changi,

      ],
      platforms: ["ios", "android", "web"],
      app: ["MOBILE_LW"],
    },
    {
      id: "add_liquidity_v2",
      name: "Add liquidity 2.0",
      stage: "public",
      version: ">2.2.0",
      description: "Display redesigned Add liquidity flow for LW 2.0",
      networks: [
        EnvironmentNetwork.MainNet,
        EnvironmentNetwork.TestNet,
        EnvironmentNetwork.RemotePlayground,
        EnvironmentNetwork.LocalPlayground,
        EnvironmentNetwork.DevNet,
        EnvironmentNetwork.Changi,

      ],
      platforms: ["ios", "android", "web"],
      app: ["MOBILE_LW"],
    },
    {
      id: "remove_liquidity_v2",
      name: "Remove liquidity 2.0",
      stage: "public",
      version: ">2.2.0",
      description: "Display redesigned Remove liquidity flow for LW 2.0",
      networks: [
        EnvironmentNetwork.MainNet,
        EnvironmentNetwork.TestNet,
        EnvironmentNetwork.RemotePlayground,
        EnvironmentNetwork.LocalPlayground,
        EnvironmentNetwork.DevNet,
        EnvironmentNetwork.Changi,

      ],
      platforms: ["ios", "android", "web"],
      app: ["MOBILE_LW"],
    },
    {
      id: "send_v2",
      name: "Send 2.0",
      stage: "public",
      version: ">2.1.0",
      description: "Display redesigned Send flow for LW 2.0",
      networks: [
        EnvironmentNetwork.MainNet,
        EnvironmentNetwork.TestNet,
        EnvironmentNetwork.RemotePlayground,
        EnvironmentNetwork.LocalPlayground,
        EnvironmentNetwork.DevNet,
        EnvironmentNetwork.Changi,

      ],
      platforms: ["ios", "android", "web"],
      app: ["MOBILE_LW"],
    },
    {
      id: "composite_swap_v2",
      name: "Composite swap 2.0",
      stage: "public",
      version: ">2.4.3",
      description: "Display redesigned Instant/Future swap flow for LW 2.0",
      networks: [
        EnvironmentNetwork.MainNet,
        EnvironmentNetwork.TestNet,
        EnvironmentNetwork.RemotePlayground,
        EnvironmentNetwork.LocalPlayground,
        EnvironmentNetwork.DevNet,
        EnvironmentNetwork.Changi,

      ],
      platforms: ["ios", "android", "web"],
      app: ["MOBILE_LW"],
    },
    {
      id: "unloop_dusd",
      name: "Unloop DUSD loan",
      stage: "public",
      version: ">2.5.0",
      description: "Display payback DUSD loan with DUSD collateral",
      networks: [
        EnvironmentNetwork.MainNet,
        EnvironmentNetwork.TestNet,
        EnvironmentNetwork.RemotePlayground,
        EnvironmentNetwork.LocalPlayground,
        EnvironmentNetwork.DevNet,
        EnvironmentNetwork.Changi,

      ],
      platforms: ["ios", "android", "web"],
      app: ["MOBILE_LW"],
    },
    {
      id: "ocg_cfp_dfip",
      name: "Governance",
      stage: "public",
      version: ">2.14.0",
      description: "Allows the submission of CFP/DFIP proposals",
      networks: [
        EnvironmentNetwork.MainNet,
        EnvironmentNetwork.TestNet,
        EnvironmentNetwork.RemotePlayground,
        EnvironmentNetwork.LocalPlayground,
        EnvironmentNetwork.DevNet,
        EnvironmentNetwork.Changi,
      ],
      platforms: ["ios", "android", "web"],
      app: ["MOBILE_LW"],
    },
    {
      id: "evm",
      name: "EVM",
      stage: "public",
      version: ">2.14.0",
      description: "Enables seamless bidirectional transfer between EVM and DVM",
      networks: [
        EnvironmentNetwork.RemotePlayground,
        EnvironmentNetwork.LocalPlayground,
        EnvironmentNetwork.DevNet,
        EnvironmentNetwork.Changi,
      ],
      platforms: ["ios", "android", "web"],
      app: ["MOBILE_LW"],
    },
  ]);
}
