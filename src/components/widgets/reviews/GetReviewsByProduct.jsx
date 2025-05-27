"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography } from "@mui/material";

const GetReviewByProduct = ({ userId, productId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getReviews = async () => {
      try {
        const res = await fetch(`/api/reviews/${productId}`);
        const data = await res.json();
        setReviews(data);
      } catch (error) {
        toast.error("Error fetching reviews:" || error);
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      getReviews();
    }
  }, [productId]);

  if (loading) {
    return <p className="text-center text-gray-500">Loading reviews...</p>;
  }

  return (
    <div className="grid gap-4 p-4">
      {reviews.length === 0 ? (
        <p className="text-center text-gray-500">No reviews yet.</p>
      ) : (
        reviews.map((review) => (
          <Card key={review._id} className="shadow-md">
            <CardContent>
              <Typography variant="h6" className="font-semibold">
                {review.user?.name || "Anonymous"}
              </Typography>
              <Typography variant="body2" className="text-sm text-gray-700">
                {review.comment}
              </Typography>
              <Typography variant="caption" className="text-xs text-gray-400">
                Rating: {review.rating} ⭐ |{" "}
                {new Date(review.createdAt).toLocaleDateString()}
              </Typography>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};

export default GetReviewByProduct;
