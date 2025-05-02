import ProductView from "@/components/widgets/product/ProductView";
import CustomReview from "@/components/miniComponents/CustomReview";
export const metadata = {
  title: "Product Detail",
  description: "Manage product detail options in your ecommerce dashboard.",
};
export default async function Page({ params }) {
  console.log(params);
  await params;

  return (
    <div>
      <ProductView id={params.id} />
      <CustomReview />
    </div>
  );
}
