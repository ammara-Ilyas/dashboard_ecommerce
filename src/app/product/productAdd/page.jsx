import React from "react";
import Header from "@/components/widgets/categories/CategoryHeader";
import ProductUploadForm from "@/components/widgets/product/ProductUploadForm";
const page = () => {
  return (
    <div>
      <Header
        title="Add Category"
        breadcrumb={[
          { label: "Dashboard", href: "/" },
          { label: "Category", href: "/category" },
          { label: "Add Category", href: "/add-category" },
        ]}
      />
      <ProductUploadForm />
    </div>
  );
};

export default page;
