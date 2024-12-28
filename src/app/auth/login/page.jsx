import React from "react";
import Login from "@/components/widgets/auth/Login";
import bg from "@/assets/image/bg_signup.webp";
const Page = () => {
  return (
    <>
      <div
        className=" -mt-24 h-[]100vh"
        style={{
          backgroundImage: `url${bg}`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Login />
      </div>
    </>
  );
};

export default Page;
