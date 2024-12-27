"use client";
import { createContext, useState, useContext } from "react";
// import avatar from "public/image/avatar.jpg";
const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const notifications = [
    {
      id: 1,
      user: "Mahmudul",
      action: "added to his favorite list",
      item: "Leather belt steve madden",
      avatar: "public/image/avatar.jpg/40",
      message: "Mahmudul added Leather belt steve madden to his favorite list",
      time: "2 hours ago",
    },
    {
      id: 2,
      user: "Mahmudul",
      action: "added to his favorite list",
      item: "Leather belt steve madden",
      avatar: "public/image/avatar.jpg/40",
      message: "Mahmudul added Leather belt steve madden to his favorite list",
      time: "3 hours ago",
    },
    {
      id: 3,
      user: "Mahmudul",
      action: "added to his favorite list",
      item: "Leather belt steve madden",
      avatar: "public/image/avatar.jpg/40",
      message: "Mahmudul added Leather belt steve madden to his favorite list",
      time: "4 hours ago",
    },
    {
      id: 4,
      user: "Mahmudul",
      action: "purchased",
      item: "Nike Air Max",
      avatar: "public/image/avatar.jpg/40",
      message: "Mahmudul purchased Nike Air Max",
      time: "5 hours ago",
    },
    {
      id: 5,
      user: "Mahmudul",
      action: "reviewed",
      item: "Adidas Ultraboost",
      avatar: "public/image/avatar.jpg/40",
      message: "Mahmudul reviewed Adidas Ultraboost",
      time: "6 hours ago",
    },
    {
      id: 6,
      user: "Mahmudul",
      action: "added to his cart",
      item: "Apple Watch Series 6",
      avatar: "public/image/avatar.jpg/40",
      message: "Mahmudul added Apple Watch Series 6 to his cart",
      time: "7 hours ago",
    },
    {
      id: 7,
      user: "Mahmudul",
      action: "purchased",
      item: "Samsung Galaxy S21",
      avatar: "public/image/avatar.jpg/40",
      message: "Mahmudul purchased Samsung Galaxy S21",
      time: "8 hours ago",
    },
    {
      id: 8,
      user: "Mahmudul",
      action: "reviewed",
      item: "Sony WH-1000XM4",
      avatar: "public/image/avatar.jpg/40",
      message: "Mahmudul reviewed Sony WH-1000XM4",
      time: "9 hours ago",
    },
  ];
  const [isOpen, setIsOpen] = useState(false);

  const [user, setUser] = useState({
    name: "Ammara Ilyas",
    email: "Ammarailyas535@gmail.com",
    img: "//////",
    phone: 789654123,
  });
  const togglePanel = () => setIsOpen((prev) => !prev);
  console.log("provider");

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        togglePanel,
        isOpen,
        setIsOpen,
        notifications,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
