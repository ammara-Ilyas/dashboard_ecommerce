"use client";
import { useUser } from "@/contextApi/UserContext";
import { RiMenuUnfold4Line } from "react-icons/ri";
import ThemeToggle from "../miniComponents/ThemeToggle";
import { IoIosNotificationsOutline } from "react-icons/io";
import { useTheme } from "@/contextApi/ThemeContext";
import { useCategory } from "@/contextApi/CategoriesContext";
import { LuMenu } from "react-icons/lu";

const Navbar = () => {
  const { isDarkMode } = useTheme();
  const { isSidebarOpen, toggleSidebar } = useCategory();
  const { user } = useUser();
  console.log("Nav bar");

  return (
    <div className={`${isDarkMode ? "dark" : ""}`}>
      <header className="flex w-[98vw] justify-between items-center bg-white shadow p-4">
        <div className="flex items-center">
          <h1 className="mr-4 text-xl font-bold text-blue-600">ECOMMERCE</h1>
          <button
            button="true"
            onClick={toggleSidebar}
            className="p-2 text-xl bg-gray-200 rounded-full hover:text-blue-600"
          >
            {isSidebarOpen ? <RiMenuUnfold4Line /> : <LuMenu />}
          </button>
        </div>
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <div className="p-2 text-xl bg-gray-200 rounded-full hover:text-blue-600">
            <IoIosNotificationsOutline />
          </div>
          <img
            src="https://via.placeholder.com/40"
            alt="profile"
            className="w-10 h-10 rounded-full"
          />
          <div>
            <p className="text-sm font-semibold">{user.name}</p>
            <p className="text-xs text-gray-500">{user.email}</p>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
