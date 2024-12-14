"use client";
import React, { useState } from "react";
import ProductFilter from "./ProductFilter";
import { useRouter } from "next/navigation";
// import ProductTable from "@/components/ProductTable";
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
} from "@mui/material";
import { AiFillEye, AiFillEdit, AiFillDelete } from "react-icons/ai";
import { set } from "date-fns";

const ProductTabel = () => {
  const { products, setProducts, setFormData, FormData } = useProducts();
  const router = useRouter();
  const handleEdit = (id) => {
    console.log("form in edit", FormData);
    let editProduct = products.find((item) => item.id !== id);
    if (editProduct) {
      setFormData(editProduct);
      router.push(`/product/upload`);
    }
  };
  const handlePreview = (id) => {
    console.log(("id", id));
    router.push(`/product/${id}`);
  };

  // Handle Delete Button
  const handleDelete = (id) => {
    setProducts(products.filter((item) => item.id !== id));
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
            {products.map((row, index) => (
              <TableRow
                key={index}
                className="dark:hover:bg-gray-700 hover:bg-gray-200"
              >
                <TableCell>
                  <div>
                    <div>{row.product}</div>
                    <div className="text-gray-500 text-sm dark:text-gray-400">
                      Lorem Ipsum is simple...
                    </div>
                  </div>
                </TableCell>
                <TableCell>{row.category}</TableCell>
                <TableCell>{row.subCategory}</TableCell>
                <TableCell>
                  <span className="px-2 py-1 bg-gray-200 dark:bg-gray-600 rounded-full text-xs">
                    {row.brand}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="line-through text-red-500">
                    Rs {row.priceOld}
                  </div>
                  <div className="font-semibold text-green-500">
                    Rs {row.priceNew}
                  </div>
                </TableCell>
                <TableCell>
                  {"★".repeat(row.rating)}
                  {"☆".repeat(5 - row.rating)}
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2 text- border-2 border-yellow-300">
                    <IconButton
                      onClick={() => handlePreview(row.id)}
                      className="bg-purple-500 text-white hover:bg-purple-700 p-2 rounded"
                    >
                      <AiFillEye className="text-lg" />
                    </IconButton>
                    <IconButton
                      onClick={() => handleEdit(row.id, row)}
                      className="bg-green-500 text-white hover:bg-green-700 p-2 rounded"
                    >
                      <AiFillEdit className="text-lg" />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDelete(row.id)}
                      className="bg-red-500 text-white hover:bg-red-700 p-2 rounded"
                    >
                      <AiFillDelete className="text-lg" />
                    </IconButton>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ProductTabel;
