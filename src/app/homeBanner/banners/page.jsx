"use client";
import React from "react";
import Header from "@/components/widgets/categories/CategoryHeader";
import HomeBannerTabel from "@/components/widgets/homeBanner/HomeBannerTabel";
import { useRouter } from "next/navigation";

// export const metadata = {
//   title: "Banners",
//   description: "Manage product banner options in ecommerce dashboard.",
// };
const Page = () => {
  const router = useRouter();
  const handleButton = () => {
    console.log("clicked");
    router.push("/homeBanner/upload");
  };
  return (
    <>
      <Header
        title="Home Banners"
        breadcrumb={["Dashboard", "Home Banner", "Banners List"]}
        addBtn={{ title: "Add Banner", handleButton: handleButton }}
      />
      <HomeBannerTabel />
    </>
  );
};

export default Page;
