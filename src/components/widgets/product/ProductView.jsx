"use client";
import React, { useState, useEffect, use } from "react";
import { Box, Typography, Chip, IconButton } from "@mui/material";
import { Category, Memory, Star, CalendarToday } from "@mui/icons-material";
import { clsx } from "clsx";
import { useProducts } from "@/contextApi/ProductContext";
const ProductView = ({ id }) => {
  console.log("id in view", id);

  const { products } = useProducts();
  const [product, setProduct] = useState({});
  useEffect(() => {
    setProduct(products.filter((item) => item.id == id));
  }, []);
  return (
    <div>
      {" "}
      <Box
        className={clsx(
          "bg-white dark:bg-gray-800 rounded-lg shadow-md p-6",
          "grid grid-cols-1 md:grid-cols-3 gap-4"
        )}
      >
        {/* Product Gallery */}
        <Box className="col-span-1">
          <div className="relative">
            <img
              src="https://via.placeholder.com/400x300"
              alt={product.name}
              className="rounded-lg object-cover w-full"
            />
            <Chip
              label="15%"
              color="primary"
              className="absolute top-2 left-2 text-white"
            />
          </div>
          {/* Thumbnail Gallery */}
          <Box className="mt-2 flex gap-2">
            <img
              src={product.img}
              alt="Thumbnail 1"
              className="rounded-lg w-16 h-16 object-cover border border-gray-300 cursor-pointer"
            />
            <img
              src={product.img}
              alt="Thumbnail 2"
              className="rounded-lg w-16 h-16 object-cover border border-gray-300 cursor-pointer"
            />
          </Box>
        </Box>

        {/* Product Details */}
        <Box className="col-span-2 flex flex-col">
          {/* Product Title */}
          <Typography
            variant="h5"
            className="font-semibold text-gray-800 dark:text-gray-100 mb-4"
          >
            {product.title}
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi
            reiciendis soluta illo vel ipsa. Modi?
          </Typography>

          {/* Product Specifications */}
          <Box className="space-y-3 text-gray-700 dark:text-gray-300">
            <Box className="flex items-center">
              <Category className="mr-2 text-blue-500" />
              <Typography variant="body2">
                Category: {product.category}
                Lorem ipsum dolor sit amet.
              </Typography>
            </Box>

            <Box className="flex items-center">
              <Memory className="mr-2 text-blue-500" />
              <Typography variant="body2">
                RAM:{" "}
                <span className="bg-gray-300 px-2 py-1 rounded">
                  {product.ram}lorem2
                </span>
              </Typography>
            </Box>

            <Box className="flex items-center">
              <Star className="mr-2 text-yellow-500" />
              <Typography variant="body2">Review: {product.rating}</Typography>
            </Box>

            <Box className="flex items-center">
              <CalendarToday className="mr-2 text-blue-500" />
              <Typography variant="body2">
                Published: {product.publish}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      <div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum unde esse
        vero facilis, magnam nihil incidunt eius ex quia nulla? Molestiae sit
        porro possimus quam.+
      </div>
    </div>
  );
};

export default ProductView;
