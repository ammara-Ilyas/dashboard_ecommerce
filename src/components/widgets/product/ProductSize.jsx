"use client";
import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  InputLabel,
  CircularProgress,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { useCategory } from "@/contextApi/CategoriesContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { callPrivateApi, callPublicApi } from "@/libs/callApis";
import ProductPagination from "@/components/miniComponents/Pagination";
import { getToken } from "@/libs/Token";

const ProductSize = () => {
  const { sizeList, setSizeList } = useCategory();
  const [size, setSize] = useState("");
  const [editId, setEditId] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loader, setLoader] = useState(false);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState(new Set());
  const itemsPerPage = 5;
  const messagesEndRef = useRef(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const t = getToken();
    setToken(t);
  }, []);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [editId]);

  useEffect(() => {
    const fetchSizes = async () => {
      setLoading(true);
      try {
        const res = await callPublicApi("/size", "GET");
        if (res.status === "error" || res.status === 400) {
          toast.error(res.message || "Failed to fetch sizes");
        } else {
          // toast.success(res.message || "Sizes fetched successfully");
          setSizeList(res.sizes || []);
        }
      } catch (error) {
        toast.error(error?.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchSizes();
  }, [setSizeList]);

  const currentItems = useMemo(() => {
    const filtered = sizeList.filter((item) =>
      item.size?.toLowerCase().includes(search.toLowerCase())
    );
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return filtered.slice(indexOfFirstItem, indexOfLastItem);
  }, [sizeList, search, currentPage]);

  const handleAddOrEditSize = async () => {
    if (size.trim() === "") {
      toast.error("Please enter size");
      return;
    }

    setLoading(true);
    try {
      if (editMode && editId) {
        const res = await callPrivateApi(
          `/size/${editId}`,
          "PUT",
          { size },
          token
        );
        if (res.status === "error" || res.status === 400) {
          toast.error(res.message || "Failed to update size");
        } else {
          toast.success(res.message || "Size updated successfully");
          setSizeList(
            sizeList.map((item) =>
              item._id === editId ? { ...item, size } : item
            )
          );
        }
      } else {
        const res = await callPrivateApi("/size", "POST", { size }, token);
        if (res.status === "error" || res.status === 400) {
          toast.error(res.message || "Failed to add size");
        } else {
          toast.success(res.message || "Size added successfully");
          setSizeList([...sizeList, res.size]);
        }
      }
      setSize("");
      setEditMode(false);
      setEditId(null);
    } catch (error) {
      toast.error(error?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (id) => {
    const selected = sizeList.find((item) => item._id === id);
    if (selected) {
      setSize(selected.size);
      setEditId(id);
      setEditMode(true);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await callPrivateApi(
        `/size/${id}`,
        "DELETE",
        undefined,
        token
      );
      if (res.status === "error" || res.status === 400) {
        toast.error(res.message || "Failed to delete size");
      } else {
        toast.success(res.message || "Size deleted successfully");
        setSizeList(sizeList.filter((item) => item._id !== id));
      }
    } catch (error) {
      toast.error(error?.message || "Something went wrong");
    }
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleCheckboxChange = (id) => {
    setSelectedIds((prev) => {
      const newSet = new Set(prev);
      newSet.has(id) ? newSet.delete(id) : newSet.add(id);
      return newSet;
    });
  };

  const handleSelectAll = () => {
    const allSelected = currentItems.every((item) => selectedIds.has(item._id));
    setSelectedIds((prev) => {
      const newSet = new Set(prev);
      currentItems.forEach((item) =>
        allSelected ? newSet.delete(item._id) : newSet.add(item._id)
      );
      return newSet;
    });
  };

  const handleBulkDelete = async () => {
    if (selectedIds.size === 0) return;

    try {
      const res = await callPrivateApi(
        "/sizeLists/delete-multiple",
        "POST",
        {
          ids: Array.from(selectedIds),
        },
        token
      );
      if (res.status === "error" || res.status === 400) {
        toast.error(res.message || "Bulk delete failed");
      } else {
        toast.success(res.message || "Sizes deleted successfully");
        setSizeList(sizeList.filter((item) => !selectedIds.has(item._id)));
        setSelectedIds(new Set());
      }
    } catch (error) {
      toast.error(error?.message || "Something went wrong");
    }
  };

  return (
    <div
      className="bg-white p-6 rounded-lg shadow-md mb-6"
      ref={messagesEndRef}
    >
      <div className="mb-6">
        <InputLabel className="uppercase text-black text-[16px] font-semibold">
          Product Size
        </InputLabel>
        <TextField
          variant="outlined"
          value={size}
          onChange={(e) => setSize(e.target.value)}
          fullWidth
          className="mb-4"
        />
        <Button
          onClick={handleAddOrEditSize}
          variant="contained"
          color="primary"
          fullWidth
          className="bg-blue-600 text-white hover:bg-blue-700"
        >
          {editMode ? "Update Size" : "Publish and View"}
        </Button>
      </div>

      <TableContainer component={Paper}>
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
              placeholder="Search Size"
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
        <Table>
          <TableHead>
            <TableRow className="bg-blue-600">
              <TableCell className="text-white font-bold">Size</TableCell>
              <TableCell className="text-white font-bold">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={3} align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : currentItems.length == 0 ? (
              <TableRow>
                <TableCell colSpan={2}>No Size found</TableCell>
              </TableRow>
            ) : (
              currentItems.map((item) => (
                <TableRow key={item._id} className="hover:bg-gray-100">
                  <TableCell>
                    <input
                      type="checkbox"
                      checked={selectedIds.has(item._id)}
                      onChange={() => handleCheckboxChange(item._id)}
                      className="mr-2"
                    />
                    {item.size}
                  </TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => handleEdit(item._id)}
                      color="primary"
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDelete(item._id)}
                      color="error"
                    >
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
        <div className="flex justify-end p-4">
          <ProductPagination
            products={sizeList}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            filteredProducts={sizeList}
            handlePageChange={(_, value) => setCurrentPage(value)}
          />
        </div>
      </TableContainer>
      <ToastContainer />
    </div>
  );
};

export default ProductSize;
