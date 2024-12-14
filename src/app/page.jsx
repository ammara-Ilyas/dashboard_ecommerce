"use client";

import Navbar from "@/components/header/Navbar";
import Sidebar from "@/components/header/Sidebar";
import HeroSection from "@/components/widgets/dashboard/DashboardStats";
import ProductList from "@/components/widgets/dashboard/ProductList";
import { useTheme } from "@/contextApi/ThemeContext";
import TotalSalesChart from "@/components/widgets/dashboard/TotalSalesChart";
import { useCategory } from "@/contextApi/CategoriesContext";
const Home = () => {
  const { isDarkMode } = useTheme();
  const { isSidebarOpen } = useCategory();

  return (
    <div className="relative overflow-hidden  dark:bg-gray-900 text-gray-800 dark:text-white min-h-screen">
      <div
        className={`transform ${
          isSidebarOpen ? "translate-x-0 w-[80%]" : "-translate-x-[0%] w-[98%]"
        } transition-transform duration-300 ease-in-out ml-auto`}
      >
        <HeroSection />
        <ProductList />
        <TotalSalesChart />
      </div>
    </div>
  );
};

export default Home;
