"use client";
import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { callPrivateApi, callPublicApi } from "@/libs/callApis";
import { useProducts } from "@/contextApi/ProductContext";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import { AiFillEye, AiFillEdit, AiFillDelete } from "react-icons/ai";
import ProductListSkeleton from "@/libs/ProductSkeleton";
import ProductPagination from "./Pagination";
import { getToken } from "@/libs/Token";

const ProductTabel = () => {
  const { setFormData } = useProducts();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedIds, setSelectedIds] = useState(new Set());
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const [token, setToken] = useState(null);

  useEffect(() => {
    const t = getToken();
    setToken(t);
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await callPublicApi("/products", "GET");
        if (res.status === "error" || res.status === 400) {
          // toast.error(res.message || "Failed to fetch products");
        } else {
          // toast.success(res.message || "Products fetched successfully");
          setProducts(res.products);
        }
      } catch (error) {
        toast.error(error?.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((item) =>
      item.product?.toLowerCase().includes(search.toLowerCase())
    );
  }, [products, search]);

  const currentItems = useMemo(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
  }, [filteredProducts, currentPage]);

  const handleEdit = (id) => {
    const productToEdit = products.find((item) => item._id === id);
    if (productToEdit) {
      const updatedFormData = {
        id: productToEdit._id,
        ...productToEdit,
      };
      setFormData(updatedFormData);
      router.push("/edit-product"); // Change to your edit page route
    }
  };

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      const res = await callPrivateApi(
        `/product/${id}`,
        "DELETE",
        undefined,
        token
      );
      if (res.status === "error" || res.status === 400) {
        toast.error(res.message || "Failed to delete product");
      } else {
        toast.success(res.message || "Product deleted successfully");
        setProducts((prev) => prev.filter((p) => p._id !== id));
      }
    } catch (error) {
      toast.error(error?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handlePreview = (id) => {
    router.push(`/product/${id}`);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleCheckboxChange = (id) => {
    setSelectedIds((prev) => {
      const updated = new Set(prev);
      updated.has(id) ? updated.delete(id) : updated.add(id);
      return updated;
    });
  };

  const handleSelectAll = () => {
    const allSelected = currentItems.every((item) => selectedIds.has(item._id));
    const updated = new Set(selectedIds);

    currentItems.forEach((item) => {
      allSelected ? updated.delete(item._id) : updated.add(item._id);
    });

    setSelectedIds(updated);
  };

  const handleBulkDelete = async () => {
    if (selectedIds.size === 0) return;
    setLoading(true);
    try {
      const res = await callPrivateApi(
        "/products/delete-multiple",
        "POST",
        {
          ids: Array.from(selectedIds),
        },
        token
      );

      if (res.status === "error" || res.status === 400) {
        toast.error(res.message || "Bulk delete failed");
      } else {
        toast.success(res.message || "Products deleted successfully");
        setProducts((prev) => prev.filter((p) => !selectedIds.has(p._id)));
        setSelectedIds(new Set());
      }
    } catch (error) {
      toast.error(error?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 dark:bg-gray-900 dark:text-white bg-gray-100">
      <div className="flex items-center justify-between my-3 mx-8">
        <div className="flex items-center gap-4">
          {selectedIds.size > 1 && (
            <button
              className="bg-red-600 text-white px-4 py-2 rounded"
              onClick={handleBulkDelete}
            >
              Delete ({selectedIds.size})
            </button>
          )}
          <input
            type="text"
            value={search}
            onChange={handleSearch}
            placeholder="Search Product"
            className="border p-2 w-[280px] rounded-md shadow-sm"
          />
        </div>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={handleSelectAll}
        >
          {currentItems.every((item) => selectedIds.has(item._id))
            ? "Deselect All"
            : "Select All"}
        </button>
      </div>

      {loading ? (
        <ProductListSkeleton />
      ) : filteredProducts.length === 0 ? (
        <p className="text-2xl font-semibold">No products found</p>
      ) : (
        <TableContainer component={Paper} className="dark:bg-gray-800 bg-white">
          <Table>
            <TableHead>
              <TableRow className="dark:bg-blue-900 bg-blue-500">
                {[
                  "PRODUCT",
                  "CATEGORY",
                  "SUB CATEGORY",
                  "BRAND",
                  "PRICE",
                  "RATING",
                  "ACTION",
                ].map((heading) => (
                  <TableCell
                    key={heading}
                    className="dark:text-white text-white"
                  >
                    {heading}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {currentItems.map((product) => (
                <TableRow key={product._id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={selectedIds.has(product._id)}
                        onChange={() => handleCheckboxChange(product._id)}
                        className="w-4 h-4"
                      />
                      <Image
                        src={product.images[0]}
                        alt={product.product}
                        width={50}
                        height={50}
                        className="rounded"
                      />
                      <div>
                        <div className="font-semibold">{product.product}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {product.description}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{product.category?.name || "—"}</TableCell>
                  <TableCell>{product.subCategory || "—"}</TableCell>
                  <TableCell>
                    <span className="bg-gray-600 text-white py-1 px-2 rounded text-xs">
                      {product.brand}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="line-through text-red-500">
                      Rs {product.oldPrice}
                    </div>
                    <div className="font-bold text-green-500">
                      Rs {product.newPrice}
                    </div>
                  </TableCell>
                  <TableCell className="text-yellow-400 text-xl">
                    {Array.from({ length: 5 })
                      .map((_, i) =>
                        i < Math.floor(product.rating) ? "★" : "☆"
                      )
                      .join("")}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <IconButton
                        onClick={() => handlePreview(product._id)}
                        className="bg-purple-500 text-white hover:bg-purple-700"
                      >
                        <AiFillEye />
                      </IconButton>
                      <IconButton
                        onClick={() => handleEdit(product._id)}
                        className="bg-green-500 text-white hover:bg-green-700"
                      >
                        <AiFillEdit />
                      </IconButton>
                      <IconButton
                        onClick={() => handleDelete(product._id)}
                        className="bg-red-500 text-white hover:bg-red-700"
                      >
                        <AiFillDelete />
                      </IconButton>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="flex justify-between items-center px-8 py-4">
            <p>
              {currentItems.length} of {filteredProducts.length} products
            </p>
            <ProductPagination
              products={filteredProducts}
              itemsPerPage={itemsPerPage}
              currentPage={currentPage}
              handlePageChange={(e, value) => setCurrentPage(value)}
            />
          </div>
        </TableContainer>
      )}
      <ToastContainer />
    </div>
  );
};

export default ProductTabel;
