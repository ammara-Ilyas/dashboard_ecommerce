"use client";
import React, { useState } from "react";
import Link from "next/link";
import { MdDashboard, MdLogout, MdCategory } from "react-icons/md";
import { useCategory } from "@/contextApi/CategoriesContext";
import { IoChevronForwardOutline } from "react-icons/io5";
import { FaProductHunt } from "react-icons/fa6";
import { BiSolidCategory } from "react-icons/bi";

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
      "/category/listCate",
      "/category/uploadCategory",
      "/category/subList",
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
      className={`w-[270px] h-[89vh] fixed bottom-0 pointer-events-auto z-50  bg-white  shadow-lg flex flex-col justify-between ${
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
              className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-blue-100 dark:hover:bg-gray-700"
            >
              <span className="flex items-center space-x-2">
                <MdCategory className="text-xl" />
                <span>Home Side Banner</span>
              </span>
              <span
                className={`transform ${
                  openMenu === "homeBanner" ? "rotate-90" : ""
                }`}
              >
                <IoChevronForwardOutline />
              </span>
            </button>
            {openMenu === "homeBanner" && (
              <ul className="ml-6 pt-2 pl-6 border-l border-gray-400 space-y-[12px] transition-all duration-300 ease-in-out">
                {bannerList.name.map((item, index) => (
                  <li
                    key={index}
                    className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer"
                  >
                    <Link href={bannerList.link[index]}>{item}</Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
          {/* Products Dropdown */}
          <li>
            <button
              onClick={() => toggleMenu("products")}
              className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-blue-100 dark:hover:bg-gray-700"
            >
              <span className="flex items-center space-x-2 ">
                <FaProductHunt className="text-xl" />
                <span>Products</span>
              </span>
              <span
                className={`transform ${
                  openMenu === "products" ? "rotate-90 " : ""
                }`}
              >
                <IoChevronForwardOutline />
              </span>
            </button>
            {openMenu === "products" && (
              <ul className="ml-6 pt-2 pl-6 border-l border-gray-400 space-y-[12px] transition-all duration-300 ease-in-out">
                {productList.name.map((item, index) => (
                  <li
                    key={index}
                    className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer"
                  >
                    <Link href={productList.link[index]}>{item}</Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
          {/* Categories Dropdown */}
          <li>
            <button
              onClick={() => toggleMenu("category")}
              className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-blue-100 dark:hover:bg-gray-700"
            >
              <span className="flex items-center space-x-2">
                <BiSolidCategory className="text-xl" />
                <span>Category</span>
              </span>
              <span
                className={`transform ${
                  openMenu === "category" ? "rotate-90" : ""
                }`}
              >
                <IoChevronForwardOutline />
              </span>
            </button>
            {openMenu === "category" && (
              <ul className="ml-6 pt-2 pl-6 border-l border-gray-400 space-y-[12px] transition-all duration-300 ease-in-out">
                {cateList.name.map((item, index) => (
                  <li
                    key={index}
                    className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer"
                  >
                    <Link href={cateList.link[index]}>{item}</Link>
                  </li>
                ))}
              </ul>
            )}
          </li>

          {/* Orders */}
          <li>
            <Link
              href="/order"
              className="flex items-center space-x-3 p-2 rounded-lg hover:bg-blue-100 dark:hover:bg-gray-700"
            >
              <span>Orders</span>
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
