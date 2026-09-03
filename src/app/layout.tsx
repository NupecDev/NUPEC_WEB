import type { Metadata } from "next";
import { Suspense } from "react";
import Script from "next/script";
import GoogleAnalyticsPageView from "@/components/elements/GoogleAnalyticsPageView";

export const metadata: Metadata = {
  title: "NUPEC — Nutrición premium para perros y gatos",
  description: "Alimento premium para perros y gatos fabricado en México",
};

const GA_MEASUREMENT_ID = "G-H2HJSCSCMB";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Layout mínimo: sin CSS del template para no romper el Sanity Studio en /studio.
  // Todo el estilo de la marca vive en src/app/[lang]/layout.tsx.
  return (
    <html suppressHydrationWarning>
      <body>
        {children}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', { send_page_view: false });
          `}
        </Script>
        <Suspense fallback={null}>
          <GoogleAnalyticsPageView measurementId={GA_MEASUREMENT_ID} />
        </Suspense>
      </body>
    </html>
  );
}
