import React from "react";
import Singup from "@/components/widgets/auth/Singup";
const Page = () => {
  return (
    <div
      className=" -mt-24 h-[100vh]"
      style={{
        backgroundImage: "url('/image/bg_signup.webp')'",
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Singup />
    </div>
  );
};

export default Page;
