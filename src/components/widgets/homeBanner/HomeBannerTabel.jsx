"use client";
import React, { useEffect, useState } from "react";
import { IconButton } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { useCategory } from "@/contextApi/CategoriesContext";
import ProductTableSkeleton from "@/libs/ProductSkeleton";
import bg from "@/assets/banner_01.webp";
import { CircleLoader } from "react-spinners";
import { callPrivateApi, callPublicApi } from "@/libs/callApis";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const HomeBannerTabel = () => {
  const { setBannerForm } = useCategory();
  const router = useRouter();
  const [loader, setLoader] = useState(false);
  const [bannerList, setBannerList] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchBanners = async () => {
      setLoading(true);
      try {
        const res = await callPublicApi("/banners", "GET");
        console.log("res in banner list ", res);

        if (res.status === "error" || res.status === 400) {
          toast.error(res.message || "Banners fetch failed");
        } else {
          toast.success(res.message || "Banners fetched successfully");
          setBannerList(res.banners);
        }
      } catch (error) {
        toast.error(error?.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchBanners();
  }, []);

  console.log("banner", bannerList);

  const handleEdit = (id) => {
    const bannerToEdit = bannerList.find((item) => item._id === id);
    console.log("banner to edit", bannerToEdit);

    if (bannerToEdit) {
      setBannerForm({
        id: id,
        name: bannerToEdit.name,
        image: bannerToEdit.image,
      });
      router.push(`/homeBanner/upload`);
    }
  };

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      const res = await callPrivateApi(`/banner/${id}`, "DELETE");
      console.log("res in banner delete ", res);
      if (res.status === "error" || res.status === 400) {
        toast.error(res.message || "Banners delete failed");
      } else {
        toast.success(res.message || "Banners deleted successfully");
        setBannerList(bannerList.filter((item) => item._id !== id));
      }
    } catch (error) {
      toast.error(error?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
      <div className="bg-white shadow-md rounded-lg p-6 w-full ">
        <h2 className="text-lg font-semibold mb-4">Image and Action</h2>
        {loading ? (
          <>
            <ProductTableSkeleton />
          </>
        ) : (
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-blue-600">
                <th className="text-white font-bold py-2 px-4 text-left">
                  Title
                </th>
                <th className="text-white font-bold py-2 px-4 text-left">
                  Image
                </th>
                <th className="text-white font-bold py-2 px-4 text-left">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {bannerList.map((banner) => (
                <tr className="border-b hover:bg-gray-100" key={banner._id}>
                  <td className="py-2 px-4">{banner.name}</td>
                  <td className="py-2 px-4">
                    <Image
                      src={`${banner.image}`}
                      alt={banner.name}
                      className="h-24 rounded-lg object-cover"
                      height={100}
                      width={300}
                    />
                  </td>
                  <td className="py-2 px-4 flex items-center gap-2">
                    <IconButton
                      onClick={() => handleEdit(banner._id)}
                      className="text-green-500"
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDelete(banner._id)}
                      className="text-red-500"
                    >
                      <Delete />
                    </IconButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default HomeBannerTabel;
