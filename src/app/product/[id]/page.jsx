import ProductView from "@/components/widgets/product/ProductView";
import CustomReview from "@/components/miniComponents/CustomReview";
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
