"use client";

import Navbar from "@/components/header/Navbar";
import Sidebar from "@/components/header/Sidebar";
import HeroSection from "@/components/widgets/DashboardStats";
import ProductList from "@/components/widgets/ProductList";
import { useTheme } from "@/contextApi/ThemeContext";

const Home = () => {
  const { isDarkMode } = useTheme();

  return (
    <div className={`${isDarkMode ? "dark" : ""}`}>
      <div className="flex bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white min-h-screen">
        <Sidebar />
        <div className="flex-grow ml-64">
          <div className="p-4">
            <HeroSection />
            <ProductList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
