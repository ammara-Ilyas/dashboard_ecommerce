import React, { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import Rating from "@mui/material/Rating";
import callPrivateApi from "../utils/callPrivateApi"; // adjust path if needed

const AddReviewForm = ({ userId, productId }) => {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg("");
    setError("");

    const data = {
      userId,
      productId,
      comment,
      rating,
    };

    try {
      const response = await callPrivateApi("/api/review", "POST", data);
      setSuccessMsg("Review submitted successfully.");
      setComment("");
      setRating(0);
    } catch (err) {
      setError(err.message || "Failed to submit review.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow-md">
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
          <Typography>Rating:</Typography>
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

        {successMsg && (
          <Typography className="text-green-600">{successMsg}</Typography>
        )}
        {error && <Typography className="text-red-600">{error}</Typography>}
      </form>
    </div>
  );
};

export default AddReviewForm;
