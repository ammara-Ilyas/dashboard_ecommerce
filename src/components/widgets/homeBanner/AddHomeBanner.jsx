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
  const { setBannerList, bannerList } = useCategory();

  const router = useRouter();
  const [bannerForm, setBannerForm] = useState({
    name: "",
    image: "",
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (bannerForm) {
      setSelectedImage(bannerForm.url);
    }
  }, [bannerForm]);

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
  const handlePublish = async (e) => {
    e.preventDefault();
    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("name", bannerForm.name);

      if (!bannerForm.image) {
        formData.append("image", bannerForm.image);
      }

      const method = isEditMode ? "PUT" : "POST";
      const endpoint = isEditMode ? `/banner/${bannerId}` : "/banner";

      const res = await callPrivateApi(endpoint, method, formData);

      if (res.status === "error" || res.status === 400) {
        toast.error(res.message || "Action failed");
      } else {
        toast.success(
          res.message || (isEditMode ? "Banner updated" : "Banner created")
        );
        router.push("/your-target-route");
      }
    } catch (err) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-100 py-20 flex flex-col items-center justify-center">
      <form
        className="bg-white shadow-md rounded-lg p-6 w-full max-w-md"
        onSubmit={handlePublish}
      >
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
        <input
          type="text"
          placeholder="Enter banner name"
          value={bannerForm.name}
          onChange={(e) =>
            setBannerForm((prev) => ({ ...prev, name: e.target.value }))
          }
          className="w-full p-2 mb-4 border rounded"
        />
        {isUploading ? (
          <CircularProgress className="mb-4" />
        ) : (
          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            onClick={handlePublish}
            className="bg-blue-600 text-white hover:bg-blue-700"
            startIcon={<CloudUpload />}
          >
            Publish and View
          </Button>
        )}
      </form>
    </div>
  );
};

export default MediaAndPublish;
