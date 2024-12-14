"use client";
import React from "react";
import { IconButton } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { useCategory } from "@/contextApi/CategoriesContext";

const HomeBannerTabel = () => {
  const { bannerList, setBannerList, setBannerFormData } = useCategory();
  const router = useRouter();

  const handleEdit = (id) => {
    const bannerToEdit = bannerList.find((item) => item.id === id);
    if (bannerToEdit) {
      setBannerFormData(bannerToEdit); // Set the selected banner data in the context
      router.push(`/homeBanner/upload`); // Navigate to the upload route
    }
  };

  const handleDelete = (id) => {
    setBannerList(bannerList.filter((item) => item.id !== id));
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
            {bannerList.map((image) => (
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
