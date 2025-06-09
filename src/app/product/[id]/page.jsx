import SingleProduct from "@/components/widgets/product/single/SingleProduct";
import { callPrivateApi, callPublicApi } from "@/libs/callApis";

// Metadata function
export async function generateMetadata({ params }) {
  const { id } = await params;

  try {
    const res = await callPublicApi(`/product/${id}`, "GET");
    const product = res.product;
    console.log("product in server", product);

    return {
      title: product.name || "Product Detail",
      description:
        product.description ||
        "Manage product detail in your ecommerce dashboard.",
    };
  } catch (error) {
    return {
      title: "Product Detail",
      description: "Error loading product detail.",
    };
  }
}

// Page Component: Fetch product once here
export default async function Page({ params }) {
  const { id } = await params;

  let product = null;

  try {
    const res = await callPublicApi(`/product/${id}`, "GET");
    product = res.product;
  } catch (error) {
    console.error("Product fetch error:", error);
  }

  return (
    <div>
      <SingleProduct product={product} />
    </div>
  );
}
