"use client";
import React, { useState } from "react";
import ProductFilter from "./ProductFilter";
import Image from "next/image";
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

  // Handle Delete Button
  const handleDelete = (id) => {
    setProducts(products.filter((item) => item.id !== id));
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
            {products.map((row, index) => (
              <TableRow key={index} className="">
                <TableCell>
                  <div className="flex gap-3 items-center">
                    <Image
                      src={row.media}
                      alt={row.name}
                      width={50}
                      height={50}
                      className="w-[50px]"
                    />
                    <div>
                      <div className="font-semibold">{row.name}</div>
                      <div className="text-gray-500 text-sm dark:text-gray-400">
                        Lorem Ipsum is simple...
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{row.category}</TableCell>
                <TableCell>{row.subCategory}</TableCell>
                <TableCell>
                  <span className=" py-1  p-3 dark:bg-gray-800 bg-gray-500 text-white rounded-md text-xs">
                    {row.brand}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="line-through text-red-500">
                    Rs {row.oldPrice}
                  </div>
                  <div className="font-semibold text-green-500">
                    Rs {row.price}
                  </div>
                </TableCell>
                <TableCell className="text-yellow-400 text-[20px]">
                  {Array.from({ length: 5 })
                    .map((_, index) => {
                      if (index < Math.floor(row.rating)) {
                        return "★";
                      } else if (index < row.rating) {
                        return "☆";
                      }
                    })
                    .join("")}
                </TableCell>

                <TableCell>
                  <div className="flex space-x-2 text-[15px] ">
                    <IconButton
                      onClick={() => handlePreview(row.id)}
                      className="bg-purple-500 text-white hover:bg-purple-700 p-2 rounded"
                    >
                      <AiFillEye className="text-[15px]" />
                    </IconButton>
                    <IconButton
                      onClick={() => handleEdit(row.id, row)}
                      className="bg-green-500 text-white hover:bg-green-700 p-2 rounded"
                    >
                      <AiFillEdit className="text-[15px]" />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDelete(row.id)}
                      className="bg-red-500 text-white hover:bg-red-700 p-2 rounded"
                    >
                      <AiFillDelete className="text-[15px]" />
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
