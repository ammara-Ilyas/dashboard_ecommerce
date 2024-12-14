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
import { CloudUpload as CloudUploadIcon } from "@mui/icons-material";

import { useTheme } from "@mui/material";
import { useProducts } from "@/contextApi/ProductContext";

function ProductUploadForm() {
  let {
    formData,
    setFormData,
    categories,
    subCategories,
    location,
    ramList,
    weightsList,
    sizesList,
  } = useProducts();

  const { isDarkMode } = useTheme();

  // Handle input changes for all fields
  const handleFormData = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
  };

  const [image, setImage] = useState(null);

  // Handle file input and preview
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file); // Temporary preview URL
      setImage(imageUrl);
    }
  };
  return (
    <div
      className={`${
        isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
      } min-h-screen p-8`}
    >
      <form
        onSubmit={handleSubmit}
        className="bg-white border-[1px] dark:bg-gray-800 p-6 rounded-lg shadow-md space-y-6"
      >
        {/* Basic Information */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Basic Information</h2>
          <div className="grid grid-cols-1 gap-6 ">
            <div className="flex flex-col ">
              <InputLabel
                shrink
                className="uppercase text-black text-[16px] font-semibold "
              >
                Product name
              </InputLabel>
              <TextField
                name="name"
                value={formData.name}
                onChange={handleFormData}
                fullWidth
              />
            </div>
            <div className="flex flex-col ">
              <InputLabel
                shrink
                className="uppercase text-black text-[16px] font-semibold "
              >
                Description
              </InputLabel>
              <TextField
                name="description"
                value={formData.description}
                onChange={handleFormData}
                fullWidth
                multiline
                rows={3}
              />
            </div>
          </div>
        </div>

        {/* Category Details */}
        <div className="grid grid-cols-2 gap-6">
          <FormControl fullWidth>
            <InputLabel
              shrink
              className="uppercase text-black text-[16px] font-semibold "
            >
              category
            </InputLabel>{" "}
            <Select
              name="category"
              value={formData.category}
              onChange={handleFormData}
              className="mt-3"
            >
              {categories.map((cate, i) => (
                <MenuItem value={cate} key={i}>
                  {cate}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel
              shrink
              className="uppercase text-black text-[16px] font-semibold "
            >
              sub category
            </InputLabel>{" "}
            <Select
              name="subCategory"
              value={formData.subCategory}
              onChange={handleFormData}
              className="mt-3"
            >
              {subCategories.map((cate, i) => (
                <MenuItem value={cate} key={i}>
                  {cate}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div className="flex flex-col ">
            <InputLabel
              shrink
              className="uppercase text-black text-[16px] font-semibold "
            >
              Product Price
            </InputLabel>
            <TextField
              name="price"
              type="number"
              value={formData.price}
              onChange={handleFormData}
              fullWidth
            />
          </div>
          <div className="flex flex-col ">
            <InputLabel
              shrink
              className="uppercase text-black text-[16px] font-semibold "
            >
              Old Price
            </InputLabel>
            <TextField
              name="oldPrice"
              type="number"
              value={formData.oldPrice}
              onChange={handleFormData}
              fullWidth
            />
          </div>
          <div className="flex flex-col ">
            <InputLabel
              shrink
              className="uppercase text-black text-[16px] font-semibold "
            >
              Product Stocks
            </InputLabel>
            <TextField
              name="stock"
              type="number"
              value={formData.stock}
              onChange={handleFormData}
              fullWidth
            />
          </div>
        </div>

        {/* Additional Details */}
        <div className="grid grid-cols-3 gap-6">
          <FormControl fullWidth>
            <InputLabel
              shrink
              className="uppercase text-black text-[16px] font-semibold"
            >
              Product Weight
            </InputLabel>{" "}
            <Select
              name="weight"
              value={formData.weight}
              onChange={handleFormData}
              className="mt-3"
            >
              {weightsList.map((weight) => (
                <MenuItem value={weight.weight} key={weight.id}>
                  {weight.weight}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel
              shrink
              className="uppercase text-black text-[16px] font-semibold"
            >
              Product Rams
            </InputLabel>
            <Select
              name="ram"
              value={formData.ram}
              onChange={handleFormData}
              className="mt-3"
              displayEmpty
            >
              {ramList.map((ram) => (
                <MenuItem value={ram.ram} key={ram.id}>
                  {ram.ram}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel
              shrink
              className="uppercase text-black text-[16px] font-semibold"
            >
              Product Size
            </InputLabel>{" "}
            <Select
              name="size"
              value={formData.size}
              onChange={handleFormData}
              className="mt-3"
            >
              {sizesList.map((size, i) => (
                <MenuItem value={size.size} key={size.id}>
                  {size.size}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="grid grid-cols-3 gap-6">
          <div className="flex flex-col ">
            <InputLabel
              shrink
              className="uppercase text-black text-[16px] font-semibold "
            >
              Brand
            </InputLabel>
            <TextField
              name="brand"
              value={formData.brand}
              onChange={handleFormData}
              fullWidth
            />
          </div>
          <div className="flex flex-col ">
            <InputLabel
              shrink
              className="uppercase text-black text-[16px] font-semibold "
            >
              Discount
            </InputLabel>
            <TextField
              name="discount"
              type="number"
              value={formData.discount}
              onChange={handleFormData}
              fullWidth
            />
          </div>
          <div className="flex items-center gap-4">
            <h3 className="font-semibold">Rating:</h3>
            <Rating value={formData.rating} onChange={handleFormData} />
          </div>
        </div>
        <div className="grid grid-cols-1 ">
          <FormControl fullWidth>
            <InputLabel
              shrink
              className="uppercase text-black text-[16px] font-semibold"
            >
              Location
            </InputLabel>{" "}
            <Select
              name="location"
              value={formData.location}
              onChange={handleFormData}
              className="mt-3"
            >
              {location.map((loc, i) => (
                <MenuItem value={loc} key={i}>
                  {loc}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        {/* Media 
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold">Media</h3>
            <input
              type="file"
              name="media"
              onChange={handleFormData}
              className="block w-full mt-2 text-gray-500 dark:text-gray-300"
            />
          </div>
        </div> */}
        <div className="space-y-4">
          <h3 className="font-semibold text-gray-700">Media</h3>

          <label
            htmlFor="file-upload"
            className="flex flex-col items-center justify-center w-48 h-48 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 transition-all"
          >
            {/* Show Image Preview or Default Upload State */}
            {image ? (
              <img
                src={image}
                alt="Uploaded"
                className="w-full h-full object-cover rounded-lg"
              />
            ) : (
              <div className="flex flex-col items-center gap-2">
                <CloudUploadIcon className="text-gray-400" fontSize="large" />
                <p className="text-sm text-gray-500 dark:text-gray-300">
                  Click to upload
                </p>
              </div>
            )}

            {/* Hidden File Input */}
            <input
              id="file-upload"
              type="file"
              name="media"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
        </div>
        {/* Submit Button */}
        <div className="text-center">
          <Button
            type="submit"
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

export default ProductUploadForm;
