import React from "react";
import Header from "@/components/widgets/categories/CategoryHeader";
import ProductUploadForm from "@/components/widgets/product/ProductUploadForm";
const page = () => {
  return (
    <div className="">
      <Header
        title="Product Upload"
        breadcrumb={["Dashboard", "Product", "Add Product"]}
      />
      <ProductUploadForm />
    </div>
  );
};

export default page;
