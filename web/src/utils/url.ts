export function isTwitterStatusUrl(url: string) {
  const urlPattern =
    /^https:\/\/twitter-revived\.vercel\.app\/[^\/]+\/status\/[a-f0-9-]+$/;
  return urlPattern.test(url);
}

export function getTwitterStatusUuid(url: string) {
  const urlPattern =
    /^https:\/\/twitter-revived\.vercel\.app\/[^\/]+\/status\/([a-f0-9-]+)$/;
  const match = url.match(urlPattern);
  return match?.[1];
}

export function findTwitterUrls(strings: string[]) {
  const pattern =
    /https:\/\/twitter-revived\.vercel\.app\/[^\/]+\/status\/[^\/]+/;

  return strings.filter((str) => pattern.test(str));
}
