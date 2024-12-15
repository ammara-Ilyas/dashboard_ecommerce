"use client";

import { useStepContext } from "@mui/material";
import { createContext, useState, useContext } from "react";

const ProductContext = createContext();

const originalProducts = [
  {
    id: 1,
    name: "Smartphone X1",
    description: "A high-performance smartphone with advanced features.",
    category: "Electronics",
    subCategory: "Smartphones",
    price: 1200,
    oldPrice: 1500,
    stock: 50,
    weight: "200g",
    ram: "8GB",
    size: "6.5-inch",
    brand: "BrandX",
    discount: 20,
    rating: 4.5,
    location: "Warehouse A",
    media: "https://via.placeholder.com/150?text=Smartphone+X1",
  },
  {
    id: 2,
    name: "Gaming Laptop G5",
    description: "A powerful gaming laptop with a sleek design.",
    category: "Electronics",
    subCategory: "Laptops",
    price: 2500,
    oldPrice: 2800,
    stock: 30,
    weight: "2.5kg",
    ram: "16GB",
    size: "15.6-inch",
    brand: "BrandG",
    discount: 10,
    rating: 4.8,
    location: "Warehouse B",
    media: "https://via.placeholder.com/150?text=Gaming+Laptop+G5",
  },
  {
    id: 3,
    name: "Wireless Earbuds Z3",
    description: "Compact and high-quality wireless earbuds.",
    category: "Accessories",
    subCategory: "Audio",
    price: 150,
    oldPrice: 200,
    stock: 100,
    weight: "50g",
    ram: "N/A",
    size: "One Size",
    brand: "BrandZ",
    discount: 25,
    rating: 4.2,
    location: "Warehouse C",
    media: "https://via.placeholder.com/150?text=Wireless+Earbuds+Z3",
  },
  {
    id: 4,
    name: "Smartwatch Pro 7",
    description: "A smartwatch with health tracking and GPS features.",
    category: "Wearables",
    subCategory: "Smartwatches",
    price: 500,
    oldPrice: 600,
    stock: 70,
    weight: "150g",
    ram: "2GB",
    size: "One Size",
    brand: "BrandW",
    discount: 15,
    rating: 4.6,
    location: "Warehouse D",
    media: "https://via.placeholder.com/150?text=Smartwatch+Pro+7",
  },
  {
    id: 5,
    name: "4K Ultra HD TV",
    description: "A stunning 55-inch 4K Ultra HD television.",
    category: "Electronics",
    subCategory: "Televisions",
    price: 1000,
    oldPrice: 1300,
    stock: 20,
    weight: "15kg",
    ram: "N/A",
    size: "55-inch",
    brand: "BrandTV",
    discount: 23,
    rating: 4.7,
    location: "Warehouse E",
    media: "https://via.placeholder.com/150?text=4K+Ultra+HD+TV",
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
let productSizes = [
  { id: 5, size: "XS" },
  { id: 8, size: "S" },
  { id: 9, size: "M" },
  { id: 10, size: "XL" },
  { id: 20, size: "XXl" },
];
let rams = [
  { id: 55, ram: "4GB" },
  { id: 50, ram: "2GB" },
  { id: 60, ram: "6GB" },
  { id: 85, ram: "8 GB" },
];
const weights = [
  { id: 995, weight: "5KG" },
  { id: 905, weight: "4KG" },
  { id: 975, weight: "3KG" },
  { id: 915, weight: "2KG" },
];
export const ProductProvider = ({ children }) => {
  const [location, setLocation] = useState(countries);
  const [sizesList, setSizesList] = useState(productSizes);
  const [weightsList, setWeightsList] = useState(weights);
  const [ramList, setRamList] = useState(rams);
  const [products, setProducts] = useState(originalProducts);
  const [formData, setFormData] = useState(productData);

  return (
    <ProductContext.Provider
      value={{
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
