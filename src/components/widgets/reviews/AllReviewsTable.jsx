"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  IconButton,
  CircularProgress,
} from "@mui/material";
import Image from "next/image";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { callPublicApi } from "@/libs/callApis";
import ProductTableSkeleton from "@/libs/ProductSkeleton";
const AllReviewsTable = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAllReviews = async () => {
    try {
      const response = await callPublicApi("/reviews");
      console.log("res in reviews tabel", response);

      setReviews(response.reviews);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (reviewId) => {
    console.log("Edit review:", reviewId);
    // Optionally navigate to an edit form or open a modal
  };

  const handleDelete = async (reviewId) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this review?"
    );
    if (!confirm) return;

    try {
      await callPrivateApi.delete(`/reviews/${reviewId}`);
      setReviews((prev) => prev.filter((review) => review._id !== reviewId));
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  useEffect(() => {
    fetchAllReviews();
  }, []);

  return (
    <div className="p-6">
      <Typography variant="h5" className="mb-4">
        All Product Reviews
      </Typography>

      {loading ? (
        <div className="w-full">
          <ProductTableSkeleton />
        </div>
      ) : reviews.length === 0 ? (
        <Typography>No reviews found.</Typography>
      ) : (
        <TableContainer component={Paper} className="shadow-md">
          <Table>
            <TableHead className="bg-blue-600 text-white font-bold">
              <TableRow>
                <TableCell>
                  <span className=" text-white font-bold">Product Name</span>
                </TableCell>
                <TableCell>
                  <span className=" text-white font-bold">User Name</span>
                </TableCell>
                <TableCell>
                  <span className=" text-white font-bold">User Email</span>
                </TableCell>
                <TableCell>
                  <span className=" text-white font-bold">Rating</span>
                </TableCell>
                <TableCell>
                  <span className=" text-white font-bold">Comment</span>
                </TableCell>
                <TableCell>
                  <span className=" text-white font-bold">Actions</span>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reviews.map((review) => (
                <TableRow key={review._id}>
                  <TableCell>
                    <div className="flex gap-2 items-center">
                      <Image
                        src={review.product.images[0] || "/images/dummy.png"}
                        alt={review.product.product || "N/A"}
                        width={50}
                        height={50}
                        className="w-[50px]"
                      />
                      <div className="font-semibold">
                        {review.product?.product || "N/A"}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="font-semibold">
                    {review.user?.name || "N/A"}
                  </TableCell>
                  <TableCell>{review.user?.email || "N/A"}</TableCell>
                  <TableCell className="font-semibold">
                    {review.rating}
                  </TableCell>
                  <TableCell>{review.comment}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <IconButton
                        onClick={() => handleEdit(review._id)}
                        color="primary"
                        size="small"
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        onClick={() => handleDelete(review._id)}
                        color="error"
                        size="small"
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default AllReviewsTable;
