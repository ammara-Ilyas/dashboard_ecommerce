"use client";
import React, { useState, useEffect, useMemo } from "react";
import ProductFilter from "./ProductFilter";
import Image from "next/image";
import { useRouter } from "next/navigation";
import ProductListSkeleton from "@/libs/ProductSkeleton";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { callPrivateApi, callPublicApi } from "@/libs/callApis";
import { useProducts } from "@/contextApi/ProductContext";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  CircularProgress,
  Pagination,
} from "@mui/material";
import { AiFillEye, AiFillEdit, AiFillDelete } from "react-icons/ai";
import { set } from "date-fns";
import ProductPagination from "./Pagination";

const ProductTabel = () => {
  const { setFormData, formData } = useProducts();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loader, setLoader] = useState(false);

  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  // Handle Pagination
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  // Calculate Paginated Items
  const currentItems = useMemo(() => {
    if (!products || products.length === 0) return [];
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return products.slice(indexOfFirstItem, indexOfLastItem);
  }, [products, currentPage]);
  console.log("current items", currentItems);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await callPublicApi("/products", "GET");
        console.log("res in product list ", res);

        if (res.status === "error" || res.status === 400) {
          toast.error(res.message || "products fetch failed");
        } else {
          toast.success(res.message || "products fetched successfully");
          setProducts(res.products);
        }
      } catch (error) {
        toast.error(error?.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleEdit = (id, product) => {
    console.log("form in edit", formData, " and product ", product);
    let editProduct = products.find((item) => item.id !== id);
    console.log("edit product".editProduct);
    if (editProduct) {
      let updatedFormData = {};

      for (const [key, value] of Object.entries(editProduct)) {
        console.log(key, ": ", value);
        if (key == "id") {
          updatedFormData["id"] = id; // ✅ convert _id → id
        } else {
          updatedFormData[key] = value;
        }
      }
      router.push("");
    }
  };

  // Handle Delete Button
  const handleDelete = async (id) => {
    setLoading(true);
    try {
      const res = await callPrivateApi(`product/${id}`, "DELETE");
      console.log("res in product delete ", res);
      if (res.status === "error" || res.status === 400) {
        toast.error(res.message || "product deleted failed");
      } else {
        toast.success(res.message || "product deleted successfully");
      }
    } catch (error) {
      toast.error(error?.message || "Something went wrong");
    } finally {
      setLoading(false);
      // to call useEffect
      setLoader(() => !loader);
    }
  };

  const handlePreview = (id) => {
    console.log(("id", id));
    router.push(`/product/${id}`);
  };
  return (
    <div className="p-4 dark:bg-gray-900 dark:text-white bg-gray-100">
      <TableContainer component={Paper} className="dark:bg-gray-800 bg-white">
        <Table>
          <TableHead>
            <TableRow className="dark:bg-blue-900 bg-blue-500">
              <TableCell className="dark:text-gray-200 text-white">
                PRODUCT
              </TableCell>
              <TableCell className="dark:text-gray-200 text-white">
                CATEGORY
              </TableCell>
              <TableCell className="dark:text-gray-200 text-white">
                SUB CATEGORY
              </TableCell>
              <TableCell className="dark:text-gray-200 text-white">
                BRAND
              </TableCell>
              <TableCell className="dark:text-gray-200 text-white">
                PRICE
              </TableCell>
              <TableCell className="dark:text-gray-200 text-white">
                RATING
              </TableCell>
              <TableCell className="dark:text-gray-200 text-white">
                ACTION
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <ProductListSkeleton />
            ) : (
              <>
                {currentItems &&
                  currentItems.map((product, index) => (
                    <TableRow key={product._id} className="">
                      <TableCell>
                        <div className="flex gap-3 items-center">
                          <Image
                            src={product.images[0]}
                            alt={product.product}
                            width={50}
                            height={50}
                            className="w-[50px]"
                          />
                          <div>
                            <div className="font-semibold">
                              {product.product}
                            </div>
                            <div className="text-gray-500 text-sm dark:text-gray-400">
                              {product.description}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{product.category?.name}</TableCell>
                      <TableCell>{product.subCategory?.name}</TableCell>
                      <TableCell>
                        <span className=" py-1  p-3 dark:bg-gray-800 bg-gray-500 text-white rounded-md text-xs">
                          {product.brand}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="line-through text-red-500">
                          Rs {product.oldPrice}
                        </div>
                        <div className="font-semibold text-green-500">
                          Rs {product.newPrice}
                        </div>
                      </TableCell>
                      <TableCell className="text-yellow-400 text-[20px]">
                        {Array.from({ length: 5 })
                          .map((_, index) => {
                            if (index < Math.floor(product.rating)) {
                              return "★";
                            } else if (index < product.rating) {
                              return "☆";
                            }
                          })
                          .join("")}
                      </TableCell>

                      <TableCell>
                        <div className="flex space-x-2 text-[15px] ">
                          <IconButton
                            onClick={() => handlePreview(product._id, product)}
                            className="bg-purple-500 text-white hover:bg-purple-700 p-2 rounded"
                          >
                            <AiFillEye className="text-[15px]" />
                          </IconButton>
                          <IconButton
                            onClick={() => handleEdit(product._id)}
                            className="bg-green-500 text-white hover:bg-green-700 p-2 rounded"
                          >
                            <AiFillEdit className="text-[15px]" />
                          </IconButton>
                          <IconButton
                            onClick={() => handleDelete(product._id)}
                            className="bg-red-500 text-white hover:bg-red-700 p-2 rounded"
                          >
                            <AiFillDelete className="text-[15px]" />
                          </IconButton>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
              </>
            )}
          </TableBody>
        </Table>
        <div className="border-2 flex items-center justify-end">
          {" "}
          <ProductPagination
            products={products}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            filteredProducts={products}
            handlePageChange={handlePageChange}
          />
        </div>
      </TableContainer>
      <ToastContainer />
    </div>
  );
};

export default ProductTabel;
