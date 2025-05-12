"use client";

import { createContext, useState, useContext, useEffect } from "react";
import { fetchData } from "@/libs/fetchData";
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
    media: "/images/download.jpg",
    published: "2024-09-11T06:33:27.831Z",
    reviews: [
      {
        name: "Alice Johnson",
        date: "2024-12-20",
        text: "Amazing phone with great features!",
        rating: 5,
        imageUrl: "https://via.placeholder.com/50?text=AJ",
      },
      {
        name: "Bob Smith",
        date: "2024-12-18",
        text: "Good performance but battery life is average.",
        rating: 4,
        imageUrl: "https://via.placeholder.com/50?text=BS",
      },
    ],
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
    published: "2024-09-11T06:33:27.831Z",
    reviews: [
      {
        name: "Charlie Brown",
        date: "2024-12-19",
        text: "Best laptop for gaming!",
        rating: 5,
        imageUrl: "https://via.placeholder.com/50?text=CB",
      },
      {
        name: "Daisy Green",
        date: "2024-12-17",
        text: "Great for gaming, but it heats up sometimes.",
        rating: 4,
        imageUrl: "https://via.placeholder.com/50?text=DG",
      },
    ],
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
    published: "2024-09-11T06:33:27.831Z",
    reviews: [
      {
        name: "Alice White",
        date: "2024-12-16",
        text: "Excellent sound quality and comfortable to wear.",
        rating: 5,
        imageUrl: "https://via.placeholder.com/50?text=AW",
      },
      {
        name: "Frank Black",
        date: "2024-12-14",
        text: "Good for the price, but not very durable.",
        rating: 3,
        imageUrl: "https://via.placeholder.com/50?text=FB",
      },
    ],
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
    published: "2024-09-11T06:33:27.831Z",
    reviews: [
      {
        name: "Emily Stone",
        date: "2024-12-13",
        text: "Accurate health tracking and excellent GPS.",
        rating: 5,
        imageUrl: "https://via.placeholder.com/50?text=ES",
      },
      {
        name: "George White",
        date: "2024-12-11",
        text: "Stylish design but battery drains quickly.",
        rating: 4,
        imageUrl: "https://via.placeholder.com/50?text=GW",
      },
    ],
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
    published: "2024-09-11T06:33:27.831Z",
    reviews: [
      {
        name: "Hannah Grey",
        date: "2024-12-10",
        text: "Crisp picture quality and vibrant colors.",
        rating: 5,
        imageUrl: "https://via.placeholder.com/50?text=HG",
      },
      {
        name: "Ian Black",
        date: "2024-12-08",
        text: "Good value for the price but lacks some smart features.",
        rating: 4,
        imageUrl: "https://via.placeholder.com/50?text=IB",
      },
    ],
  },
];

let productData = {
  id: null,
  product: "",
  description: "",
  category: "",
  subCategory: "",
  newPrice: 0,
  oldPrice: 0,
  weight: "",
  ram: "",
  brand: "",
  stock: 0,
  discount: 0,
  size: "",
  rating: 0,
  isFeatured: false,
  isTopSeller: false,
  isNewArrival: false,
};

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState(originalProducts);
  const [formData, setFormData] = useState(productData);
  // useEffect(() => {
  //   const getData = async () => {
  //     const { responseSize, responseWeight, responseRam } = await fetchData();
  //     console.log(
  //       "responses in contextApi",
  //       responseSize,
  //       responseWeight,
  //       responseRam
  //     );

  //     if (responseSize?.sizes) setSizesList(responseSize.sizes);
  //     if (responseWeight?.weights) setWeightsList(responseWeight.weights);
  //     if (responseRam?.rams) setRamList(responseRam.rams);
  //   };

  //   getData();
  // }, []);

  return (
    <ProductContext.Provider
      value={{
        products,
        setProducts,
        originalProducts,
        formData,
        setFormData,
        productData,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  return useContext(ProductContext);
};
