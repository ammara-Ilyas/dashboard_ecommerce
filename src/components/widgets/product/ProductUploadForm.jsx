"use client";
import React, { useEffect, useState } from "react";
import {
  TextField,
  MenuItem,
  Button,
  Rating,
  Select,
  InputLabel,
  FormControl,
  CircularProgress,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { CloudUpload as CloudUploadIcon, Spa } from "@mui/icons-material";
import Image from "next/image";
import { useCallback } from "react";
import { useTheme } from "@mui/material";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useProducts } from "@/contextApi/ProductContext";
import { useCategory } from "@/contextApi/CategoriesContext";
import { callPrivateApi } from "@/libs/callApis";
import { getToken } from "@/libs/Token";
function ProductUploadForm() {
  let { categories, ramList, weightsList, sizeList } = useCategory();
  let { formData, setFormData, setProducts, products, productData } =
    useProducts();
  const router = useRouter();
  const [subCategories, setSubCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [rating, setRating] = useState(0);
  const [isEditMode, setIsEditMode] = useState(false);
  const { isDarkMode } = useTheme();
  const [token, setToken] = useState(null);

  useEffect(() => {
    const t = getToken();
    setToken(t);
  }, []);
  useEffect(() => {
    setRating(formData.rating || 0);
  }, [formData.rating]);

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      rating,
    }));
  }, [rating, setFormData]);

  useEffect(() => {
    const selectedCategory = categories.find(
      (category) => category._id === formData.category
    );

    console.log("categories form", formData.category);
    console.log("categories", categories);

    console.log("Subcategories found:", selectedCategory);
    setSubCategories(selectedCategory ? selectedCategory.subCategory : []);
  }, [formData.category, categories]);

  // Use useCallback to memoize the event handler
  const handleFormData = useCallback(
    (e) => {
      const { name, value } = e.target;
      if (name === "rating") {
        setRating(value); // Update rating directly when the user changes it
      } else {
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      }
    },
    [setFormData]
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Step 1: Validate all required fields
    for (const [key, value] of Object.entries(formData)) {
      const isEmpty = value === "" || value === null || value === undefined;
      if (["subCategory", "weight", "ram", "size", "id"].includes(key))
        continue;

      if (isEmpty) {
        toast.error(`Please fill the "${key}" field.`, {
          position: "bottom-left",
        });
        return; // Stop form submission
      }
    }
    ///validation for image
    if (images.length === 0) {
      toast.error("Please upload at least one image.", {
        position: "bottom-left",
      });
      return;
    }
    const data = new FormData();
    for (const [key, value] of Object.entries(formData)) {
      if (["id"].includes(key)) continue;
      data.append(key, value);
    }
    images.forEach((file, index) => {
      data.append("images", file);
    });
    console.log("Form Data Submitted:", formData);
    setLoading(true);

    if (formData.id) {
      try {
        const res = await callPrivateApi(
          `/product/${formData._id}`,
          "PUT",
          data,
          token
        );
        console.log("res in update product ", res);
        if (res.status === 200 || res?.data?.status === 200) {
          toast.success(res.message || "Product updated successfully");
          router.push("/product/products");
          setProducts((prev) =>
            prev.map((item) =>
              item._id === res.product._id ? res.product : item
            )
          );
          setFormData(productData);
        } else {
          toast.error(res.message || "Failed to update product");
        }
      } catch (error) {
        toast.error(error?.message || "Something went wrong");
      } finally {
        setLoading(false);
      }

      setIsEditMode(false);
    } else {
      try {
        const res = await callPrivateApi("/product", "POST", data, token);
        console.log("res in add product ", res);
        if (res.status === 200 || res?.data?.status === 200) {
          toast.success(res.message || "Product added successfully");
          router.push("/product/products");
          setProducts((prev) => [...prev, res.product]);
          setFormData(productData);
        } else {
          toast.error(res.message || "Failed to add product");
        }
      } catch (error) {
        toast.error(error?.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    }
  };
  const [images, setImages] = useState(null);
  const [imagePreviews, setImagePreviews] = useState([]); // to store preview URLs

  // Handle file input and preview
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const previewUrls = selectedFiles.map((file) => URL.createObjectURL(file));
    setImages(selectedFiles);
    setImagePreviews(previewUrls);
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
                name="product"
                value={formData.product}
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
              {categories &&
                categories.map((cate, i) => (
                  <MenuItem value={cate._id} key={cate._id}>
                    {cate.name}
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
              {subCategories.length !== 0 ? (
                subCategories.map((cate, i) => (
                  <MenuItem value={cate.name} key={cate._id}>
                    {cate.name}
                  </MenuItem>
                ))
              ) : (
                <MenuItem value="">None</MenuItem>
              )}
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
              name="newPrice"
              type="number"
              value={formData.newPrice}
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
              {weightsList &&
                weightsList.map((weightItem) => (
                  <MenuItem value={weightItem._id} key={weightItem._id}>
                    {weightItem.weight}
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
              {ramList.map((ramItem) => (
                <MenuItem value={ramItem._id} key={ramItem._id}>
                  {ramItem.ram}
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
              {sizeList &&
                sizeList.map((sizeItem) => (
                  <MenuItem value={sizeItem._id} key={sizeItem._id}>
                    {sizeItem.size}
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
            <Rating
              value={rating}
              onChange={(event, newValue) => {
                setRating(newValue);
              }}
            />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-6">
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.isFeatured}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    isFeatured: e.target.checked,
                  }))
                }
                name="isFeatured"
              />
            }
            label="Featured Product"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.istopSeller}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    istopSeller: e.target.checked,
                  }))
                }
                name="istopSeller"
              />
            }
            label="Top Seller"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.isNewArrival}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    isNewArrival: e.target.checked,
                  }))
                }
                name="isNewArrival"
              />
            }
            label="New Arrival"
          />
        </div>

        <div className="space-y-4">
          <h3 className="font-semibold text-gray-700">Media</h3>

          <label
            htmlFor="file-upload"
            className="flex flex-col items-center justify-center w-48 h-48 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 transition-all"
          >
            {imagePreviews.length > 0 ? (
              <div className="grid grid-cols-2 gap-2 p-1">
                {imagePreviews.map((src, idx) => (
                  <Image
                    key={idx}
                    src={src}
                    alt={`Preview ${idx}`}
                    width={50}
                    height={50}
                    className="w-20 h-20 object-cover rounded"
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2">
                <CloudUploadIcon className="text-gray-400" fontSize="large" />
                <p className="text-sm text-gray-500 dark:text-gray-300">
                  Click to upload
                </p>
              </div>
            )}
            <input
              id="file-upload"
              type="file"
              name="media"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
        </div>
        {/* Submit Button */}
        <div className="text-center">
          {" "}
          {loading ? (
            <div className="">
              <CircularProgress />
            </div>
          ) : (
            <Button
              type="submit"
              variant="contained"
              className="bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
            >
              <span>{isEditMode ? "Update" : "Publish and View"}</span>
            </Button>
          )}
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}

export default ProductUploadForm;
