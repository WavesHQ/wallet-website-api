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
        en: "Find out how to earn returns through negative interest today.",
        de: "Erfahre, wie du noch heute mit Negativzinsen Rendite erzielen kannst.",
        "zh-Hans":
          "Find out how to earn returns through negative interest today.",
        "zh-Hant":
          "Find out how to earn returns through negative interest today.",
        fr: "Découvrez dès aujourd'hui comment obtenir des rendements grâce aux intérêts négatifs.",
        es: "Find out how to earn returns through negative interest today.",
        it: "Find out how to earn returns through negative interest today.",
      },
      version: ">=2.16.0",
      type: "OTHER_ANNOUNCEMENT",
      id: "19",
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
        en: "Find out how to earn returns through negative interest today.",
        de: "Erfahre, wie du noch heute mit Negativzinsen Rendite erzielen kannst.",
        "zh-Hans":
          "Find out how to earn returns through negative interest today.",
        "zh-Hant":
          "Find out how to earn returns through negative interest today.",
        fr: "Découvrez dès aujourd'hui comment obtenir des rendements grâce aux intérêts négatifs.",
        es: "Find out how to earn returns through negative interest today.",
        it: "Find out how to earn returns through negative interest today.",
      },
      version: ">=100.0.0",
      type: "SCAN",
      id: "20",
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
