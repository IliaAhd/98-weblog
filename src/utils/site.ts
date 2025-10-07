export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? process.env.SITE_URL ?? "http://98-weblog.vercel.app";

export function absolute(path: string) {
  if (!path) return siteUrl;
  return path.startsWith("http") ? path : `${siteUrl.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;
}
