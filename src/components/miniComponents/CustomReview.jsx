"use client";
import React from "react";
import { Avatar, Rating } from "@mui/material";
import { format } from "date-fns";

const CustomReview = ({ reviews = [] }) => {
  return (
    <div className="space-y-4">
      {reviews.map((review, i) => (
        <div
          key={i}
          className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 flex gap-4 items-start shadow-md"
        >
          {/* User Avatar */}
          <Avatar
            src={review.imageUrl}
            alt={review.name}
            className="w-12 h-12 "
          />

          {/* Content */}
          <div className="flex-1">
            {/* Name and Date */}
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                {review.name}
              </h3>
              <div className="flex text-sm flex-col text-gray-500 dark:text-gray-400 justify-between">
                <span>
                  {review.date
                    ? format(new Date(review.date), "yyyy-MM-dd")
                    : "Invalid date"}
                </span>
                {/* Add time formatting if needed */}
              </div>
            </div>

            {/* Review Text */}
            <p className="mt-2 text-gray-700 dark:text-gray-300">
              {review.text}
            </p>

            {/* Star Rating */}
            <div className="mt-3">
              <Rating name="read-only" value={review.rating} readOnly />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CustomReview;
