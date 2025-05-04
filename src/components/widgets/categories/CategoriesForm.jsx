"use client";
import { TextField, Button, InputLabel, CircularProgress } from "@mui/material";
import { useCategory } from "@/contextApi/CategoriesContext";
import { useRouter } from "next/navigation";
import { callPrivateApi } from "@/libs/callApis";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";

const Form = () => {
  const router = useRouter();
  const { categories, setCategories, setCategoryForm, categoryForm } =
    useCategory();
  const [loading, setLoading] = useState(false);
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
    console.log("file", file.name);
    setCategoryForm((prev) => ({
      ...prev,
      image: file,
    }));
  };

  // Handle Submit: Add or Edit functionality
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (
      categoryForm.name.trim() == "" &&
      categoryForm.color.trim() == "" &&
      categoryForm.image == null
    ) {
      toast.error("Please fill all fields");
    }
    console.log("category form", categoryForm);
    console.log("id", categoryForm.id == null);

    if (categoryForm.id !== null) {
      const formData = new FormData();
      formData.append("name", categoryForm.name);
      formData.append("color", categoryForm.color);
      formData.append("image", categoryForm.image);
      ////Edit functionality
      try {
        const res = await callPrivateApi(
          `/category/${categoryForm.id}`,
          "PUT",
          formData
        );
        console.log("res in category update", res);
        setCategories((prev) =>
          prev.map((cat) =>
            cat._id === categoryForm.id
              ? { ...cat, ...res.updatedCategory }
              : cat
          )
        );
        toast.success(res.message) || "Category updated successfully";
        router.push("/category/categories");
      } catch (error) {
        toast.error(error.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    } else {
      ///Add functionaity
      const formData = new FormData();
      formData.append("name", categoryForm.name);
      formData.append("color", categoryForm.color);
      formData.append("image", categoryForm.image);
      try {
        const res = await callPrivateApi("/category", "POST", formData);
        console.log("res in category add", res);

        // Add to context list after new category added
        setCategories((prev) => [...prev, res.newCategory]);
        if (res.Category) {
          toast.success(res.message || "Category added successfully");
        }
        router.push("/category/categories");
      } catch (error) {
        toast.error(error.message || "Someting went wrong");
      } finally {
        setLoading(false);
      }
    }
    // console.log("categories", categories);
    // Reset form state
    setCategoryForm({
      id: null,
      name: "",
      color: "",
      image: "",
    });
  };

  return (
    <div className="bg-white shadow rounded-lg p-6 mx-auto w-[95%] mt-8">
      <form onSubmit={handleSubmit} className="space-y-4">
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
            name="name"
            value={categoryForm.name}
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
          type="submit"
          className="!bg-blue-600 hover:!bg-blue-700 !text-white !py-2"
        >
          {loading ? (
            <CircularProgress size={24} color="inherit" />
          ) : categoryForm.id ? (
            "Update Category"
          ) : (
            "Add Category"
          )}
        </Button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Form;
