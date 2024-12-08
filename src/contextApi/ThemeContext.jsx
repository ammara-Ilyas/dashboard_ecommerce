"use client";
import React, { createContext, useState, useContext, useEffect } from "react";

// Create the ThemeContext
const ThemeContext = createContext();

// Theme Provider
export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Save and load theme preference from local storage
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    setIsDarkMode(storedTheme === "dark");
  }, []);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem("theme", newMode ? "dark" : "light");
      return newMode;
    });
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  return useContext(ThemeContext);
};
