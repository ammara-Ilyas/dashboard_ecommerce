"use client";
import React from "react";
import Header from "@/components/widgets/categories/CategoryHeader";
import ProductList from "@/components/widgets/dashboard/ProductList";
import Button from "@/components/miniComponents/Button";
import { useRouter } from "next/navigation";
const page = () => {
  const router = useRouter();
  const handleButton = () => {
    console.log("clicked");
    router.push("/product/upload");
  };
  return (
    <>
      <Header
        title="Products"
        breadcrumb={["Dashboard", "Product", "Product List"]}
        addBtn={{ title: "Add Product", handleButton: handleButton }}
      />
      <ProductList />
    </>
  );
};

export default page;