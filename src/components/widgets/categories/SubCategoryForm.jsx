"use client";
import { useState } from "react";
import { MenuItem, Select, TextField, Button } from "@mui/material";
import { useCategory } from "@/contextApi/CategoriesContext";
import { useRouter } from "next/navigation";

const CategoryForm = () => {
  const router = useRouter();
  const {
    subCategories,
    categories,
    setSubCategories,
    subCategoryForm,
    setSubCategoryForm,
  } = useCategory();

  // Function to generate a unique ID using Date.now()
  const generateUniqueId = () =>
    `${Date.now()}-${Math.floor(Math.random() * 10000)}`;

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
      parentCate: value,
    }));
  };

  // Handle Submit: Add or Edit functionality
  const handleSubmit = () => {
    const { subCate, parentCate } = subCategoryForm;

    if (subCate && parentCate) {
      if (subCategoryForm.id) {
        // Edit functionality: Update existing subcategory
        const updatedSubCategories = subCategories.map((sub) =>
          sub.id === subCategoryForm.id ? { ...subCategoryForm } : sub
        );
        setSubCategories(updatedSubCategories);
        alert("Sub-category updated successfully!");
      } else {
        // Add new subcategory
        const newSubCategory = {
          ...subCategoryForm,
          id: generateUniqueId(),
        };
        setSubCategories((prev) => [...prev, newSubCategory]);
        alert("New sub-category added successfully!");
      }

      // Reset form state
      setSubCategoryForm({
        id: null,
        parentCate: "",
        subCate: "",
      });
      router.push("/category/subList");
    } else {
      alert("Please fill out all fields.");
    }
  };

  return (
    <div className="bg-white shadow w-[97%] mx-auto rounded-lg p-6">
      <div className="space-y-4">
        {/* Parent Category Dropdown */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Parent Category
          </label>
          <Select
            value={subCategoryForm.parentCate || ""}
            onChange={handleParentCategoryChange}
            fullWidth
            displayEmpty
            className="!border-gray-300 !shadow-sm"
          >
            <MenuItem value="" disabled>
              Select Parent Category
            </MenuItem>
            {categories.map((item) => (
              <MenuItem value={item.name} key={item.id}>
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
            name="subCate"
            value={subCategoryForm.subCate || ""}
            onChange={handleForm}
            className="!border-gray-300 !shadow-sm"
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
          {subCategoryForm.id ? "Update Sub-category" : "Add Sub-category"}
        </Button>
      </div>
    </div>
  );
};

export default CategoryForm;
