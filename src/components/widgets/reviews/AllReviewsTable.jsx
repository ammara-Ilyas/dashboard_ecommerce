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
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import Image from "next/image";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { callPublicApi, callPrivateApi } from "@/libs/callApis";
import ProductTableSkeleton from "@/libs/ProductSkeleton";
import AddReviewForm from "./AddReviewForm";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getToken } from "@/libs/Token";

const AllReviewsTable = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEdit, setIsEdit] = useState(false);
  const [isReviewsUpdate, setIsReviewsUpdate] = useState(false);
  const [editReview, setEditReview] = useState({});
  const [token, setToken] = useState(null);

  useEffect(() => {
    const t = getToken();
    setToken(t);
  }, []);
  const fetchAllReviews = async () => {
    try {
      const response = await callPublicApi("/reviews", "GET");
      // console.log("res ", response);

      setReviews(response.reviews);
    } catch (error) {
      toast.error("Error fetching reviews:" || error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (reviewId) => {
    setIsEdit(true);
    setEditReview(reviews.find((item) => item._id == reviewId));
  };

  const handleDelete = async (reviewId) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this review?"
    );
    if (!confirm) return;

    try {
      const res = await callPrivateApi(
        `/review/${reviewId}`,
        "DELETE",
        undefined,
        token
      );
      setReviews((prev) => prev.filter((review) => review._id !== reviewId));
      toast.success(res.message || "Review delete successfully");
    } catch (error) {
      toast.error("Error deleting review:", error);
    }
  };

  useEffect(() => {
    fetchAllReviews();
  }, [isReviewsUpdate]);

  return (
    <div className="p-6 mx-6">
      {isEdit ? (
        <div
          className=" absolute top-0 left-0 bg-black/70 w-screen flex justify-center items-center
         h-screen -mt-50"
        >
          <ClearIcon
            onClick={() => setIsEdit(false)}
            className="font-bold text-xl text-white absolute top-24 right-5"
          />
          <AddReviewForm
            review={editReview}
            setIsEdit={setIsEdit}
            setIsReviewsUpdate={setIsReviewsUpdate}
          />
        </div>
      ) : (
        <div>
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
                      <span className=" text-white font-bold">
                        Product Name
                      </span>
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
      )}
      <ToastContainer />
    </div>
  );
};

export default AllReviewsTable;
