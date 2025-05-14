import React from "react";
import Singup from "@/components/widgets/auth/Singup";
export const metadata = {
  title: "Signup",
  description: "signup page of ecommerce dashboard",
};
const Page = () => {
  return (
    <div
      className=" -mt-24 h-[100vh]"
      style={{
        backgroundImage: "url('@l/assets/image/bg_signup.webp')'",
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
