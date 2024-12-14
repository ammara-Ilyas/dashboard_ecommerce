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

const CategoryContext = createContext();
export const CategoryProvider = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [bannerList, setBannerList] = useState(banner);
  const [bannerFormData, setBannerFormData] = useState(null);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  return (
    <CategoryContext.Provider
      value={{
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
