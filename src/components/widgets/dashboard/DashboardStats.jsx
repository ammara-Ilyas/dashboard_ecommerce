"use client";
import { useCategory } from "@/contextApi/CategoriesContext";
import { useEffect, useState } from "react";
import { FaUserAlt, FaShoppingCart, FaBox, FaStar } from "react-icons/fa";

const HeroSection = () => {
  const { orderList, users, reviews } = useCategory();
  const [stats, setStats] = useState([]);
  useEffect(() => {
    setStats([
      {
        title: "Total Users",
        value: users.length || 120,
        color: "bg-green-500",
        icon: <FaUserAlt className="text-white text-4xl" />,
      },
      {
        title: "Total Orders",
        value: orderList.length || 96,
        color: "bg-pink-500",
        icon: <FaShoppingCart className="text-white text-4xl" />,
      },
      {
        title: "Total Products",
        value: 86,
        color: "bg-blue-500",
        icon: <FaBox className="text-white text-4xl" />,
      },
      {
        title: "Total Reviews",
        value: reviews.length || 50,
        color: "bg-yellow-500",
        icon: <FaStar className="text-white text-4xl" />,
      },
    ]);
  }, [users, reviews, orderList]);
  return (
    <div className="grid grid-cols-1 w-[98%] mx-auto pb-9 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-4">
      {stats.map((stat, index) => (
        <div
          key={index}
          className={`relative flex items-center justify-between py-5 px-4 rounded-lg shadow-lg overflow-hidden text-white ${stat.color}`}
        >
          <div className=" absolute inset-y-0 left-0 w-1/2 bg-white/20 blur-3xl"></div>

          <div className="relative z-10 ">
            <p className="text-lg font-bold pb-2">{stat.title}</p>
            <h3 className="text-3xl font-bold">{stat.value}</h3>
          </div>

          <div className="relative z-10 flex items-center justify-center bg-white/40 rounded-lg p-3">
            {stat.icon}
          </div>
        </div>
      ))}
    </div>
  );
};

export default HeroSection;
