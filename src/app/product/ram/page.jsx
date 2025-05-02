import React from "react";
import AddProductRAM from "@/components/widgets/product/ProductRam";
import Header from "@/components/widgets/categories/CategoryHeader";
export const metadata = {
  title: "Add Product RAM",
  description: "Manage product RAM options in ecommerce dashboard.",
};
const page = () => {
  return (
    <>
      <Header
        title="Add Products RAM"
        breadcrumb={["Dashboard", "Product", "Product Ram"]}
      />
      <AddProductRAM />
    </>
  );
};

export default page;
