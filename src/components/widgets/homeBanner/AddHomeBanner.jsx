import React, { useState } from "react";
import { Button } from "@mui/material";
import { CloudUpload } from "@mui/icons-material";

const MediaAndPublish = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const handlePublish = () => {
    if (selectedImage) {
      alert("Published with selected image!");
    } else {
      alert("No image selected.");
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center justify-center">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4">Media And Published</h2>

        {/* Image Upload Section */}
        <div className="border-dashed border-2 border-gray-300 rounded-lg p-4 mb-6 flex flex-col items-center justify-center">
          {selectedImage ? (
            <img
              src={selectedImage}
              alt="Uploaded"
              className="max-w-full h-auto rounded"
            />
          ) : (
            <div className="text-gray-400 text-center">
              <CloudUpload fontSize="large" />
              <p>image upload</p>
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="opacity-0 absolute w-full h-full cursor-pointer"
          />
        </div>

        {/* Publish Button */}
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handlePublish}
          className="bg-blue-600 text-white hover:bg-blue-700"
          startIcon={<CloudUpload />}
        >
          Publish and View
        </Button>
      </div>
    </div>
  );
};

export default MediaAndPublish;
