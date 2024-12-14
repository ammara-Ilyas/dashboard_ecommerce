import ProductView from "@/components/widgets/product/ProductView";

export default async function Page({ params }) {
  console.log(params);
  await params;
  return (
    <div>
      <ProductView id={params.id} />
    </div>
  );
}
