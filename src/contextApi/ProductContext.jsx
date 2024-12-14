"use client";

import { useStepContext } from "@mui/material";
import { createContext, useState, useContext } from "react";

const ProductContext = createContext();
const cate = ["Electronics", "Groceries", "Fashion", "Groceries"];
const subCate = ["Laptops", "Cooking Essentials", "Women", "Groceries"];
const originalProducts = [
  {
    id: 2,
    product: "HP 15-fc0154AU",
    category: "Electronics",
    subCategory: "Laptops",
    brand: "HP",
    priceOld: 55,
    priceNew: 55,
    rating: 4,
    title:
      "HP 15s-fr5012TU Standard Laptop (Intel Core i3-1215U/8 GB/512 GB SSD/Intel UHD Graphics/Windows 11 Home/MSO/FHD), 39.6cm (15.6 inch)",
    img: "www.hktjdfuj/",
    publih: "2024-09-11T06:33:27.831Z",
    ram: "8 GB",
    weight: "5KG",
    location: "Australia",
    size: "XL",
  },
  {
    id: 4,
    product: "Good Life MP Wheat",
    category: "Groceries",
    subCategory: "Cooking Essentials",
    brand: "Good Life",
    priceOld: 330,
    priceNew: 250,
    rating: 4,
    title:
      "HP 15s-fr5012TU Standard Laptop (Intel Core i3-1215U/8 GB/512 GB SSD/Intel UHD Graphics/Windows 11 Home/MSO/FHD), 39.6cm (15.6 inch)",
    img: "www.hktjdfuj/",
    publih: "2024-09-11T06:33:27.831Z",
    ram: "6GB",
    weight: "5KG",
    location: "Australia",
    size: "XL",
  },
  {
    id: 5,
    product: "Aashirvaad Super",
    category: "Groceries",
    subCategory: "Cooking Essentials",
    brand: "AASHIRVAAD",
    priceOld: 270,
    priceNew: 2,
    rating: 5,
    title:
      "HP 15s-fr5012TU Standard Laptop (Intel Core i3-1215U/8 GB/512 GB SSD/Intel UHD Graphics/Windows 11 Home/MSO/FHD), 39.6cm (15.6 inch)",
    img: "www.hktjdfuj/",
    publih: "2024-09-11T06:33:27.831Z",
    ram: "8 GB",
    weight: "5KG",
    location: "Australia",
    size: "XL",
  },
  {
    id: 6,
    product: "Siril Georgette Pink",
    category: "Fashion",
    subCategory: "Women",
    brand: "SIRIL",
    priceOld: 650,
    priceNew: 500,
    rating: 5,
    title:
      "HP 15s-fr5012TU Standard Laptop (Intel Core i3-1215U/8 GB/512 GB SSD/Intel UHD Graphics/Windows 11 Home/MSO/FHD), 39.6cm (15.6 inch)",
    img: "www.hktjdfuj/",
    publih: "2024-09-11T06:33:27.831Z",
    ram: "8 GB",
    weight: "5KG",
    location: "Australia",
    size: "XL",
  },
  {
    id: 8,
    product: "Altecia Tie and Dye",
    category: "Fashion",
    subCategory: "Women",
    brand: "Altecia",
    priceOld: 1800,
    priceNew: 1500,
    rating: 5,
    title:
      "HP 15s-fr5012TU Standard Laptop (Intel Core i3-1215U/8 GB/512 GB SSD/Intel UHD Graphics/Windows 11 Home/MSO/FHD), 39.6cm (15.6 inch)",
    img: "www.hktjdfuj/",
    publih: "2024-09-11T06:33:27.831Z",
    ram: "8 GB",
    weight: "5KG",
    location: "Australia",
    size: "XL",
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
let rams = ["4GB", "2GB", "6GB", "8 GB"];
const weights = ["2KG", "3KG", "4KG", "5KG"];
export const ProductProvider = ({ children }) => {
  const [categories, setCategories] = useState(cate);
  const [subCategories, setSubCategories] = useState(subCate);
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
