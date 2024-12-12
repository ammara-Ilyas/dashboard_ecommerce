import React from "react";
import Header from "@/components/widgets/categories/CategoryHeader";
import MediaAndPublish from "@/components/widgets/homeBanner/AddHomeBanner";
const page = () => {
  return (
    <>
      <Header
        title="Add Category"
        breadcrumb={["Dashboard", "Home Banner", "Add home Banner"]}
      />
      <MediaAndPublish />
    </>
  );
};

export default page;
