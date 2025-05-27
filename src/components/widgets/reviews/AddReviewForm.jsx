"use client";
import React, { useState, useEffect } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import Rating from "@mui/material/Rating";
import { callPrivateApi } from "@/libs/callApis";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getToken } from "@/libs/Token";
const AddReviewForm = ({ review, setIsEdit, setIsReviewsUpdate }) => {
  const [comment, setComment] = useState(review.comment);
  const [rating, setRating] = useState(review.rating);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const t = getToken();
    setToken(t);
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      comment,
      rating,
    };

    try {
      const response = await callPrivateApi(
        `/review/${review._id}`,
        "PUT",
        data,
        token
      );

      if (response.status == 200) {
        toast.success(response.message || "Review update successfully");
        setComment("");
        setRating(0);
      }
    } catch (err) {
      toast.error(err.message || "Failed to submit review.");
    } finally {
      setLoading(false);
      setIsEdit(false);
      setIsReviewsUpdate((pre) => !pre);
    }
  };

  return (
    <div className="w-[35%] border-4  mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <Typography variant="h5" className="mb-4 font-semibold">
        Add Your Review
      </Typography>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <TextField
          label="Comment"
          multiline
          rows={4}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          variant="outlined"
          fullWidth
          required
        />

        <Box className="flex items-center space-x-2">
          <Typography className="font-semibold">Rating:</Typography>
          <Rating
            name="review-rating"
            value={rating}
            onChange={(e, newValue) => setRating(newValue)}
          />
        </Box>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit Review"}
        </Button>

        <ToastContainer />
      </form>
    </div>
  );
};

export default AddReviewForm;
