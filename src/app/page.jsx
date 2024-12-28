"use client";
import HeroSection from "@/components/widgets/dashboard/DashboardStats";
import ProductList from "@/components/widgets/dashboard/ProductList";
import TotalSalesChart from "@/components/widgets/dashboard/TotalSalesChart";
import { useCategory } from "@/contextApi/CategoriesContext";
import NotificationsDropdown from "@/components/widgets/notification/NotificationsDropdown";
const Home = () => {
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
