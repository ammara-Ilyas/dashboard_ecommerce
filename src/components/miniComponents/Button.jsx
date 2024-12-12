"use client";
import React from "react";

const Button = ({ title, handleButton = { handleButton } }) => {
  return (
    <button
      className="bg-blue-700 text-white p-2 rounded-md hover:bg-blue-800 transition-all ease-in-out"
      onClick={handleButton}
    >
      {title}
    </button>
  );
};

export default Button;
