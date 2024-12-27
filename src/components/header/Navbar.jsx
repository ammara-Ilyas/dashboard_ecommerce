"use client";
import { useUser } from "@/contextApi/UserContext";
import { RiMenuUnfold4Line } from "react-icons/ri";
import { IoIosNotificationsOutline } from "react-icons/io";
import { useCategory } from "@/contextApi/CategoriesContext";
import { LuMenu } from "react-icons/lu";
import Image from "next/image";
import logo from "/public/image/logo.png";
import { usePathname } from "next/navigation";
const Navbar = () => {
  const { isSidebarOpen, toggleSidebar } = useCategory();
  const { user, togglePanel } = useUser();
  // console.log("Nav bar");
  const pathname = usePathname();
  console.log("pathname", pathname);

  return (
    <div className={`relative`}>
      <header className="flex w-[99vw]  pointer-events-auto z-50  fixed top-0 left-0 visible justify-between items-center bg-white shadow p-4">
        <div
          className="flex items-center space-x-3
          ml-2"
        >
          <span>
            <Image src={logo} alt="logo" width={50} height={50} />
          </span>
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
          <div
            className="p-2 text-xl bg-gray-200 rounded-full hover:text-blue-600"
            onClick={togglePanel}
            aria-label="Notifications"
          >
            <IoIosNotificationsOutline />
          </div>

          <Image
            src={logo}
            alt="profile"
            className="w-10 h-10 rounded-full"
            width={50}
            height={50}
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
