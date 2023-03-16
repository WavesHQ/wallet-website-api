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

  let fee: string | BigNumber = "0";
  try {
    const oceanOptions = newOceanOptions(network);
    const whaleApiClient = newWhaleAPIClient(oceanOptions);
    const poolpairs = await whaleApiClient.poolpairs.list(200);

    const filteredTokenPairWithDUSD = poolpairs.filter(
      (pair) =>
        pair.tokenA.displaySymbol === tokenADisplaySymbol &&
        pair.tokenB.displaySymbol === tokenBDisplaySymbol &&
        (pair.tokenA.displaySymbol === "DUSD" ||
          pair.tokenB.displaySymbol === "DUSD")
    );

    if (
      filteredTokenPairWithDUSD.length > 0 &&
      (filteredTokenPairWithDUSD[0].tokenA.fee?.pct !== undefined ||
        filteredTokenPairWithDUSD[0].tokenB.fee?.pct !== undefined)
    ) {
      const tokenfee = filteredTokenPairWithDUSD[0].tokenB.fee
        ? filteredTokenPairWithDUSD[0].tokenB.fee?.pct
        : filteredTokenPairWithDUSD[0].tokenA.fee?.pct;
      fee = new BigNumber(tokenfee ?? 0).multipliedBy(100).toFixed(2);
    }

    res.send({ fee });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}
