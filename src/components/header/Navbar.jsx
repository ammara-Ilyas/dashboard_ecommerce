"use client";
import { useUser } from "@/contextApi/UserContext";
import { RiMenuUnfold4Line } from "react-icons/ri";
import { MdPerson, MdSecurity, MdLogout } from "react-icons/md";
import { IoIosNotificationsOutline } from "react-icons/io";
import { useCategory } from "@/contextApi/CategoriesContext";
import Link from "next/link";
import Avatar from "@mui/material/Avatar";
import { blue } from "@mui/material/colors"; // Import a valid color
import { LuMenu } from "react-icons/lu";
import Image from "next/image";
import logo from "@/assets/image/logo.png";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
const Navbar = () => {
  const router = useRouter();
  const { isSidebarOpen, toggleSidebar } = useCategory();
  const { togglePanel } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState({}); // <-- user state

  // g("Nav bar");
  const pathname = usePathname();
  // g("pathname", pathname);
  const account = [
    { name: "My Account", link: "/auth/account", icon: <MdPerson size={20} /> },
    {
      name: "Reset Password",
      link: "/auth/reset-password",
      icon: <MdSecurity size={20} />,
    },
  ];
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    router.push("/");
  };

  const getUserFromLocalStorage = () => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser) : null;
    }
    return null;
  };

  useEffect(() => {
    const parsedUser = getUserFromLocalStorage();

    setUser(parsedUser);
  }, []);

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
        <div className="flex items-center space-x-4 mr-5">
          {/* <div
            className="p-2 text-xl bg-gray-200 rounded-full hover:text-blue-600"
            onClick={togglePanel}
            aria-label="Notifications"
          >
            <IoIosNotificationsOutline />
          </div> */}

          <div className="relative flex flex-row gap-2 items-center justify-center">
            {user ? (
              <>
                {user.img ? (
                  <Avatar alt={user.name} src={user.img} />
                ) : (
                  <Avatar sx={{ bgcolor: blue[800] }}>
                    {user.name?.charAt(0) || "U"}
                  </Avatar>
                )}

                <div
                  onClick={() => setIsOpen((prev) => !prev)}
                  className="cursor-pointer"
                >
                  <p className="text-sm font-semibold">{user.name}</p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
              </>
            ) : (
              <>
                <Avatar sx={{ bgcolor: blue[800] }}>L</Avatar>
                <div>
                  <Link
                    href="/auth/login"
                    className="text-sm font-semibold text-gray-400"
                  >
                    Login
                  </Link>
                  <p className="text-xs text-gray-300">Loading...</p>
                </div>
              </>
            )}

            {isOpen && user && (
              <ul className="absolute flex flex-col gap-2 w-[190px] bg-white z-50 py-3 border rounded-md shadow-md top-10 left-12">
                {account.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 cursor-pointer transition-all"
                  >
                    <span className="text-gray-700">{item.icon}</span>
                    <Link href={item.link} className="text-sm text-gray-800">
                      {item.name}
                    </Link>
                  </li>
                ))}
                <li
                  className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 cursor-pointer transition-all"
                  onClick={handleLogout}
                >
                  <MdLogout size={20} className="text-gray-700" /> Logout
                </li>
              </ul>
            )}
          </div>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
