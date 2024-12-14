// layout.jsx
"use client";
import { useCategory } from "@/contextApi/CategoriesContext";
const Wrapper = ({ children }) => {
  const { isSidebarOpen } = useCategory();
  console.log("isopen", isSidebarOpen);

  return (
    <div className=" relative overflow-hidden w-full border-2 border-green-700 dark:bg-gray-900 text-gray-800 dark:text-white min-h-screen">
      <div
        className={`transform ${
          isSidebarOpen ? "translate-x-0 " : "-translate-x-[0%] "
        } transition-transform duration-300 ease-in-out `}
      >
        {children}
      </div>
    </div>
  );
};

export default Wrapper;
