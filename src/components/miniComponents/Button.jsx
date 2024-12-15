"use client";
import React from "react";

const Button = ({ title, handleButton }) => {
  return (
    <button
      className="bg-blue-700 ml-4 text-white p-2 rounded-md hover:bg-blue-800 transition-all ease-in-out"
      onClick={handleButton}
    >
      {title}
    </button>
  );
};

export default Button;
