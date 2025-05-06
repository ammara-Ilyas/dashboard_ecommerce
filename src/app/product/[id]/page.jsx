import ProductView from "@/components/widgets/product/ProductView";
import CustomReview from "@/components/miniComponents/CustomReview";
import { callPrivateApi } from "@/libs/callApis";
export const metadata = {
  title: "Product Detail",
  description: "Manage product detail options in your ecommerce dashboard.",
};
export default async function Page({ params }) {
  console.log(params);
  let { id } = await params;
  const res = await callPrivateApi(`/product/${id}`, "GET");
  console.log("res in view", res);

  return (
    <div>
      <ProductView id={res.product._id} />
      <CustomReview />
    </div>
  );
}
