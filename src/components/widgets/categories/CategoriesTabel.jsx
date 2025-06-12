"use client";
import React, { useState, useEffect, useMemo } from "react";
import { IconButton } from "@mui/material";
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
import { getToken } from "@/libs/Token";

const CategoryList = () => {
  const { setCategoryForm, categories, setCategories, loading, setLoading } =
    useCategory();
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [selectedIds, setSelectedIds] = useState(new Set());
  const itemsPerPage = 5;
  const router = useRouter();
  const [token, setToken] = useState(null);

  useEffect(() => {
    const t = getToken();
    setToken(t);
  }, []);
  // Pagination change
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  // Filter + paginate categories
  const filteredCategories = useMemo(() => {
    if (!categories || categories.length === 0) return [];
    return categories.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [categories, search]);

  const currentItems = useMemo(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return filteredCategories.slice(indexOfFirstItem, indexOfLastItem);
  }, [filteredCategories, currentPage]);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const res = await callPublicApi("/category", "GET");
        if (res.status === "error" || res.status === 400) {
          toast.error(res.message || "Categories fetch failed");
        } else {
          setCategories(res.categories);
        }
      } catch (error) {
        toast.error(error?.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, [setCategories, setLoading]);

  // Delete category
  const handleDelete = async (id) => {
    setLoading(true);
    try {
      const res = await callPrivateApi(
        `/category/${id}`,
        "DELETE",
        undefined,
        token
      );
      if (res.status === "error" || res.status === 400) {
        toast.error(res.message || "Category delete failed");
      } else {
        toast.success(res.message || "Category deleted successfully");
        setCategories(categories.filter((item) => item._id !== id));
        setSelectedIds((prev) => {
          const newSet = new Set(prev);
          newSet.delete(id);
          return newSet;
        });
      }
    } catch (error) {
      toast.error(error?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // Edit category
  const handleEdit = (id) => {
    const cate = categories.find((category) => category._id === id);
    if (cate) {
      setCategoryForm({
        id,
        name: cate.name,
        img: cate.image,
        color: cate.color,
      });
      router.push("/category/uploadCategory");
    }
  };

  // Search input change
  const handleSearch = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  // Bulk delete
  const handleBulkDelete = async () => {
    if (selectedIds.size === 0) return;

    setLoading(true);
    try {
      const idsArray = Array.from(selectedIds);
      const res = await callPrivateApi(
        "/categories/delete-multiple",
        "POST",
        {
          ids: idsArray,
        },
        token
      );

      if (res.status === "error" || res.status === 400) {
        toast.error(res.message || "Bulk delete failed");
      } else {
        toast.success(res.message || "Categories deleted successfully");
        setCategories((prev) => prev.filter((p) => !selectedIds.has(p._id)));
        setSelectedIds(new Set());
      }
    } catch (error) {
      toast.error(error?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // Checkbox change
  const handleCheckboxChange = (id) => {
    setSelectedIds((prev) => {
      const newSelected = new Set(prev);
      if (newSelected.has(id)) {
        newSelected.delete(id);
      } else {
        newSelected.add(id);
      }
      return newSelected;
    });
  };

  // Select/Deselect all on current page
  const handleSelectAll = () => {
    const allSelected = currentItems.every((item) => selectedIds.has(item._id));
    if (allSelected) {
      // Deselect all current items
      setSelectedIds((prev) => {
        const newSelected = new Set(prev);
        currentItems.forEach((item) => newSelected.delete(item._id));
        return newSelected;
      });
    } else {
      // Select all current items
      setSelectedIds((prev) => {
        const newSelected = new Set(prev);
        currentItems.forEach((item) => newSelected.add(item._id));
        return newSelected;
      });
    }
  };

  return (
    <div className="p-6 bg-gray-50 w-[98%] mx-auto">
      <div className="bg-white shadow rounded">
        <div className="flex items-center justify-between my-3 mx-8">
          <div className="flex items-center gap-4">
            {selectedIds.size > 0 && (
              <button
                className="bg-red-600 text-white px-4 py-2 rounded"
                onClick={handleBulkDelete}
              >
                Delete ({selectedIds.size})
              </button>
            )}
            <input
              type="text"
              name="search"
              value={search}
              onChange={handleSearch}
              placeholder="Search Category"
              className="border p-2 w-[280px] rounded-md shadow-sm"
            />
          </div>
          <div>
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded"
              onClick={handleSelectAll}
              disabled={currentItems.length === 0}
            >
              {currentItems.length > 0 &&
              currentItems.every((item) => selectedIds.has(item._id))
                ? "Deselect All"
                : "Select All"}
            </button>
          </div>
        </div>
        <table className="min-w-full rounded-md border-collapse border border-gray-300">
          <thead className="bg-blue-600 text-white font-semibold uppercase">
            <tr>
              <th className="py-3 px-6 text-left text-sm ">Image</th>
              <th className="py-3 px-6 text-left text-sm ">Category</th>
              <th className="py-3 px-6 text-left text-sm ">Color</th>
              <th className="py-3 px-6 text-center text-sm ">Action</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <ProductTableSkeleton />
            ) : currentItems.length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  className="text-center py-6 text-gray-500 font-medium"
                >
                  {categories.length === 0
                    ? "No categories available."
                    : "No categories match your search."}
                </td>
              </tr>
            ) : (
              currentItems.map((category, index) => (
                <tr
                  key={category._id}
                  className={`${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:bg-gray-100`}
                >
                  <td className="py-3 px-6 flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={selectedIds.has(category._id)}
                      onChange={() => handleCheckboxChange(category._id)}
                      className="w-4 h-4 relative rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <Image
                      src={category.image}
                      alt={category.name}
                      className="rounded-md"
                      width={70}
                      height={40}
                    />
                  </td>
                  <td className="py-3 px-6">{category.name}</td>
                  <td className="py-3 px-6">
                    <span className="py-1 px-3 capitalize rounded-full text-sm">
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
        <div className=" flex items-center justify-end mt-4">
          <ProductPagination
            products={filteredCategories}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            filteredProducts={filteredCategories}
            handlePageChange={handlePageChange}
          />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default CategoryList;
