"use client";
import React, { useState } from "react";
import Link from "next/link";
import { MdDashboard, MdLogout, MdCategory } from "react-icons/md";
import { useCategory } from "@/contextApi/CategoriesContext";
import { IoChevronForwardOutline } from "react-icons/io5";
import { FaProductHunt } from "react-icons/fa6";
import { BiSolidCategory } from "react-icons/bi";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import HomeIcon from "@mui/icons-material/Home";
const Sidebar = () => {
  const { isSidebarOpen } = useCategory();
  const [openMenu, setOpenMenu] = useState(null);

  const toggleMenu = (menu) => {
    setOpenMenu((prev) => (prev === menu ? null : menu));
    console.log("Clicked");
  };
  let cateList = {
    name: [
      "Category List",
      "Category upload",
      "Sub Category list",
      "Sub Category upload",
    ],
    link: [
      "/category/categories",
      "/category/uploadCategory",
      "/category/subCategories",
      "/category/uploadSubCategory",
    ],
  };
  let productList = {
    name: [
      "Product List",
      "Product upload",
      "Product Weight",
      "Product Ram",
      "Product Size",
    ],
    link: [
      "/product/products",
      "/product/upload",
      "/product/weight",
      "/product/ram",
      "/product/size",
    ],
  };
  let bannerList = {
    name: ["Home Banner List", "Home Banner upload"],
    link: ["/homeBanner/banners", "/homeBanner/upload"],
  };

  return (
    <div
      className={`w-[270px] h-[89vh] fixed bottom-0 pointer-events-auto z-20  bg-white  shadow-lg flex flex-col justify-between ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 ease-in-out bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300`}
    >
      {/* Sidebar menu */}
      <div className="p-4 mt-6">
        <ul className="space-y-2">
          {/* Dashboard */}
          <li>
            <Link
              href="/"
              className="flex items-center space-x-3 p-2 rounded-lg hover:bg-blue-100 dark:hover:bg-gray-700"
            >
              <MdDashboard className="text-xl" />
              <span>Dashboard</span>
            </Link>
          </li>
          <li>
            <button
              onClick={() => toggleMenu("homeBanner")}
              className={`w-full flex items-center justify-between p-2 rounded-lg transition-all duration-300 focus:bg-gray-300 hover:bg-blue-100${
                openMenu === "homeBanner"
                  ? " dark:bg-gray-600 text-blue-600"
                  : " dark:hover:bg-gray-700"
              }`}
            >
              <span className="flex items-center space-x-2 transform transition-transform duration-300">
                <HomeIcon className="text-[20px]" />
                <span
                  className={`transition-transform ${
                    openMenu === "homeBanner"
                      ? "translate-x-2"
                      : "translate-x-0"
                  }`}
                >
                  Home Side Banner
                </span>
              </span>
              <span
                className={`transform transition-transform duration-300 ${
                  openMenu === "homeBanner" ? "rotate-90" : "rotate-0"
                }`}
              >
                <IoChevronForwardOutline />
              </span>
            </button>
            <div
              className={`overflow-hidden transition-all duration-500 ${
                openMenu === "homeBanner" ? "max-h-screen mt-2" : "max-h-0"
              }`}
            >
              <ul className="ml-6 pt-2 pl-6 border-l border-gray-400 space-y-[12px] transition-all duration-500 ease-in-out">
                {bannerList.name.map((item, index) => (
                  <li
                    key={index}
                    className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer"
                  >
                    <Link href={bannerList.link[index]}>{item}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </li>
          {/* Products Dropdown */}
          <li>
            <button
              onClick={() => toggleMenu("products")}
              className={`w-full flex items-center justify-between p-2 rounded-lg transition-all duration-300 focus:bg-gray-300 hover:bg-blue-100${
                openMenu === "products"
                  ? " dark:bg-gray-600 text-blue-600"
                  : " dark:hover:bg-gray-700"
              }`}
            >
              <span className="flex items-center space-x-2 transform transition-transform duration-300">
                <FaProductHunt className="text-xl" />
                <span
                  className={`transition-transform ${
                    openMenu === "products" ? "translate-x-2" : "translate-x-0"
                  }`}
                >
                  Products
                </span>
              </span>
              <span
                className={`transform transition-transform duration-300 ${
                  openMenu === "products" ? "rotate-90" : "rotate-0"
                }`}
              >
                <IoChevronForwardOutline />
              </span>
            </button>
            <div
              className={`overflow-hidden transition-all duration-500 ${
                openMenu === "products" ? "max-h-screen mt-2" : "max-h-0"
              }`}
            >
              <ul className="ml-6 pt-2 pl-6 border-l border-gray-400 space-y-[12px] transition-all duration-500 ease-in-out">
                {productList.name.map((item, index) => (
                  <li
                    key={index}
                    className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer"
                  >
                    <Link href={productList.link[index]}>{item}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </li>
          {/* Categories Dropdown */}
          <li>
            <button
              onClick={() => toggleMenu("category")}
              className={`w-full flex items-center justify-between p-2 rounded-lg transition-all duration-300 focus:bg-gray-300 hover:bg-blue-100${
                openMenu === "category"
                  ? " dark:bg-gray-600 text-blue-600"
                  : " dark:hover:bg-gray-700"
              }`}
            >
              <span className="flex items-center space-x-2 transform transition-transform duration-300">
                <BiSolidCategory className="text-xl" />
                <span
                  className={`transition-transform ${
                    openMenu === "category" ? "translate-x-2" : "translate-x-0"
                  }`}
                >
                  Category
                </span>
              </span>
              <span
                className={`transform transition-transform duration-300 ${
                  openMenu === "category" ? "rotate-90" : "rotate-0"
                }`}
              >
                <IoChevronForwardOutline />
              </span>
            </button>
            <div
              className={`overflow-hidden transition-all duration-500 ${
                openMenu === "category" ? "max-h-screen mt-2" : "max-h-0"
              }`}
            >
              <ul className="ml-6 pt-2 pl-6 border-l border-gray-400 space-y-[12px] transition-all duration-500 ease-in-out">
                {cateList.name.map((item, index) => (
                  <li
                    key={index}
                    className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer"
                  >
                    <Link href={cateList.link[index]}>{item}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </li>
          {/* Orders */}
          <li>
            <Link
              href="/order"
              className="flex items-center space-x-3 p-2 rounded-lg hover:bg-blue-100 dark:hover:bg-gray-700"
            >
              <span className="flex items-center space-x-2">
                <AssignmentTurnedInIcon className="text-xl" />
                <span>Orders</span>
              </span>
            </Link>
          </li>{" "}
          {/* reviews */}
          <li>
            <Link
              href="/review"
              className="flex items-center space-x-3 p-2 rounded-lg hover:bg-blue-100 dark:hover:bg-gray-700"
            >
              <span className="flex items-center space-x-2">
                <AssignmentTurnedInIcon className="text-xl" />
                <span>Reviews</span>
              </span>
            </Link>
          </li>
        </ul>
      </div>

      {/* Logout Button */}
      <div className="p-4">
        <button className="w-full bg-blue-500 text-white p-2 rounded-lg flex items-center justify-center hover:bg-blue-600">
          <MdLogout className="mr-2 text-xl" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
