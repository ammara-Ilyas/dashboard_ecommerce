"use client";
import React from "react";
import { IconButton, Button } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

const images = [
  {
    id: 1,
    src: "/images/sale1.jpg",
    alt: "Big Sale - 50% Off",
  },
  {
    id: 2,
    src: "/images/sale2.jpg",
    alt: "End of Season Sale - 50% Off",
  },
  {
    id: 3,
    src: "/images/sale3.jpg",
    alt: "Festive Sale",
  },
  {
    id: 4,
    src: "/images/sale4.jpg",
    alt: "Crazy Deals - ₹499",
  },
];

const HomeBannerTabel = () => {
  const handleEdit = (id) => {
    alert(`Edit image with ID: ${id}`);
  };

  const handleDelete = (id) => {
    alert(`Delete image with ID: ${id}`);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
      <div className="bg-white shadow-md rounded-lg p-6 w-full ">
        <h2 className="text-lg font-semibold mb-4">Image and Action</h2>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-blue-600">
              <th className="text-white font-bold py-2 px-4 text-left">
                Image
              </th>
              <th className="text-white font-bold py-2 px-4 text-left">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {images.map((image) => (
              <tr key={image.id} className="border-b hover:bg-gray-100">
                <td className="py-2 px-4">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="h-24 rounded-lg object-cover"
                  />
                </td>
                <td className="py-2 px-4 flex items-center gap-2">
                  <IconButton
                    onClick={() => handleEdit(image.id)}
                    className="text-green-500"
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDelete(image.id)}
                    className="text-red-500"
                  >
                    <Delete />
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

export default HomeBannerTabel;
