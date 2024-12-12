// components/CategoryList.js
import React from "react";
import { Button, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const categories = [
  { image: "/images/jewellery.png", name: "Jewellery", color: "#d3ffd9" },
  { image: "/images/wellness.png", name: "Wellness", color: "#fff3ff" },
  { image: "/images/beauty.png", name: "Beauty", color: "#e3fffa" },
  { image: "/images/groceries.png", name: "Groceries", color: "#ffe8f8" },
  { image: "/images/footwear.png", name: "Footwear", color: "#def3ff" },
];

const CategoryList = () => {
  console.log("categories");

  return (
    <div className="p-6 bg-gray-50">
      <div className="flex justify-between items-center mb-4">
        <Button
          variant="contained"
          color="primary"
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          Add Category
        </Button>
      </div>
      <div className="bg-white shadow rounded">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-blue-100">
              <th className="py-3 px-6 text-left text-sm font-medium text-gray-700">
                Image
              </th>
              <th className="py-3 px-6 text-left text-sm font-medium text-gray-700">
                Category
              </th>
              <th className="py-3 px-6 text-left text-sm font-medium text-gray-700">
                Color
              </th>
              <th className="py-3 px-6 text-center text-sm font-medium text-gray-700">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category, index) => (
              <tr
                key={index}
                className={`${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                } hover:bg-gray-100`}
              >
                <td className="py-3 px-6">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-10 h-10 rounded-full"
                  />
                </td>
                <td className="py-3 px-6">{category.name}</td>
                <td className="py-3 px-6">
                  <span
                    className="py-1 px-3 rounded-full text-sm"
                    style={{ backgroundColor: category.color }}
                  >
                    {category.color}
                  </span>
                </td>
                <td className="py-3 px-6 text-center">
                  <IconButton
                    aria-label="edit"
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    aria-label="delete"
                    className="text-red-500 hover:text-red-700"
                  >
                    <DeleteIcon />
                  </IconButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CategoryList;
