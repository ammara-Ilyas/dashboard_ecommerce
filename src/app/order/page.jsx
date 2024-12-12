import React from "react";
import Header from "@/components/widgets/categories/CategoryHeader";
import OrderTable from "@/components/widgets/order/OrderTabel";
const page = () => {
  return (
    <>
      <Header title="Order" breadcrumb={["Dashboard", "Order"]} />
      <OrderTable />
    </>
  );
};

export default page;
