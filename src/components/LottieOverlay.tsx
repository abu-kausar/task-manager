/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import Lottie from "lottie-react";

interface Props {
  onComplete: () => void;
}

export default function LottieOverlay({ onComplete }: Props) {
  const [animationData, setAnimationData] = useState<any>(null);

  useEffect(() => {
    fetch("/lottie/success.json")
      .then((res) => res.json())
      .then((data) => setAnimationData(data));
  }, []);

  useEffect(() => {
    const timer = setTimeout(onComplete, 3000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!animationData) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-transparent">
      <Lottie
        animationData={animationData}
        loop={false}
        style={{ width: 300, height: 300 }}
      />
    </div>
  );
}
