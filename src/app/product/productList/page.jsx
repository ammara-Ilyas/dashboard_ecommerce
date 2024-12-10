import React from "react";
import Header from "@/components/widgets/categories/CategoryHeader";
import ProductList from "@/components/widgets/dashboard/ProductList";
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
      <ProductList />
    </>
  );
};

export default page;
