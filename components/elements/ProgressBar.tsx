"use client";
import { useEffect, useState } from "react";

type ProgressBarProps = {
  label: string;
  percent: number;
  displayValue?: string;
};

export default function ProgressBar({ label, percent, displayValue }: ProgressBarProps) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    // Animate after component mounts
    const timer = setTimeout(() => {
      setWidth(percent);
    }, 200);
    return () => clearTimeout(timer);
  }, [percent]);

  return (
    <div className="progress-box">
            <p className="pb-4">{label}</p>
      <div className="bar">
        <div
          className="bar-inner count-bar"
          style={{
            width: `${width}%`,
            transition: "width 1.2s ease-in-out",
          }}
        >
          <div className="count-text">{displayValue ?? `${percent}%`}</div>
        </div>
      </div>
    </div>
  );
}
