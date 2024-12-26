"use client";
import React from "react";
import { Button, IconButton } from "@mui/material";
import Image from "next/image";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useCategory } from "@/contextApi/CategoriesContext";
import { useRouter } from "next/navigation";
const CategoryList = () => {
  const { categories, setCategories, setCategoryForm } = useCategory();
  console.log("categories", categories);

  const router = useRouter();
  // Handle Delete Functionality
  const handleDelete = (id) => {
    setCategories(categories.filter((category) => category.id !== id));
  };

  // Handle Edit Functionality
  const handleEdit = (id) => {
    const cate = categories.find((category) => category.id == id);
    console.log("cate", cate);
    console.log("id", id);

    if (cate) {
      setCategoryForm({
        id: cate.id, // Include the ID for updating
        cate: cate.cate,
        img: cate.img,
        color: cate.color,
      });
      router.push("/category/uploadCategory");
    }
  };

  return (
    <div className="p-6 bg-gray-50 w-[98%] mx-auto">
      <div className="bg-white shadow rounded">
        <table className="min-w-full rounded-md border-collapse  border border-gray-300">
          <thead className="dark:bg-blue-900 bg-blue-600 text-white font-semibold uppercase">
            <tr className="">
              <th className="py-3 px-6 text-left text-sm ">Image</th>
              <th className="py-3 px-6 text-left text-sm ">Category</th>
              <th className="py-3 px-6 text-left text-sm ">Color</th>
              <th className="py-3 px-6 text-center text-sm ">Action</th>
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
                  <Image
                    src={category.img}
                    alt={category.cate}
                    className="w-10 h-10 rounded-full"
                    width={10}
                    height={10}
                  />
                </td>
                <td className="py-3 px-6">{category.cate}</td>
                <td className="py-3 px-6">
                  <span
                    className="py-1 px-3 capitalize rounded-full text-sm"
                    // style={{ backgroundColor: category.color }}
                  >
                    {category.color}
                  </span>
                </td>
                <td className="py-3 px-6 text-center text-sm">
                  <IconButton
                    aria-label="edit"
                    className="bg-green-500 text-white hover:bg-green-700 text-sm p-1 rounded"
                    onClick={() => handleEdit(category.id)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    aria-label="delete"
                    className="bg-red-500 text-white hover:bg-red-700 p-1 ml-2 text-sm rounded"
                    onClick={() => handleDelete(category.id)}
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
