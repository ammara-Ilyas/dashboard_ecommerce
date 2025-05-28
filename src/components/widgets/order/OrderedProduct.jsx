"use client";
import React from "react";
import { CiSquarePlus, CiSquareMinus } from "react-icons/ci";
import Image from "next/image";
import Link from "next/link";
import { CircularProgress } from "@mui/material";

const OrderedProducts = ({ products }) => {
  if (!products) {
    return (
      <div className="w-full flex justify-center py-20">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="mb-16 w-[95%] md:w-3/4 mx-auto mt-8 bg-base-100 shadow-xl p-6 md:p-12 transition overflow-hidden">
      {products.length === 0 ? (
        <div className="text-gray-600 min-h-20 flex flex-col items-center justify-center text-2xl font-bold gap-6">
          <h2>Your cart is empty.</h2>
        </div>
      ) : (
        <div className="w-full">
          <h1 className="text-3xl font-bold mb-6 text-center">Your Cart</h1>

          <div className="h-[350px] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-500 scrollbar-track-white scrollbar-thumb-rounded-full scrollbar-track-rounded-full pr-2">
            {products.map((product, index) => (
              <div
                key={index}
                className="flex flex-col md:flex-row items-center justify-between border-b border-gray-300 py-4"
              >
                <div className="flex items-center space-x-4">
                  <Image
                    src={product?.images[0]}
                    alt={product?.product}
                    width={64}
                    height={64}
                    className="h-28 w-28 md:h-16 md:w-16 object-cover rounded"
                  />
                  <div>
                    <h2 className="text-lg font-bold">{product?.product}</h2>
                    <p className="text-gray-600 font-semibold">
                      Price: ${product?.newPrice}
                    </p>
                  </div>
                </div>
                <div>
                  <span className="text-xl font-semibold">
                    quantity {product?.quantity}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderedProducts;
