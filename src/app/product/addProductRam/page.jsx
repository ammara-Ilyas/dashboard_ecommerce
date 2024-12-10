import React from "react";
import AddProductRAM from "@/components/widgets/product/ProductRam";
import Header from "@/components/widgets/categories/CategoryHeader";
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
      <AddProductRAM />
    </>
  );
};

export default page;
