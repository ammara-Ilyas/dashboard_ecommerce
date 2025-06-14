"use client";

import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Paper,
  CircularProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { AiFillEye, AiFillEdit, AiFillDelete } from "react-icons/ai";

import { useCategory } from "@/contextApi/CategoriesContext";
import { useEffect, useState, useMemo } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { callPrivateApi, callPublicApi } from "@/libs/callApis";
import ProductPagination from "@/components/miniComponents/Pagination";
import ProductTableSkeleton from "@/libs/ProductSkeleton";
import { Category } from "@mui/icons-material";
import { getToken } from "@/libs/Token";
const SubCategoryTable = () => {
  // const [loading, setLoading] = useState(false);
  const {
    categories,
    setCategories,
    setSubCategories,
    subCategories,
    loading,
    setLoading,
    setSubCategoryForm,
    subCategoryForm,
  } = useCategory();
  const [token, setToken] = useState(null);

  useEffect(() => {
    const t = getToken();
    setToken(t);
    console.log("categories", categories);
  }, []);
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
  useEffect(() => {
    const fetchsubCategories = async () => {
      setLoading(true);
      try {
        const res = await callPublicApi("/category", "GET");

        if (res.status === "error" || res.status === 400) {
          // toast.error(res.message || "Categories fetch failed");
          res.message || "Categories fetch failed";
        } else {
          // toast.success(res.message || "Categories fetched successfully");
          setCategories(res.categories);
        }
      } catch (error) {
        // toast.error(error?.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    fetchsubCategories();
  }, [subCategories, setSubCategories]);

  // Handle Deletion of a Subcategory
  const handleEdit = (id, value) => {
    subCategoryForm({
      id: id,
      category: value?.category._id?.name,
      name: value?.name,
    });
  };

  const handleDelete = async (name, id) => {
    ///category name and sub category id
    setLoading(true);
    console.log("form in sub delete", name, id);
    try {
      const res = await callPrivateApi(
        `/subcategory/${id}/category/${name}`,
        "DELETE",
        undefined,
        token
      );
      console.log("res in Sub Category delete ", res);
      if (res.status == 200) {
        toast.success(res.message || "Sub Category deleted successfully");
      }
      setCategories((prevCategories) =>
        prevCategories.map((category) =>
          category.name === name
            ? {
                ...category,
                subCategory: category.subCategory.filter(
                  (sub) => sub._id !== id
                ),
              }
            : category
        )
      );
      console.log("categories after res", categories);
    } catch (error) {
      toast.error(error?.message || "Something went wrong");
    } finally {
      setLoading(false);
      // to call useEffect
      // setLoader(() => !loader);
    }
  };

  return (
    <div component={Paper} className="rounded-lg shadow-lg">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell className="!bg-blue-600 !text-white font-semibold">
              Category Image
            </TableCell>
            <TableCell className="!bg-blue-600 !text-white font-semibold">
              Category
            </TableCell>
            <TableCell className="!bg-blue-600 !text-white font-semibold">
              Sub Category
            </TableCell>
          </TableRow>
        </TableHead>

        {/* Table Body */}
        <TableBody>
          {loading ? (
            <ProductTableSkeleton />
          ) : (
            currentItems &&
            currentItems
              .filter(
                (category) =>
                  category.subCategory && category.subCategory.length > 0
              )
              .map((category) => (
                <TableRow key={category._id} className="even:bg-gray-100">
                  {/* Category Image */}
                  <TableCell>
                    <div className="flex items-center justify-center">
                      <Image
                        src={"/images/dummy.png"}
                        alt={`${category.name} image`}
                        width={50}
                        height={50}
                        className="rounded"
                      />
                    </div>
                  </TableCell>

                  {/* Category Name */}
                  <TableCell className="text-gray-800 font-semibold">
                    {category.name}
                  </TableCell>

                  {/* Subcategories */}
                  <TableCell>
                    <div className="flex flex-wrap gap-2">
                      {category.subCategory.map((item, i) => (
                        <Chip
                          key={i}
                          label={item.name}
                          color="primary"
                          className="!bg-blue-100 !text-black !font-medium"
                          onDelete={() => handleDelete(category.name, item._id)}
                          deleteIcon={
                            <IconButton
                              size="small"
                              className="text-sm border-2 font-normal border-red-500 text-black"
                            >
                              <CloseIcon fontSize="small" />
                            </IconButton>
                          }
                        />
                      ))}
                    </div>
                  </TableCell>
                </TableRow>
              ))
          )}
        </TableBody>
      </Table>
      <div>
        {" "}
        <ProductPagination
          products={subCategories}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          filteredProducts={subCategories}
          handlePageChange={handlePageChange}
        />
      </div>
      <ToastContainer />
    </div>
  );
};

export default SubCategoryTable;
