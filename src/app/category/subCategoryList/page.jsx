import Header from "@/components/widgets/categories/CategoryHeader";

import CategoryTable from "@/components/widgets/categories/SubCAtegoryTabel";
const page = () => {
  const categoryData = [
    {
      image: "/images/fashion.png", // Use your own image path
      name: "Fashion",
      subcategories: ["Men", "Women"],
    },
    {
      image: "/images/electronics.png", // Use your own image path
      name: "Electronics",
      subcategories: [
        "Mobiles",
        "Laptops",
        "Smart Watch Accessories",
        "Cameras",
      ],
    },
  ];
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Header
        title="Add Category"
        breadcrumb={[
          { label: "Dashboard", href: "/" },
          { label: "Category", href: "/category" },
          { label: "Add Category", href: "/add-category" },
        ]}
      />
      <div className="min-h-screen bg-gray-100 p-6">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">
          Category List
        </h1>
        <CategoryTable data={categoryData} />
      </div>
    </div>
  );
};

export default page;
