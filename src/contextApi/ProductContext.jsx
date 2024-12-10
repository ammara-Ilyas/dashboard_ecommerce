"use client";

import { useStepContext } from "@mui/material";
import { createContext, useState, useContext } from "react";

const ProductContext = createContext();
const cate = ["All", "Electronics", "Groceries", "Fashion"];
const originalProducts = [
  {
    product: "HP 15-fc0154AU",
    category: "Electronics",
    subCategory: "Laptops",
    brand: "HP",
    priceOld: 55,
    priceNew: 55,
    rating: 4,
  },
  {
    product: "Good Life MP Wheat",
    category: "Groceries",
    subCategory: "Cooking Essentials",
    brand: "Good Life",
    priceOld: 330,
    priceNew: 250,
    rating: 4,
  },
  {
    product: "Aashirvaad Super",
    category: "Groceries",
    subCategory: "Cooking Essentials",
    brand: "AASHIRVAAD",
    priceOld: 270,
    priceNew: 2,
    rating: 5,
  },
  {
    product: "Siril Georgette Pink",
    category: "Fashion",
    subCategory: "Women",
    brand: "SIRIL",
    priceOld: 650,
    priceNew: 500,
    rating: 5,
  },
  {
    product: "Altecia Tie and Dye",
    category: "Fashion",
    subCategory: "Women",
    brand: "Altecia",
    priceOld: 1800,
    priceNew: 1500,
    rating: 5,
  },
];

export const ProductProvider = ({ children }) => {
  const [categories, setCategories] = useState(cate);
  const [products, setProducts] = useState(originalProducts);

  return (
    <ProductContext.Provider
      value={{
        categories,
        setCategories,
        products,
        setProducts,
        originalProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  return useContext(ProductContext);
};
