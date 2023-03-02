import { NextApiRequest, NextApiResponse } from "next";
// @ts-ignore
import Cors from "cors";
import { runMiddleware } from "../../../../utils/middleware";

export const cors = Cors({
  methods: ["GET", "HEAD"],
});

type BridgeStatus = {
  isUp: boolean;
};

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse<BridgeStatus>
): Promise<void> {
  await runMiddleware(req, res, cors);
  res.json({
    isUp: false,
  });
}
