"use client";
import React, { useState } from "react";
import { IoChevronForwardOutline } from "react-icons/io5";

export const NestedList = ({ title, list, icon }) => {
  const [openMenu, setOpenMenu] = useState(null); // State to track the currently open menu

  // Handle dropdown toggle
  const toggleMenu = (menu) => {
    setOpenMenu((prev) => (prev === menu ? null : menu));
    console.log("Clicked");
  };

  <div>
    <button
      onClick={() => toggleMenu({ title })}
      className="w-full border-2 border-red-900 flex items-center justify-between p-2 rounded-lg hover:bg-blue-100 dark:hover:bg-gray-700"
    >
      <span className="flex items-center space-x-2 ">
        {icon}
        <span className="capitalize">{title}</span>
      </span>
      <span
        className={`transform ${openMenu === `${title}` ? "rotate-90 " : ""}`}
      >
        <IoChevronForwardOutline />
      </span>
    </button>
    {openMenu === title && (
      <ul className="ml-4 pt-2 pl-6 border-l border-gray-400 space-y-[12px] transition-all duration-300 ease-in-out">
        <li className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer">
          <Link href="/product/productList">Product List</Link>
        </li>
        {list.name.map((item, index) => (
          <li
            key={index}
            className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer"
          >
            <Link href={list.link[index]}>{item}</Link>
          </li>
        ))}
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
  </div>;
};
