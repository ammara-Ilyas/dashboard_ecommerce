import React, { useState, useEffect } from "react";
import { useProducts } from "@/contextApi/ProductContext";
import { Select, MenuItem } from "@mui/material";

const ProductFilter = () => {
  const { products, categories, setProducts, originalProducts } = useProducts();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Handle category filter
  const handleCategoryChange = (event) => {
    const value = event.target.value;
    setSelectedCategory(value);

    if (value !== "all") {
      filteredProducts = originalProducts.filter(
        (product) => product.category.toLowerCase() === value.toLowerCase()
      );
      setProducts(filteredProducts);
    } else if (value == "all") {
      setProducts(originalProducts);
    }

    // Apply search filter if any query exists
    if (searchQuery) {
      filteredProducts = originalProducts.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setProducts(filteredProducts);
  };

  // Handle search query
  const handleSearchQuery = (e) => {
    const value = e.target.value;
    // setSearchQuery(value);

    // Filter products based on search query

    filteredProducts = filteredProducts.filter(
      (product) =>
        product.name.toLowerCase().includes(value.toLowerCase()) ||
        product.description.toLowerCase().includes(value.toLowerCase())
    );

    // Apply category filter if selected
    if (selectedCategory !== "all") {
      filteredProducts = filteredProducts.filter(
        (product) =>
          product.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    setProducts(filteredProducts);
  };

  return (
    <div className="flex flex-row w-full border-2 border-green-600 items-center justify-between p-4 bg-white dark:bg-gray-800 shadow-md rounded-md">
      {/* Category Filter */}
      <Select
        value={selectedCategory}
        onChange={handleCategoryChange}
        className="w-[200px] rounded-md bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 border-ring-blue-300"
        displayEmpty
      >
        <MenuItem value="all">All</MenuItem>
        {categories.map((item, i) => (
          <MenuItem value={item} key={i}>
            {item}
          </MenuItem>
        ))}
      </Select>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search products..."
        className="px-4 w-1/3 py-2 rounded-md bg-white text-gray-800 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
        value={searchQuery}
        onChange={handleSearchQuery}
      />
    </div>
  );
};

export default ProductFilter;
