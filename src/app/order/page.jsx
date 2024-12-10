import React from "react";
import Header from "@/components/widgets/categories/CategoryHeader";
import OrderTable from "@/components/widgets/order/OrderTabel";
const page = () => {
  return (
    <>
      <Header
        title="Add Category"
        breadcrumb={[
          { label: "Dashboard", href: "/" },
          { label: "Category", href: "/category" },
          { label: "Add Category", href: "/add-category" },
        ]}
      />
      <OrderTable />
    </>
  );
};

export default page;
