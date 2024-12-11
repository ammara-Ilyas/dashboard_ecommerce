// layout.jsx
"use client";
import { useSidebar } from "@/contextApi/SidebarContext";

const Layout = ({ children }) => {
  const { isSidebarOpen } = useSidebar();

  return (
    <div className="relative overflow-hidden dark:bg-gray-900 text-gray-800 dark:text-white min-h-screen">
      <div
        className={`transform ${
          isSidebarOpen ? "translate-x-0 w-[80%]" : "-translate-x-[0%] w-[98%]"
        } transition-transform duration-300 ease-in-out ml-auto`}
      >
        {children}
      </div>
    </div>
  );
};

export default Layout;
