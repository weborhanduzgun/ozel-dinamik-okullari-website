import type { MetadataRoute } from "next";
import { publicRoutes, siteConfig } from "../lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  return publicRoutes.map((path) => ({
    url: new URL(path, siteConfig.url).toString(),
  }));
}
