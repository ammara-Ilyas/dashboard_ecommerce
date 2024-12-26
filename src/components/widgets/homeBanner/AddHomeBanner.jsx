"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { CloudUpload } from "@mui/icons-material";
import { useCategory } from "@/contextApi/CategoriesContext";
import { useRouter } from "next/navigation";
import Image from "next/image";
const MediaAndPublish = () => {
  const { bannerFormData, setBannerList, bannerList, setBannerFormData } =
    useCategory();
  const router = useRouter();

  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (bannerFormData) {
      setSelectedImage(bannerFormData.src); // Preload the image if editing
    }
  }, [bannerFormData]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const handlePublish = () => {
    if (selectedImage) {
      if (bannerFormData) {
        // Update existing banner
        const updatedList = bannerList.map((item) =>
          item.id === bannerFormData.id ? { ...item, src: selectedImage } : item
        );
        setBannerList(updatedList);
      } else {
        // Add new banner
        const newBanner = {
          id: Date.now(),
          src: selectedImage,
          alt: "Uploaded Image",
        };
        setBannerList([...bannerList, newBanner]);
      }
      // Clear the form data and navigate back
      setBannerFormData(null);
      alert("Banner published successfully!");
      router.push("/homeBanner/banners");
    } else {
      alert("No image selected.");
    }
  };

  return (
    <div className="p-6  bg-gray-100 py-20 flex flex-col items-center justify-center">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4">Media And Published</h2>

        {/* Image Upload Section */}
        <div className="border-dashed border-2 border-gray-300 rounded-lg p-4 mb-6 flex flex-col items-center justify-center relative">
          {selectedImage ? (
            <Image
              src={selectedImage}
              alt="Uploaded"
              width={full}
              height={full}
              className="max-w-full h-auto rounded"
            />
          ) : (
            <div className="text-gray-400 text-center">
              <CloudUpload fontSize="large" />
              <p>Image upload</p>
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="opacity-0 absolute w-full h-full cursor-pointer"
          />
        </div>
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
