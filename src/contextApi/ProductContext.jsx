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

const countries = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  "Argentina",
  "Armenia",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bhutan",
  "Bolivia",
];

let productData = {
  name: "",
  description: "",
  category: "",
  subCategory: "",
  price: 0,
  oldPrice: 0,
  weight: 0,
  ram: 0,
  brand: "",
  stock: 0,
  discount: 0,
  location: "",
  size: "",
  rating: 0,
};
let productSizes = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"];
let rams = [
  { id: 1, value: "4GB" },
  { id: 2, value: "8GB" },
];
const weights = [
  { id: 1, value: "2KG" },
  { id: 2, value: "4KG" },
  { id: 3, value: "5KG" },
];
export const ProductProvider = ({ children }) => {
  const [categories, setCategories] = useState(cate);
  const [subCategories, setSubCategories] = useState(cate);
  const [location, setLocation] = useState(countries);
  const [sizesList, setSizesList] = useState(productSizes);
  const [weightsList, setWeightsList] = useState(weights);
  const [ramList, setRamList] = useState(rams);
  const [products, setProducts] = useState(originalProducts);
  const [formData, setFormData] = useState(productData);

  return (
    <ProductContext.Provider
      value={{
        categories,
        setCategories,
        subCategories,
        setSubCategories,
        weightsList,
        setWeightsList,
        ramList,
        setRamList,
        sizesList,
        setSizesList,
        location,
        setLocation,
        products,
        setProducts,
        originalProducts,
        formData,
        setFormData,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  return useContext(ProductContext);
};
