"use client";
import { TextField, Button, InputLabel } from "@mui/material";
import { useCategory } from "@/contextApi/CategoriesContext";
import { useRouter } from "next/navigation";

const Form = () => {
  const router = useRouter();
  const { categories, setCategories, setCategoryForm, categoryForm } =
    useCategory();

  // Function to generate a unique ID using Date.now()
  const generateUniqueId = () => {
    return `${Date.now()}-${Math.floor(Math.random() * 10000)}`;
  };

  // Handle Input Changes
  const handleForm = (e) => {
    const { name, value } = e.target;

    setCategoryForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle File Upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setCategoryForm((prev) => ({
      ...prev,
      img: file, // Store file in `img`
    }));
  };

  // Handle Submit: Add or Edit functionality
  const handleSubmit = () => {
    if (
      (categoryForm.name != "") &
      (categoryForm.color != "") &
      (categoryForm.img != null)
    ) {
      if (categoryForm.id) {
        // Edit functionality: Update existing category
        const updatedCategories = categories.map((cat) => {
          cat.id === categoryForm.id ? categoryForm : cat;
          console.log("vc", cat);
        });
        setCategories([updatedCategories]);
        alert("Category updated successfully!");
      } else {
        const newCategory = { ...categoryForm, id: generateUniqueId() };
        setCategories((prev) => [...prev, newCategory]);
        alert("New category added successfully!");
      }
      router.push("/category/categories");
    } else {
      alert("add form");
    }
    console.log("categories", categories);

    // Reset form state
    setCategoryForm({
      id: null,
      cate: "",
      color: "",
      img: "",
    });
  };

  return (
    <div className="bg-white shadow rounded-lg p-6 mx-auto w-[95%] mt-8">
      <div className="space-y-4">
        {/* Category Name */}
        <div className="flex flex-col">
          <InputLabel
            shrink
            className="uppercase text-black text-[16px] font-semibold"
          >
            Category Name
          </InputLabel>
          <TextField
            variant="outlined"
            fullWidth
            name="cate"
            value={categoryForm.cate}
            onChange={handleForm}
            className="!border-gray-300 !shadow-sm"
          />
        </div>

        {/* Color */}
        <div className="flex flex-col">
          <InputLabel
            shrink
            className="uppercase text-black text-[16px] font-semibold"
          >
            Color
          </InputLabel>
          <TextField
            variant="outlined"
            fullWidth
            name="color"
            value={categoryForm.color}
            onChange={handleForm}
            className="!border-gray-300 !shadow-sm"
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Image Upload
          </label>
          <input
            type="file"
            onChange={handleImageUpload}
            className="block w-full text-sm text-gray-600 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:bg-gray-100 file:text-gray-600 hover:file:bg-gray-200"
          />
        </div>

        {/* Submit Button */}
        <Button
          variant="contained"
          fullWidth
          color="primary"
          onClick={handleSubmit}
          className="!bg-blue-600 hover:!bg-blue-700 !text-white !py-2"
        >
          {categoryForm.id ? "Update Category" : "Add Category"}
        </Button>
      </div>
    </div>
  );
};

export default Form;
