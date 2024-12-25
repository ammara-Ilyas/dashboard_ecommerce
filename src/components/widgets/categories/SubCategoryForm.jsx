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
    console.log("sub form", subCategoryForm);

    if (subCate && parentCate) {
      const existingCategoryIndex = subCategories.findIndex(
        (sub) => sub.name == parentCate
      );

      console.log("existing", existingCategoryIndex);
      if (existingCategoryIndex !== -1) {
        // Category exists, add the subcategory to its subcategories array
        const updatedSubCategories = [...subCategories];
        const existingCategory = updatedSubCategories[existingCategoryIndex];
        console.log("existing", existingCategory);

        if (!existingCategory.subcategories.includes(subCate)) {
          existingCategory.subcategories.push(subCate);
          alert(`Sub-category "${subCate}" added to "${parentCate}".`);
        } else {
          alert(
            `Sub-category "${subCate}" already exists under "${parentCate}".`
          );
        }

        setSubCategories(updatedSubCategories);
      } else {
        // Category does not exist, add it as a new category with the subcategory
        const selectedCategory = categories.find(
          (cat) => cat.cate == parentCate
        );

        const newCategory = {
          name: parentCate,
          image: selectedCategory ? selectedCategory.img : null,
          subcategories: [subCate],
        };

        setSubCategories((prev) => [...prev, newCategory]);
        alert(
          `New category "${parentCate}" with sub-category "${subCate}" added.`
        );
      }

      // Reset form state
      setSubCategoryForm({
        id: null,
        parentCate: "",
        subCate: "",
      });
      router.push("/category/subCategories");
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
              None
            </MenuItem>
            {categories.map((item) => (
              <MenuItem value={item.cate} key={item.id}>
                {item.cate}
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
