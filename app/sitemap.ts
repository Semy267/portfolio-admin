import { configs } from "@/lib/config";
import { MetadataRoute } from "next";

const BASE = configs.DOMAIN;
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  if (!BASE) {
    // throw new Error("\nENV DOMAIN is not defined\n");
    console.log("error sitemap");
  }
  return [
    {
      url: `${BASE}`,
      priority: 1,
    },
  ];
}
