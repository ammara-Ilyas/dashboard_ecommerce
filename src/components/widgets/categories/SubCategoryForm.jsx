// components/CategoryForm.js
"use client";
import { useState } from "react";
import { MenuItem, Select, TextField, Button } from "@mui/material";

const CategoryForm = () => {
  const [parentCategory, setParentCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");

  const handleParentCategoryChange = (event) => {
    setParentCategory(event.target.value);
  };

  const handleSubmit = () => {
    console.log({
      parentCategory,
      subCategory,
    });
    alert("Form submitted!");
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="space-y-4">
        {/* Parent Category Dropdown */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Parent Category
          </label>
          <Select
            value={parentCategory}
            onChange={handleParentCategoryChange}
            fullWidth
            displayEmpty
            className="!border-gray-300 !shadow-sm"
          >
            <MenuItem value="" disabled>
              Select a category
            </MenuItem>
            <MenuItem value="Footwear">Footwear</MenuItem>
            <MenuItem value="Clothing">Clothing</MenuItem>
            <MenuItem value="Accessories">Accessories</MenuItem>
          </Select>
        </div>

        {/* Sub Category Input */}
        <div>
          <TextField
            label="Sub Category"
            variant="outlined"
            fullWidth
            value={subCategory}
            onChange={(e) => setSubCategory(e.target.value)}
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
          Publish and View
        </Button>
      </div>
    </div>
  );
};

export default CategoryForm;
