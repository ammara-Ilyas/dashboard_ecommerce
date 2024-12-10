import ProductTabel from "../../miniComponents/ProductTabel";
import { useProducts } from "@/contextApi/ProductContext";

export default function ProductList() {
  const { products } = useProducts();
  console.log("pproduct list");

  // console.log("pro", products);
  return <ProductTabel products={products} />;
}
