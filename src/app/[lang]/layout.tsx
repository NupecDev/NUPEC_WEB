import { Roboto, Caveat } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import ToggleBodyClass from "../../../components/elements/Togglebtn";

import "../../../public/assets/css/bootstrap.css";
import "../../../public/assets/css/rtl.css";
import "../../../public/assets/css/style.css";
import "../../../public/assets/css/responsive.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "../../styles/custom.css";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--roboto",
});

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-caveat",
});

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!hasLocale(routing.locales, lang)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <div className={`${roboto.variable} ${caveat.variable}`}>
        {children}
        <ToggleBodyClass />
      </div>
    </NextIntlClientProvider>
  );
}
