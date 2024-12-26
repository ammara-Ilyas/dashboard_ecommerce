"use client";
import Header from "@/components/widgets/categories/CategoryHeader";
import { useRouter } from "next/navigation";
import CategoryTable from "@/components/widgets/categories/SubCAtegoryTabel";
const Page = () => {
  const router = useRouter();
  const handleButton = () => {
    // console.log("clicked");
    router.push("/category/uploadSubCategory");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Header
        title="Sub Category List"
        breadcrumb={["Dashboard", "Category", "Sub Category List"]}
        addBtn={{ title: "Add Category", handleButton: handleButton }}
      />
      <div className="min-h-screen bg-gray-100 p-6">
        <CategoryTable />
      </div>
    </div>
  );
};

export default Page;
