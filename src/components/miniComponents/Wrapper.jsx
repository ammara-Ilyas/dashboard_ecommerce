// Wrapper.jsx
"use client";
import { useCategory } from "@/contextApi/CategoriesContext";
const Wrapper = ({ children }) => {
  const { isSidebarOpen } = useCategory();

  return (
    <div className="relative overflow-hidden w-full  ">
      <div
        className={`transform ${
          isSidebarOpen ? "translate-x-0 w-[80%]" : "-translate-x-[0%] w-[98%]"
        } transition-transform duration-300 ease-in-out ml-auto `}
      >
        {children}
      </div>
    </div>
  );
};

export default Wrapper;
