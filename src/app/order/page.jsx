import React from "react";
import Header from "@/components/widgets/categories/CategoryHeader";
import OrderTable from "@/components/widgets/order/OrderTabel";
export const metadata = {
  title: "Orders",
  description: "Manage product order options in ecommerce dashboard.",
};
const page = () => {
  return (
    <>
      <Header title="Order" breadcrumb={["Dashboard", "Order"]} />
      <OrderTable />
    </>
  );
};

export default page;
