"use client";
import React, { useState, useEffect } from "react";
import { Box, Typography, Chip } from "@mui/material";
import { format } from "date-fns";
import {
  FaTags,
  FaBoxOpen,
  FaMemory,
  FaStar,
  FaCalendarAlt,
} from "react-icons/fa";
import { useProducts } from "@/contextApi/ProductContext";
import Image from "next/image";
import CustomReview from "@/components/miniComponents/CustomReview";
const ProductView = ({ product }) => {
  const [formattedDate, setFormattedDate] = useState("");

  useEffect(() => {
    if (product?.createdAt) {
      const date = format(new Date(product.createdAt), "yyyy-MM-dd");
      setFormattedDate(date);
    }
  }, [product?.createdAt]);

  return (
    <div
      className="bg-white px-4
  "
    >
      <Box
        className={
          "bg-white dark:bg-gray-800 rounded-lg  p-6 grid grid-cols-1 md:grid-cols-3 gap-4 "
        }
      >
        {/* Product Gallery */}
        <Box
          className="col-span-1 space-y-3 
        "
        >
          <span className="text-gray-600 text-sm mb-8 italic ">
            Product Gallery
          </span>
          {product?.images && (
            <>
              <div className="relative">
                <Image
                  src={product?.images[0]}
                  alt={product.product}
                  width={50}
                  height={50}
                  className="rounded-lg object-cover w-full"
                />
                <Chip
                  label="15%"
                  color="primary"
                  className="absolute top-2 left-2 text-white"
                />
              </div>
              <Box className="mt-2 flex gap-2 relative  w-[80%]">
                <Image
                  src={product?.images[1]}
                  alt="Thumbnail 1"
                  fill
                  className="rounded-lg w-16 h-16 object-cover border border-gray-300 cursor-pointer"
                />
                <Image
                  src={product?.images[1]}
                  alt="Thumbnail 2"
                  fill
                  className="rounded-lg w-16 h-16 object-cover border border-gray-300 cursor-pointer"
                />
              </Box>
            </>
          )}
        </Box>

        {/* Product Details */}
        <Box className="col-span-2 flex flex-col">
          <span className="text-gray-600 text-sm mb-2 italic">
            Product Details
          </span>
          {/* Product Title */}
          <Typography
            variant="h5"
            className="font-semibold text-gray-800 dark:text-gray-100 capitalize
             mb-4"
          >
            {product?.product}
          </Typography>

          {/* Product Specifications */}
          <div className="space-y-2">
            {/* Brand */}
            <div className="flex items-center text-gray-700 dark:text-gray-400">
              <FaTags className="mr-3 text-lg text-gray-700" />
              <span className="font-medium w-28">Brand</span>
              <span>
                {" "}
                <span
                  className="mr-3 text-[18px]
                "
                ></span>
                {product?.brand}
              </span>
            </div>

            {/* Category */}
            <div className="flex items-center text-gray-700 dark:text-gray-400">
              <FaBoxOpen className="mr-3 text-lg text-gray-700" />
              <span className="font-medium w-28">Category</span>
              <span>
                {" "}
                <span
                  className="mr-3 text-[18px]
                "
                >
                  :
                </span>
                {product?.category?.name}
              </span>
            </div>

            {/* RAM */}
            <div className="flex items-center text-gray-700 dark:text-gray-400">
              <FaMemory className="mr-3 text-lg text-gray-700" />
              <span className="font-medium w-28">RAM</span>
              <span>
                <span
                  className="mr-3 text-[18px]
                "
                >
                  :
                </span>
                {product?.ram?.ram}
              </span>
            </div>
            <div className="flex items-center text-gray-700 dark:text-gray-400">
              <FaMemory className="mr-3 text-lg text-gray-700" />
              <span className="font-medium w-28">Weight</span>
              <span>
                <span
                  className="mr-3 text-[18px]
                "
                >
                  :
                </span>
                {product?.weight?.weight}
              </span>
            </div>
            <div className="flex items-center text-gray-700 dark:text-gray-400">
              <FaMemory className="mr-3 text-lg text-gray-700" />
              <span className="font-medium w-28">Size</span>
              <span>
                <span
                  className="mr-3 text-[18px]
                "
                >
                  :
                </span>
                {product?.size?.size}
              </span>
            </div>

            {/* Review */}
            <div className="flex items-center text-gray-700 dark:text-gray-400">
              <FaStar className="mr-3 text-lg text-gray-700" />
              <span className="font-medium w-28">Review</span>
              <span>
                {" "}
                <span
                  className="mr-3 text-[18px]
                "
                >
                  :
                </span>
                {product?.review}(4) Review
              </span>
            </div>

            {/* Published */}
            <div className="flex items-center text-gray-700 dark:text-gray-400">
              <FaCalendarAlt className="mr-3 text-lg text-gray-700" />
              <span className="font-medium w-28">Published:</span>
              <span>
                <span
                  className="mr-3 text-[18px]
                "
                >
                  :
                </span>
                {formattedDate}
              </span>
            </div>
          </div>
        </Box>
      </Box>
      <div
        className="mt-1 mb-8
       px-4"
      >
        <h2 className="text-xl text-black py-2">Product Description</h2>
        <p className=" text-gray-800  ">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book.
        </p>
      </div>
      <div className="my-6">
        <h2 className="text-xl text-black py-2 px-4    ">Custom Reviews</h2>
        <CustomReview reviews={product?.reviews} />
      </div>
    </div>
  );
};

export default ProductView;
