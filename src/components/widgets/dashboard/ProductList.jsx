"use client";
import ProductTabel from "../../miniComponents/ProductTabel";
import { useProducts } from "@/contextApi/ProductContext";

export default function ProductList() {
  const { products } = useProducts();

  return <ProductTabel products={products} />;
}
