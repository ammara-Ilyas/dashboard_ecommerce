// pages/add-category.js
import Header from "@/components/widgets/categories/CategoryHeader";
import Form from "@/components/widgets/categories/CategoriesForm";
import CategoryForm from "@/components/widgets/categories/SubCategoryForm";
const page = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Header
        title="Add Category"
        breadcrumb={["Dashboard", "Category", "Add Category"]}
      />
      <div className="mt-6">
        <CategoryForm />
      </div>
    </div>
  );
};

export default page;
