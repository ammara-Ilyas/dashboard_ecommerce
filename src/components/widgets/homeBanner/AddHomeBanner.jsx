"use client";
import React, { useEffect, useState } from "react";
import { Button, CircularProgress } from "@mui/material";
import { CloudUpload } from "@mui/icons-material";
import { useCategory } from "@/contextApi/CategoriesContext";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { callPrivateApi } from "@/libs/callApis";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Initialize toast notifications
// toast.configure();

const MediaAndPublish = () => {
  const { bannerFormData, setBannerList, bannerList, setBannerFormData } =
    useCategory();
  const router = useRouter();

  const [selectedImage, setSelectedImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (bannerFormData) {
      setSelectedImage(bannerFormData.url);
    }
  }, [bannerFormData]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Replace the previously uploaded image if editing
      if (selectedImage) {
        toast.info("Replacing the existing image.");
      }
      console.log("file", file);

      setSelectedImage(URL.createObjectURL(file));
    }
  };
  const handlePublish = () => {
    if (!selectedImage) {
      toast.error("No image selected.");
      return;
    }

    setIsUploading(true);

    setTimeout(() => {
      if (bannerFormData) {
        // Replace the existing banner image with the new one
        const updatedList = bannerList.map((item) =>
          item.id === bannerFormData.id ? { ...item, url: selectedImage } : item
        );
        setBannerList(updatedList);
        toast.success("Banner updated successfully!");
      } else {
        // Add new banner
        const newBanner = {
          id: Date.now(),
          url: selectedImage,
          alt: "Uploaded Image",
        };
        setBannerList([...bannerList, newBanner]);
        toast.success("Banner published successfully!");
      }

      setBannerFormData(null);
      setSelectedImage(null);
      setIsUploading(false);
      router.push("/homeBanner/banners");
    }, 2000); // Simulate upload delay
  };

  return (
    <div className="p-6 bg-gray-100 py-20 flex flex-col items-center justify-center">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4">Media And Publish</h2>

        {/* Image Upload Section */}
        <div className="border-dashed border-2 border-gray-300 rounded-lg p-4 mb-6 flex flex-col items-center justify-center relative">
          {selectedImage ? (
            <Image
              src={selectedImage}
              alt="Uploaded"
              width={300}
              height={100}
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

        {isUploading ? (
          <CircularProgress className="mb-4" />
        ) : (
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
        )}
      </div>
    </div>
  );
};

export default MediaAndPublish;
