import React from "react";
import Header from "@/components/widgets/categories/CategoryHeader";
import ProductSize from "@/components/widgets/product/ProductSize";
export const metadata = {
  title: "Product Size",
  description: "Manage product Size options in ecommerce dashboard.",
};
const Page = () => {
  return (
    <>
      <Header
        title="Add Products ize"
        breadcrumb={["Dashboard", "Product", "Product Size"]}
      />
      <ProductSize />
    </>
  );
};

export default Page;
