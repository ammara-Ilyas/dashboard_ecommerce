"use client";
import { createContext, useState, useContext } from "react";

const CategoryContext = createContext();
export const CategoryProvider = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  return (
    <CategoryContext.Provider value={{ isSidebarOpen, toggleSidebar }}>
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
