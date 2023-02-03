import { NextApiRequest, NextApiResponse } from "next";
import { AnnouncementData } from "@waveshq/walletkit-core";
import Cors from "cors";
import { runMiddleware } from "../../../utils/middleware";

export const cors = Cors({
  methods: ["GET", "HEAD"],
});

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse<AnnouncementData[]>
): Promise<void> {
  await runMiddleware(req, res, cors);
  res.json([
    {
      lang: {
        en: "Generate astronomical returns through negative interest rates today!",
        de: "Generate astronomical returns through negative interest rates today!",
        "zh-Hans":
          "Generate astronomical returns through negative interest rates today!",
        "zh-Hant":
          "Generate astronomical returns through negative interest rates today!",
        fr: "Generate astronomical returns through negative interest rates today!",
        es: "Generate astronomical returns through negative interest rates today!",
        it: "Generate astronomical returns through negative interest rates today!",
      },
      version: ">=2.16.0",
      type: "OTHER_ANNOUNCEMENT",
      id: "17",
      url: {
        ios: "https://blog.defichain.com/generate-astronomical-returns-with-negative-interest-rates/",
        android:
          "https://blog.defichain.com/generate-astronomical-returns-with-negative-interest-rates/",
        web: "https://blog.defichain.com/generate-astronomical-returns-with-negative-interest-rates/",
        windows:
          "https://blog.defichain.com/generate-astronomical-returns-with-negative-interest-rates/",
        macos:
          "https://blog.defichain.com/generate-astronomical-returns-with-negative-interest-rates/",
      },
    },
    {
      lang: {
        en: "Generate astronomical returns through negative interest rates today!",
        de: "Generate astronomical returns through negative interest rates today!",
        "zh-Hans":
          "Generate astronomical returns through negative interest rates today!",
        "zh-Hant":
          "Generate astronomical returns through negative interest rates today!",
        fr: "Generate astronomical returns through negative interest rates today!",
        es: "Generate astronomical returns through negative interest rates today!",
        it: "Generate astronomical returns through negative interest rates today!",
      },
      version: ">=2.16.0",
      type: "SCAN",
      id: "18",
      url: {
        ios: "https://blog.defichain.com/generate-astronomical-returns-with-negative-interest-rates/",
        android:
          "https://blog.defichain.com/generate-astronomical-returns-with-negative-interest-rates/",
        web: "https://blog.defichain.com/generate-astronomical-returns-with-negative-interest-rates/",
        windows:
          "https://blog.defichain.com/generate-astronomical-returns-with-negative-interest-rates/",
        macos:
          "https://blog.defichain.com/generate-astronomical-returns-with-negative-interest-rates/",
      },
    },
  ]);
}
