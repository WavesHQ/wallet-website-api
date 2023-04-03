import { NextApiRequest, NextApiResponse } from "next";
import Cors from "cors";
import { runMiddleware } from "../../../../utils/middleware";

interface BridgeAnnouncement {
  lang: {
    en: string;
  };
  version: string;
  url?: string;
}

export const cors = Cors({
  methods: ["GET", "HEAD"],
});

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse<BridgeAnnouncement[]>
): Promise<void> {
  await runMiddleware(req, res, cors);
  res.json([
    {
      lang: {
        en: "Hi Bella! ",
      },
      version: ">=1.6.1",
      url: "https://birthdayresearch.notion.site/birthdayresearch/Quantum-Documentation-dc1d9174dd294b06833e7859d437e25e",
    },
  ]);
}
