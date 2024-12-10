import React from "react";
import Header from "@/components/widgets/categories/CategoryHeader";
import MediaAndPublish from "@/components/widgets/homeBanner/AddHomeBanner";
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
      <MediaAndPublish />
    </>
  );
};

export default page;
