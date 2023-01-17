export interface Release {
  version: string;
  notes: string;
  pub_date: string;
  platforms: { [key: string]: { url: string; signature?: string } };
}

export async function getLatestGithubRelease(repo: string): Promise<Release> {
  const githubLatestReleaseUrl = `https://api.github.com/repos/${repo}/releases/latest`;

  try {
    const PLATFORMS = {
      "linux-x86_64": "amd64.AppImage.tar.gz",
      "darwin-x86_64": "app.tar.gz",
      "darwin-aarch64": "app.tar.gz",
      "windows-x86_64": "x64_en-US.msi.zip",
    };

    const response = await fetch(githubLatestReleaseUrl);
    const release = await response.json();

    const releaseResponse: Release = {
      version: release.tag_name,
      notes: release.body
        .replace(/See the assets to download this version and install./, "")
        .trim(),
      pub_date: release.published_at,
      platforms: {},
    };

    await Promise.all(
      release.assets.map(async (asset: any) =>
        Promise.all(
          Object.keys(PLATFORMS).map(async (platform) => {
            if (asset.name.endsWith(PLATFORMS[platform])) {
              releaseResponse.platforms[platform] = {
                ...releaseResponse.platforms[platform],
                url: asset.browser_download_url,
              };
            }
            if (asset.name.endsWith(`${PLATFORMS[platform]}.sig`)) {
              try {
                const sigResponse = await fetch(asset.browser_download_url);
                const sig = await sigResponse.text();
                releaseResponse.platforms[platform] = {
                  ...releaseResponse.platforms[platform],
                  signature: sig,
                };
              } catch (error) {
                throw new Error(error);
              }
            }
          })
        )
      )
    );

    return releaseResponse;
  } catch (error) {
    return {} as Release;
  }
}
