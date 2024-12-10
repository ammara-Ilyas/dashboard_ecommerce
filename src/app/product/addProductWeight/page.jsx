import React from "react";
import Header from "@/components/widgets/categories/CategoryHeader";
import AddProductWeight from "@/components/widgets/product/ProductWeight";
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
      <AddProductWeight />
    </>
  );
};

export default page;
