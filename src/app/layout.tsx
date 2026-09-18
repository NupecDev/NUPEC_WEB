import type { Metadata } from "next";
import { Suspense } from "react";
import Script from "next/script";
import GoogleAnalyticsPageView from "@/components/elements/GoogleAnalyticsPageView";
import { SITE_URL, organizationJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "NUPEC — Nutrición premium para perros y gatos",
  description: "Alimento premium para perros y gatos fabricado en México",
};

const GTM_ID = "GTM-WQHMRHTC";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Layout mínimo: sin CSS del template para no romper el Sanity Studio en /studio.
  // Todo el estilo de la marca vive en src/app/[lang]/layout.tsx.
  return (
    <html suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()) }}
        />
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${GTM_ID}');
          `}
        </Script>
      </head>
      <body>
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {children}
        <Suspense fallback={null}>
          <GoogleAnalyticsPageView />
        </Suspense>
      </body>
    </html>
  );
}
