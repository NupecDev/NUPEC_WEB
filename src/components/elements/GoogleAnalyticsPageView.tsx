"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export default function GoogleAnalyticsPageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    window.dataLayer = window.dataLayer || [];

    const query = searchParams.toString();
    const pagePath = query ? `${pathname}?${query}` : pathname;

    window.dataLayer.push({
      event: "page_view",
      page_path: pagePath,
    });
  }, [pathname, searchParams]);

  return null;
}
