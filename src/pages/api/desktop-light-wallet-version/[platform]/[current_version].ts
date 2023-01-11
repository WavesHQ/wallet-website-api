import { NextApiRequest, NextApiResponse } from "next";
import NodeCache from "node-cache";
import { getLatestGithubRelease } from "../../../../utils/getLatestGithubReleases";
import type { Release } from "../../../../utils/getLatestGithubReleases";

const DESKTOP_LIGHT_WALLET_APP_REPO = "WavesHQ/desktop-light-wallet";
const dataCache = new NodeCache({ stdTTL: 300 }); // every 5 minutes

// Caching
async function FetchGithubData(repo: string): Promise<Release> {
  const data = dataCache.get("data");
  if (data) {
    return data as Release;
  }
  // perform expensive operation to get data
  const newData = await getLatestGithubRelease(repo);
  dataCache.set("data", newData);
  return newData;
}

export default async function DesktopLightWalletUpdater(
  req: NextApiRequest,
  res: NextApiResponse<Release | string>
): Promise<void> {
  const params = req.query;
  const { currentVersion } = params;
  const latestRelease = await FetchGithubData(DESKTOP_LIGHT_WALLET_APP_REPO); // Get latest releases

  if (!latestRelease || !currentVersion) {
    return res.status(204).send("NO CONTENT");
  }

  try {
    const latestVersion = latestRelease.version;

    if (
      typeof latestRelease.version === "string" &&
      typeof currentVersion === "string"
    ) {
      const [latestMax, latestMin, latestPatch] = latestVersion
        .replace(/^[vV]/, "")
        .split(".");
      const [curMax, curMin, curPatch] = currentVersion
        .replace(/^[vV]/, "")
        .split(".");

      if (
        curMax === latestMax &&
        curMin === latestMin &&
        curPatch === latestPatch
      ) {
        throw new Error();
      }
    } else {
      throw new Error("version is not a string");
    }
  } catch (e) {
    return res.status(204).send("NO CONTENT");
  }
  return res.json(latestRelease);
}
