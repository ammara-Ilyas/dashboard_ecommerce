"use client";
import { createContext, useState, useContext } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const [user, setUser] = useState({
    name: "Ammara Ilyas",
    email: "Ammarailyas535@gmail.com",
    img: "//////",
    phone: 789654123,
  });
  const togglePanel = () => setIsOpen((prev) => !prev);

  return (
    <UserContext.Provider
      value={{ user, setUser, togglePanel, isOpen, setIsOpen }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
