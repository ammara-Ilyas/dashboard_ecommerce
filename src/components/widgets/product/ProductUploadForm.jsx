"use client";
import React, { useState } from "react";
import {
  TextField,
  MenuItem,
  Button,
  Rating,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";

export default function ProductUploadForm() {
  const [darkMode, setDarkMode] = useState(false);
  const [rating, setRating] = useState(0);

  return (
    <div
      className={`${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
      } min-h-screen p-8`}
    >
      <form className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md space-y-6">
        {/* Basic Information */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Basic Information</h2>
          <div className="grid grid-cols-2 gap-6">
            <TextField
              label="Product Name"
              fullWidth
              className="dark:text-white dark:border-gray-600 dark:bg-gray-700"
            />
            <TextField
              label="Description"
              fullWidth
              multiline
              rows={3}
              className="dark:text-white dark:border-gray-600 dark:bg-gray-700"
            />
          </div>
        </div>

        {/* Category Details */}
        <div className="grid grid-cols-3 gap-6">
          <FormControl fullWidth>
            <InputLabel className="dark:text-gray-200">Category</InputLabel>
            <Select className="dark:text-white dark:bg-gray-700">
              <MenuItem value="none">None</MenuItem>
              <MenuItem value="electronics">Electronics</MenuItem>
              <MenuItem value="fashion">Fashion</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel className="dark:text-gray-200">Sub Category</InputLabel>
            <Select className="dark:text-white dark:bg-gray-700">
              <MenuItem value="none">None</MenuItem>
              <MenuItem value="mobiles">Mobiles</MenuItem>
              <MenuItem value="clothing">Clothing</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Price"
            fullWidth
            type="number"
            className="dark:text-white dark:border-gray-600 dark:bg-gray-700"
          />
        </div>

        {/* Product Attributes */}
        <div className="grid grid-cols-4 gap-6">
          <TextField
            label="SKU"
            fullWidth
            className="dark:text-white dark:border-gray-600 dark:bg-gray-700"
          />
          <TextField
            label="Stock"
            fullWidth
            type="number"
            className="dark:text-white dark:border-gray-600 dark:bg-gray-700"
          />
          <TextField
            label="Brand"
            fullWidth
            className="dark:text-white dark:border-gray-600 dark:bg-gray-700"
          />
          <TextField
            label="Discount"
            fullWidth
            type="number"
            className="dark:text-white dark:border-gray-600 dark:bg-gray-700"
          />
        </div>

        {/* Additional Details */}
        <div className="grid grid-cols-3 gap-6">
          <TextField
            label="Weight"
            fullWidth
            type="number"
            className="dark:text-white dark:border-gray-600 dark:bg-gray-700"
          />
          <TextField
            label="Size"
            fullWidth
            className="dark:text-white dark:border-gray-600 dark:bg-gray-700"
          />
          <FormControl fullWidth>
            <InputLabel className="dark:text-gray-200">Location</InputLabel>
            <Select className="dark:text-white dark:bg-gray-700">
              <MenuItem value="warehouse1">Warehouse 1</MenuItem>
              <MenuItem value="warehouse2">Warehouse 2</MenuItem>
            </Select>
          </FormControl>
        </div>

        {/* Media and Ratings */}
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold">Media</h3>
            <input
              type="file"
              className="block w-full mt-2 text-gray-500 dark:text-gray-300"
            />
          </div>
          <div className="flex items-center gap-4">
            <h3 className="font-semibold">Rating:</h3>
            <Rating
              value={rating}
              onChange={(e, newValue) => setRating(newValue)}
              className="dark:text-gray-400"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <Button
            variant="contained"
            className="bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            Publish and View
          </Button>
        </div>
      </form>
    </div>
  );
}
