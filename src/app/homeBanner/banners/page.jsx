import React from "react";
import Header from "@/components/widgets/categories/CategoryHeader";
import HomeBannerTabel from "@/components/widgets/homeBanner/HomeBannerTabel";
const page = () => {
  return (
    <>
      <Header
        title="Add Category"
        breadcrumb={["Dashboard", "Home Banner", "Banners List"]}
      />
      <HomeBannerTabel />
    </>
  );
};

export default page;
