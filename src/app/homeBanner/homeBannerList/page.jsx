import React from "react";
import Header from "@/components/widgets/categories/CategoryHeader";
import HomeBannerTabel from "@/components/widgets/homeBanner/HomeBannerTabel";
const page = () => {
  return (
    <>
      <Header
        title="Add Category"
        breadcrumb={[
          { label: "Dashboard", href: "/" },
          { label: "Category", href: "/category" },
          { label: "Add Category", href: "/add-category" },
        ]}
      />
      <HomeBannerTabel />
    </>
  );
};

export default page;
