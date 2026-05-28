import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "NUPEC — Nutrición premium para perros y gatos",
  description: "Alimento premium para perros y gatos fabricado en México",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Layout mínimo: sin CSS del template para no romper el Sanity Studio en /studio.
  // Todo el estilo de la marca vive en src/app/[lang]/layout.tsx.
  return (
    <html suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
