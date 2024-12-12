"use client";
import React from "react";
import Header from "@/components/widgets/categories/CategoryHeader";
import ProductList from "@/components/widgets/dashboard/ProductList";
import Button from "@/components/miniComponents/Button";
const page = () => {
  const handleButton = () => {
    console.log("clicked");
  };
  return (
    <>
      <Header
        title="Add Category"
        breadcrumb={["Dashboard", "Product", "Product List"]}
      />
      <Button handleButton={handleButton} title="Add Product" />
      <ProductList />
    </>
  );
};

export default page;
