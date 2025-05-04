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
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { callPrivateApi, callPublicApi } from "@/libs/callApis";
import ProductTableSkeleton from "@/libs/ProductSkeleton";
import { Category } from "@mui/icons-material";
const SubCategory = () => {
  // const [loading, setLoading] = useState(false);
  const [loader, setLoader] = useState(false);
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

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await callPublicApi("/subcategory", "GET");
        console.log("res in sub category list ", res);

        if (res.status === "error" || res.status === 400) {
          // toast.error(res.message || "sub categories fetch failed");
          console.log(res.message);
        } else {
          // toast.success(res.message || "sub categories fetched successfully");
          console.log(res.message || "sub categories fetched successfully");
          setSubCategories(res.SubCategories);
        }
      } catch (error) {
        // toast.error(error?.message || "Something went wrong");
        console.log(error.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle Deletion of a Subcategory
  console.log("sub categories", subCategories);
  const handleEdit = (id, value) => {
    subCategoryForm({
      id: id,
      category: value?.category._id?.name,
      name: value?.name,
    });
  };

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      const res = await callPrivateApi(`/subcategory/${id}`, "DELETE");
      console.log("res in Sub Category delete ", res);
      if (res.status === "error" || res.status === 400) {
        toast.error(res.message || "Sub Category deleted failed");
      } else {
        toast.success(res.message || "Sub Category deleted successfully");
        setSubCategories(subCategories.filter((item) => item._id !== id));
      }
    } catch (error) {
      toast.error(error?.message || "Something went wrong");
    } finally {
      setLoading(false);
      // to call useEffect
      setLoader(() => !loader);
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
            subCategories &&
            subCategories.map((subCategory) => (
              <TableRow key={subCategory._id} className="even:bg-gray-100">
                {/* Category Image */}
                <TableCell>
                  <div className="flex items-center justify-center">
                    <Image
                      src={"/images/dummy.png"}
                      alt={`${subCategory.name} image`}
                      width={50}
                      height={50}
                      className="rounded"
                    />
                  </div>
                </TableCell>

                {/* subCategory Name */}
                <TableCell className="text-gray-800 font-medium">
                  {subCategory.name}
                </TableCell>

                {/* Subcategories */}
                <TableCell>
                  <div className="flex flex-wrap gap-2">
                    <Chip
                      label={subCategory.name}
                      color="primary"
                      className="!bg-blue-100 !text-blue-600 !font-semibold"
                      onDelete={() => handleDelete(subCategory._id)}
                      deleteIcon={
                        <IconButton size="small font-sm border-2 border-red-500 text-black">
                          <CloseIcon fontSize="small text-sm absolute top-0 right-0" />
                        </IconButton>
                      }
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      <ToastContainer />
    </div>
  );
};

export default SubCategory;
