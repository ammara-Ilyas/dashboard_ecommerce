"use client";
import { useState } from "react";
import {
  MenuItem,
  Select,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import { useCategory } from "@/contextApi/CategoriesContext";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { callPrivateApi } from "@/libs/callApis";
const CategoryForm = () => {
  const router = useRouter();
  const [namegories, setnamegories] = useState([]);
  const [loading, setLoading] = useState(false);
  const { categories, setSubCategoryForm, subCategoryForm } = useCategory();

  // Handle Input Changes
  const handleForm = (e) => {
    const { name, value } = e.target;

    setSubCategoryForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle Parent Category Selection
  const handleParentCategoryChange = (e) => {
    const { value } = e.target;
    setSubCategoryForm((prev) => ({
      ...prev,
      category: value,
    }));
  };

  // Handle Submit: Add or Edit functionality
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, category, id } = subCategoryForm;

    // if (id) {
    //   const newFormData = new FormData();
    //   newFormData.append("name", name);
    //   newFormData.append("category_id", category);
    //   try {
    //     const res = await callPrivateApi(
    //       `/subcategory/${id}`,
    //       "POST",
    //       newFormData
    //     );
    //     if (res.status == 200) {
    //       toast.success(res.message || "Sub category updated successfully");
    //     }
    //     router.push("/category/subCategories");
    //   } catch (error) {
    //     toast.error(error.message || "Something went wrong");
    //   }
    // }

    const payload = {
      category_name: category,
      newSubCategories: [name],
    };
    try {
      const res = await callPrivateApi("/subcategory", "POST", payload);
      if (res.status == 200) {
        toast.success(res.message || "Sub category added successfully");
      }
      setSubCategoryForm({
        id: null,
        category: "",
        name: "",
      });
      router.push("/category/subCategories");
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow w-[97%] mx-auto rounded-lg p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Parent Category Dropdown */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Parent Category
          </label>
          <Select
            value={subCategoryForm.category || ""}
            onChange={handleParentCategoryChange}
            fullWidth
            displayEmpty
            className="!border-gray-300 !shadow-sm"
          >
            <MenuItem value="" disabled>
              None
            </MenuItem>
            {categories &&
              categories.map((item) => (
                <MenuItem value={item.name} key={item._id}>
                  {item.name}
                </MenuItem>
              ))}
          </Select>
        </div>

        {/* Sub Category Input */}
        <div>
          <TextField
            label="Sub Category"
            variant="outlined"
            fullWidth
            name="name"
            value={subCategoryForm.name || ""}
            onChange={handleForm}
            className="!border-gray-300 !shadow-sm"
          />
        </div>

        {/* Submit Button */}
        <Button
          variant="contained"
          fullWidth
          color="primary"
          type="submit"
          className="!bg-blue-600 hover:!bg-blue-700 !text-white !py-2"
        >
          {loading ? (
            <CircularProgress size={24} color="inherit" />
          ) : subCategoryForm._id ? (
            "Update Sub-category"
          ) : (
            "Add Sub-category"
          )}
        </Button>
      </form>
    </div>
  );
};

export default CategoryForm;
