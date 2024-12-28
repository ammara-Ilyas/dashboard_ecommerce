"use client";

import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

const ProgressBarProviders = ({ children }) => {
  return (
    <>
      {children}
      <ProgressBar
        height="4px"
        color="#0000FF"
        options={{ showSpinner: false }}
        shallowRouting
      />
    </>
  );
};

export default ProgressBarProviders;
