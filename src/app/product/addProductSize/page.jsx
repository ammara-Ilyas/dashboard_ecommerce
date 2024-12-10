import React from "react";
import Header from "@/components/widgets/categories/CategoryHeader";
import ProductSize from "@/components/widgets/product/ProductSize";
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
      <ProductSize />
    </>
  );
};

export default page;
