import React from "react";
import Header from "@/components/widgets/categories/CategoryHeader";
import AddProductWeight from "@/components/widgets/product/ProductWeight";
export const metadata = {
  title: "Product Weight",
  description: "Manage product Weight options in ecommerce dashboard.",
};
const page = () => {
  return (
    <>
      <Header
        title="Add Products Weight"
        breadcrumb={["Dashboard", "Product", "Product Weight"]}
      />
      <AddProductWeight />
    </>
  );
};

export default page;
