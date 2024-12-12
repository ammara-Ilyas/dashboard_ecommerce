"use client";

import React, { useState } from "react";
import Link from "next/link";
import { MdDashboard, MdLogout, MdCategory } from "react-icons/md";
import { useCategory } from "@/contextApi/CategoriesContext";
const Sidebar = () => {
  const { isSidebarOpen } = useCategory(); // Sidebar context for visibility toggle
  const [openMenu, setOpenMenu] = useState(null); // State to track the currently open menu

  // Handle dropdown toggle
  const toggleMenu = (menu) => {
    setOpenMenu((prev) => (prev === menu ? null : menu));
  };

  return (
    <div
      className={`w-[270px] h-[85vh] fixed bottom-0 left-0 shadow-lg flex flex-col justify-between ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 ease-in-out bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300`}
    >
      {/* Sidebar menu */}
      <div className="p-4">
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

          {/* Categories Dropdown */}
          <li>
            <button
              onClick={() => toggleMenu("categories")}
              className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-blue-100 dark:hover:bg-gray-700"
            >
              <span className="flex items-center space-x-2">
                <MdCategory className="text-xl" />
                <span>Categories</span>
              </span>
              <span
                className={`transform ${
                  openMenu === "categories" ? "rotate-180" : ""
                }`}
              >
                ▼
              </span>
            </button>
            {openMenu === "categories" && (
              <ul className="ml-6 mt-2 space-y-2">
                <li>
                  <Link
                    href="/category/categorylist"
                    className="block hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    Category List
                  </Link>
                </li>
                <li>
                  <Link
                    href="/category/categoryadd"
                    className="block hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    Add a Category
                  </Link>
                </li>
                <li>
                  <Link
                    href="/category/subCategoryList"
                    className="block hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    Sub Category List
                  </Link>
                </li>
                <li>
                  <Link
                    href="/category/subCategoryAdd"
                    className="block hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    Add a Sub Category
                  </Link>
                </li>
              </ul>
            )}
          </li>

          {/* Products Dropdown */}
          <li>
            <button
              onClick={() => toggleMenu("products")}
              className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-blue-100 dark:hover:bg-gray-700"
            >
              <span className="flex items-center space-x-2">
                <MdCategory className="text-xl" />
                <span>Products</span>
              </span>
              <span
                className={`transform ${
                  openMenu === "products" ? "rotate-180" : ""
                }`}
              >
                ▼
              </span>
            </button>
            {openMenu === "products" && (
              <ul className="ml-6 mt-2 space-y-2">
                <li className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer">
                  <Link href="/product/productList">Product List</Link>
                </li>
                <li className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer">
                  <Link href="/product/productAdd">Add a Product</Link>
                </li>
                <li className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer">
                  <Link href="/product/addProductRam">Manage RAM</Link>
                </li>
                <li className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer">
                  <Link href="/product/addProductWeight">Manage Weight</Link>
                </li>
                <li className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer">
                  <Link href="/product/addProductSize">Manage Size</Link>
                </li>
              </ul>
            )}
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
                  openMenu === "homeBanner" ? "rotate-180" : ""
                }`}
              >
                ▼
              </span>
            </button>
            {openMenu === "homeBanner" && (
              <ul className="ml-6 mt-2 space-y-2">
                <li className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer">
                  Banner List
                </li>
                <li className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer">
                  Banner Add
                </li>
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
