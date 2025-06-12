"use client";
import React, { useEffect, useState, useMemo } from "react";
import { IconButton } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { useCategory } from "@/contextApi/CategoriesContext";
import ProductTableSkeleton from "@/libs/ProductSkeleton";
import { callPrivateApi, callPublicApi } from "@/libs/callApis";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProductPagination from "@/components/miniComponents/Pagination";
import { getToken } from "@/libs/Token";

const HomeBannerTabel = () => {
  const { setBannerForm } = useCategory();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [bannerList, setBannerList] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [token, setToken] = useState(null);

  useEffect(() => {
    const t = getToken();
    setToken(t);
  }, []);
  // Handle Pagination Page Change
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  // Filtered and Paginated Items memoized
  const currentItems = useMemo(() => {
    if (!bannerList || bannerList.length === 0) return [];
    // Filter by search on banner name (not product, since banner object has name)
    const filtered = bannerList.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return filtered.slice(indexOfFirstItem, indexOfLastItem);
  }, [bannerList, search, currentPage]);

  // Fetch banners on mount
  useEffect(() => {
    const fetchBanners = async () => {
      setLoading(true);
      try {
        const res = await callPublicApi("/banners", "GET");
        if (res.status === "error" || res.status === 400) {
          // toast.error(res.message || "Banners fetch failed");
        } else {
          // toast.success(res.message || "Banners fetched successfully");
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

  const handleEdit = (id) => {
    const bannerToEdit = bannerList.find((item) => item._id === id);
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
      const res = await callPrivateApi(
        `/banner/${id}`,
        "DELETE",
        undefined,
        token
      );
      if (res.status === "error" || res.status === 400) {
        toast.error(res.message || "Banner delete failed");
      } else {
        toast.success(res.message || "Banner deleted successfully");
        setBannerList((prev) => prev.filter((item) => item._id !== id));
        setSelectedIds((prev) => {
          const newSet = new Set(prev);
          newSet.delete(id);
          return newSet;
        });
      }
    } catch (error) {
      toast.error(error?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1); // Reset to first page when search changes
  };

  const handleBulkDelete = async () => {
    if (selectedIds.size === 0) return;

    setLoading(true);
    try {
      const idsArray = Array.from(selectedIds);
      const res = await callPrivateApi(
        "/bannerList/delete-multiple",
        "POST",
        {
          ids: idsArray,
        },
        token
      );

      if (res.status === "error" || res.status === 400) {
        toast.error(res.message || "Bulk delete failed");
      } else {
        toast.success(res.message || "Banners deleted successfully");
        setBannerList((prev) =>
          prev.filter((item) => !selectedIds.has(item._id))
        );
        setSelectedIds(new Set()); // Clear selections
      }
    } catch (error) {
      toast.error(error?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleCheckboxChange = (id) => {
    setSelectedIds((prev) => {
      const newSelected = new Set(prev);
      if (newSelected.has(id)) {
        newSelected.delete(id);
      } else {
        newSelected.add(id);
      }
      return newSelected;
    });
  };

  const handleSelectAll = () => {
    // Check if all currentItems are selected
    const allSelected = currentItems.every((item) => selectedIds.has(item._id));
    if (allSelected) {
      // Deselect all currentItems
      setSelectedIds((prev) => {
        const newSelected = new Set(prev);
        currentItems.forEach((item) => newSelected.delete(item._id));
        return newSelected;
      });
    } else {
      // Select all currentItems
      setSelectedIds((prev) => {
        const newSelected = new Set(prev);
        currentItems.forEach((item) => newSelected.add(item._id));
        return newSelected;
      });
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-6xl">
        <div className="flex items-center justify-between my-3 mx-8">
          <div className="flex items-center gap-4">
            {selectedIds.size > 0 && (
              <button
                className="bg-red-600 text-white px-4 py-2 rounded"
                onClick={handleBulkDelete}
              >
                Delete ({selectedIds.size})
              </button>
            )}
            <input
              type="text"
              name="search"
              value={search}
              onChange={handleSearch}
              placeholder="Search Banner Name"
              className="border p-2 w-[280px] rounded-md shadow-sm"
            />
          </div>
          <div>
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded"
              onClick={handleSelectAll}
            >
              {currentItems.length > 0 &&
              currentItems.every((item) => selectedIds.has(item._id))
                ? "Deselect All"
                : "Select All"}
            </button>
          </div>
        </div>
        <h2 className="text-lg font-semibold mb-4">Image and Action</h2>
        {loading ? (
          <ProductTableSkeleton />
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
              {currentItems.length === 0 ? (
                <tr>
                  <td colSpan={3} className="text-center py-4">
                    No banners found.
                  </td>
                </tr>
              ) : (
                currentItems.map((banner) => (
                  <tr className="border-b hover:bg-gray-100" key={banner._id}>
                    <td className="py-2 px-4 flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={selectedIds.has(banner._id)}
                        onChange={() => handleCheckboxChange(banner._id)}
                        className="w-4 h-4 p-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      {banner.name}
                    </td>
                    <td className="py-2 px-4">
                      <Image
                        src={banner.image}
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
                ))
              )}
            </tbody>
          </table>
        )}
        <div className="mt-4">
          <ProductPagination
            products={bannerList.filter((item) =>
              item.name.toLowerCase().includes(search.toLowerCase())
            )}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            filteredProducts={bannerList.filter((item) =>
              item.name.toLowerCase().includes(search.toLowerCase())
            )}
            handlePageChange={handlePageChange}
          />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default HomeBannerTabel;
