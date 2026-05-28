import type { Metadata, Viewport } from "next";
import Studio from "./_studio";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "NUPEC Studio",
  robots: { index: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function StudioPage() {
  return <Studio />;
}
