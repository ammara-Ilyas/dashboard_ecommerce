"use client";
import React from "react";
import { Avatar, Rating } from "@mui/material";
import { format } from "date-fns";

const CustomReview = ({ name, date, text, rating, imageUrl }) => {
  return (
    <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 flex gap-4 items-start shadow-md">
      {/* User Avatar */}
      <Avatar
        src={imageUrl}
        alt={name}
        className="w-12 h-12 border-2 border-blue-500"
      />

      {/* Content */}
      <div className="flex-1">
        {/* Name and Date */}
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            {name}
          </h3>
          <div className="flex text-sm flex-col  text-gray-500 dark:text-gray-400  justify-between ">
            <span className="">{format(new Date(date), "yyyy-MM-dd")}</span>
            <span className="">{format(new Date(date), " hh:mm a")}</span>
          </div>
        </div>

        {/* Review Text */}
        <p className="mt-2 text-gray-700 dark:text-gray-300">{text}</p>

        {/* Star Rating */}
        <div className="mt-3">
          <Rating name="read-only" value={rating} readOnly />
        </div>
      </div>
    </div>
  );
};

export default CustomReview;
