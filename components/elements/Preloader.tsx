"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Preloader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleLoad = () => setLoading(false);

    if (document.readyState === "complete") {
      setLoading(false);
    } else {
      window.addEventListener("load", handleLoad);
      return () => window.removeEventListener("load", handleLoad);
    }
  }, []);

  if (!loading) return null;

  return (
    <div className="loader-wrap">
      <div className="preloader">
          <div id="handle-preloader" className="handle-preloader">
              <div className="animation-preloader">
                  <div className="load-inner">
                      <div className="preloader-logo">
                          <Image
                              src="/assets/images/logos/NUPEC_isotipo_grises.png"
                              alt="NUPEC"
                              width={100}
                              height={100}
                              priority
                          />
                      </div>
                      {/* <div className="txt-loading">
                          <span data-text-preloader="N" className="letters-loading">
                              N
                          </span>
                          <span data-text-preloader="U" className="letters-loading">
                              U
                          </span>
                          <span data-text-preloader="P" className="letters-loading">
                              P
                          </span>
                          <span data-text-preloader="E" className="letters-loading">
                              E
                          </span>
                          <span data-text-preloader="C" className="letters-loading">
                              C
                          </span>
                      </div> */}
                  </div>
              </div>
          </div>
      </div>
  </div>
  );
}
