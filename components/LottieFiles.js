import React from "react";
import Lottie from "react-lottie";
import animationData from "../public/signin.json";
import animationData1 from "../public/loading.json";

export default function LottieFiles() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const defaultOptions1 = {
    loop: true,
    autoplay: true,
    animationData: animationData1,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div>
      {/* <Image
        src="https://links.papareact.com/1ui"
        width={400}
        height={300}
        objectFit="contain"
      /> */}
      {/* <Lottie options={defaultOptions} height={300} width={200} /> */}
      <Lottie options={defaultOptions1} height={100} width={100} />
    </div>
  );
}
