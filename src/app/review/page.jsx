import React from "react";
import AllReviewsTable from "@/components/widgets/reviews/AllReviewsTable";
import Header from "@/components/widgets/categories/CategoryHeader";
export const metadata = {
  title: "Reviews",
  description: "Manage Prdouct Reviews in ecommerce dashboard.",
};
const page = () => {
  return (
    <>
      {" "}
      <Header title="Review" breadcrumb={["Dashboard", "Reviews"]} />
      <AllReviewsTable />
    </>
  );
};

export default page;
