"use client";
import React, { useState, useEffect, useMemo } from "react";
import { Button, CircularProgress, IconButton } from "@mui/material";
import Image from "next/image";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useCategory } from "@/contextApi/CategoriesContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { callPrivateApi, callPublicApi } from "@/libs/callApis";
import { useRouter } from "next/navigation";
import ProductTableSkeleton from "@/libs/ProductSkeleton";
import ProductPagination from "@/components/miniComponents/Pagination";
const CategoryList = () => {
  const { setCategoryForm, categories, setCategories, loading, setLoading } =
    useCategory();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  // Handle Pagination
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  // Calculate Paginated Items
  const currentItems = useMemo(() => {
    if (!categories || categories.length === 0) return [];
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return categories.slice(indexOfFirstItem, indexOfLastItem);
  }, [categories, currentPage]);
  console.log("current items", currentItems);
  const router = useRouter();
  // Handle fetch all categories
  useEffect(() => {
    const fetchBanners = async () => {
      setLoading(true);
      try {
        const res = await callPublicApi("/category", "GET");
        console.log("res in Categorie list ", res);

        if (res.status === "error" || res.status === 400) {
          // toast.error(res.message || "Categories fetch failed");
          console.log();
          res.message || "Categories fetch failed";
        } else {
          // toast.success(res.message || "Categories fetched successfully");
          setCategories(res.categories);
        }
      } catch (error) {
        // toast.error(error?.message || "Something went wrong");
        console.log(error?.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    fetchBanners();
  }, []);

  useEffect(() => {
    console.log("categories in tabel ", categories);
  }, [categories]);
  // Handle Delete Functionality
  const handleDelete = async (id) => {
    setLoading(true);

    try {
      const res = await callPrivateApi(`/category/${id}`, "DELETE");
      console.log("res in category delete ", res);
      if (res.status === "error" || res.status === 400) {
        toast.error(res.message || "categorys delete failed");
      } else {
        toast.success(res.message || "categorys deleted successfully");
        setCategories(categories.filter((item) => item._id !== id));
      }
    } catch (error) {
      toast.error(error?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  // Handle Edit Functionality
  const handleEdit = (id) => {
    const cate = categories.find((category) => category._id == id);
    console.log("cate", cate);
    console.log("id", id);
    if (cate) {
      setCategoryForm({
        id: id,
        name: cate.name,
        img: cate.image,
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
            {loading ? (
              <ProductTableSkeleton />
            ) : (
              currentItems &&
              currentItems.map((category, index) => (
                <tr
                  key={category._id}
                  className={`${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:bg-gray-100`}
                >
                  <td className="py-3 px-6">
                    {/* {console.log("category", category)} */}
                    <Image
                      src={"/images/dummy.png"}
                      alt={category.name}
                      className="w-10 h-10 rounded-full"
                      width={10}
                      height={10}
                    />
                  </td>
                  <td className="py-3 px-6">{category.name}</td>
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
                      onClick={() => handleEdit(category._id)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      className="bg-red-500 text-white hover:bg-red-700 p-1 ml-2 text-sm rounded"
                      onClick={() => handleDelete(category._id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <div className="border-2 border-emerald-600 flex items-center justify-end">
          {" "}
          <ProductPagination
            products={categories}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            filteredProducts={categories}
            handlePageChange={handlePageChange}
          />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default CategoryList;
