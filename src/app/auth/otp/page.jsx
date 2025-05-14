import React from "react";
import bg from "@/assets/image/bg_signup.webp";
import OtpForm from "@/components/widgets/auth/OtpForm";
import user from "@/libs/Token";
export const metadata = {
  title: "Otp",
  description: "Otp page of ecommerce dashboard",
};
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
        <OtpForm email="ismarailyas@gmail.com" />
      </div>
    </>
  );
};

export default Page;
