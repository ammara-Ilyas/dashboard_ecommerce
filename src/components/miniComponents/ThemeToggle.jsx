"use client";
import React from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import { useTheme } from "@/contextApi/ThemeContext";

const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 focus:outline-none shadow-lg"
    >
      {isDarkMode ? (
        <FaSun className="text-yellow-400 text-2xl" />
      ) : (
        <FaMoon className="text-blue-600 text-2xl" />
      )}
    </button>
  );
};

export default ThemeToggle;
