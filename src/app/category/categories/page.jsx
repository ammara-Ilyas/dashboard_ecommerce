"use client";
import React from "react";
import CategoryList from "@/components/widgets/categories/CategoriesTabel";
import Header from "@/components/widgets/categories/CategoryHeader";
import { useRouter } from "next/navigation";
const Page = () => {
  const router = useRouter();
  const handleButton = () => {
    console.log("clicked");
    router.push("/category/uploadCategory");
  };

  return (
    <>
      <Header
        title="Category List"
        breadcrumb={["Dashboard", "Category", "Category List"]}
        addBtn={{ title: "Add Category", handleButton: handleButton }}
      />
      <CategoryList />
    </>
  );
};

export default Page;
