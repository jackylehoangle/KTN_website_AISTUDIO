import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: siteConfig.shortName,
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0e2356",
    lang: "vi",
    icons: [
      {
        src: siteConfig.logo,
        sizes: "any",
        type: "image/png",
      },
    ],
  };
}

