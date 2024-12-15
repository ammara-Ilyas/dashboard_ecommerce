"use client";
import { createContext, useState, useContext } from "react";
const banner = [
  {
    id: 1,
    src: "/images/sale1.jpg",
    alt: "Big Sale - 50% Off",
  },
  {
    id: 2,
    src: "/images/sale2.jpg",
    alt: "End of Season Sale - 50% Off",
  },
  {
    id: 3,
    src: "/images/sale3.jpg",
    alt: "Festive Sale",
  },
  {
    id: 4,
    src: "/images/sale4.jpg",
    alt: "Crazy Deals - ₹499",
  },
];
const subCategoryData = [
  {
    image: "/images/fashion.png", // Use your own image path
    name: "Fashion",
    subcategories: ["Men", "Women"],
  },
  {
    image: "/images/electronics.png", // Use your own image path
    name: "Electronics",
    subcategories: ["Mobiles", "Laptops", "Smart Watch Accessories", "Cameras"],
  },
];
const cate = [
  ({
    id: 1,
    color: "blue",
    category: "Electronics",
    image: "/images/footwear.png",
  },
  {
    id: 2,
    color: "red",
    category: "Groceries",
    image: "/images/footwear.png",
  },
  { id: 3, color: "blue", category: "Fashion", image: "/images/footwear.png" },
  {
    id: 4,
    color: "blue",
    category: "Electronics",
    image: "/images/footwear.png",
  }),
];
const cateform = {
  id: 0,
  cate: "",
  color: "",
  img: "",
};
const subCateform = {
  id: 0,
  cate: null,
  subCate: "",
};
const CategoryContext = createContext();
export const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState(cate);
  const [subCategories, setSubCategories] = useState(subCategoryData);
  const [categoryForm, setCategoryForm] = useState(cateform);
  const [subCategoryForm, setSubCategoryForm] = useState(subCateform);
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [bannerList, setBannerList] = useState(banner);
  const [bannerFormData, setBannerFormData] = useState(null);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  return (
    <CategoryContext.Provider
      value={{
        categories,
        setCategories,
        categoryForm,
        setCategoryForm,
        subCategories,
        setSubCategories,
        subCategoryForm,
        setSubCategoryForm,
        isSidebarOpen,
        toggleSidebar,
        bannerList,
        setBannerList,
        bannerFormData,
        setBannerFormData,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategory = () => {
  const context = useContext(CategoryContext);
  console.log("Nav bar Provider");

  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};
