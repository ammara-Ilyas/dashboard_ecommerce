import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, CircularProgress } from "@mui/material";

const UserReviews = ({ userId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUserReviews = async () => {
    try {
      const response = await callPrivateApi(`/reviews/user/${userId}`);
      setReviews(response.data); // Adjust based on your API response
    } catch (error) {
      toast.error("Failed to fetch user reviews:" || error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchUserReviews();
    }
  }, [userId]);

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <Typography variant="h5" className="mb-4">
        User Reviews
      </Typography>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <CircularProgress />
        </div>
      ) : reviews.length === 0 ? (
        <Typography>No reviews found.</Typography>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {reviews.map((review) => (
            <Card key={review._id} className="shadow-md">
              <CardContent>
                <Typography variant="subtitle1" className="font-semibold">
                  {review.title}
                </Typography>
                <Typography variant="body2" className="text-gray-600">
                  {review.content}
                </Typography>
                <Typography
                  variant="caption"
                  className="block text-right text-gray-400 mt-2"
                >
                  {new Date(review.createdAt).toLocaleDateString()}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserReviews;
