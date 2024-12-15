// pages/add-category.js
import Header from "@/components/widgets/categories/CategoryHeader";
import Form from "@/components/widgets/categories/CategoriesForm";
const page = () => {
  return (
    <>
      <Header
        title="Add Category"
        breadcrumb={["Dashboard", "Category", "Add Category"]}
      />
      <Form />
    </>
  );
};

export default page;
