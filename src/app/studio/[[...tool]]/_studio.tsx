"use client";
// sanity.config.ts usa createContext internamente — debe importarse
// solo desde un Client Component para evitar el error en Server Components.
import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity.config";

export default function Studio() {
  return <NextStudio config={config} />;
}
