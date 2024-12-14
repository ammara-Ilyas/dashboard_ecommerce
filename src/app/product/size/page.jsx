import React from "react";
import Header from "@/components/widgets/categories/CategoryHeader";
import ProductSize from "@/components/widgets/product/ProductSize";
const page = () => {
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

export default page;
