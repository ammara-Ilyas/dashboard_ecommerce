"use client";
import React, { useState, useRef, useEffect, useMemo } from "react";
import {
  TextField,
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  InputLabel,
  Paper,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCategory } from "@/contextApi/CategoriesContext";
import { callPrivateApi, callPublicApi } from "@/libs/callApis";
import ProductPagination from "@/components/miniComponents/Pagination";
import ProductTableSkeleton from "@/libs/ProductSkeleton";
import { getToken } from "@/libs/Token";

export default function AddProductRAM() {
  const { ramList, setRamList } = useCategory();
  const [ram, setRam] = useState("");
  const [search, setSearch] = useState("");
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [token, setToken] = useState(null);

  useEffect(() => {
    const t = getToken();
    setToken(t);
  }, []);
  // Pagination
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  // Filtered and paginated items
  const currentItems = useMemo(() => {
    if (!ramList || ramList.length === 0) return [];
    const filtered = ramList.filter((item) =>
      item.ram?.toLowerCase().includes(search.toLowerCase())
    );
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return filtered.slice(indexOfFirstItem, indexOfLastItem);
  }, [ramList, search, currentPage]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [editId]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await callPublicApi("/ram", "GET");
        if (res.status === "error" || res.status === 400) {
          toast.error(res.message || "Failed to fetch RAMs");
        } else {
          setRamList(res.rams);
        }
      } catch (error) {
        toast.error(error?.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [setRamList]);

  const handleAddOrEditRam = async () => {
    if (ram.trim() === "") {
      toast.error("Please enter RAM");
      return;
    }

    if (editMode) {
      try {
        const res = await callPrivateApi(
          `/ram/${editId}`,
          "PUT",
          { ram },
          token
        );
        if (res.status === "error" || res.status === 400) {
          toast.error(res.message || "Update failed");
        } else {
          toast.success(res.message || "RAM updated");
          setRamList((prev) =>
            prev.map((item) => (item._id === editId ? { ...item, ram } : item))
          );
        }
      } catch (error) {
        toast.error(error?.message || "Something went wrong");
      } finally {
        setEditMode(false);
        setEditId(null);
        setRam("");
      }
    } else {
      try {
        const res = await callPrivateApi("/ram", "POST", { ram }, token);
        if (res.status === "error" || res.status === 400) {
          toast.error(res.message || "Add failed");
        } else {
          toast.success(res.message || "RAM added");
          setRamList([...ramList, { _id: res.newRam._id, ram }]);
          setRam("");
        }
      } catch (error) {
        toast.error(error?.message || "Something went wrong");
      }
    }
  };

  const handleEdit = (id) => {
    const selectedRam = ramList.find((item) => item._id === id);
    if (selectedRam) {
      setRam(selectedRam.ram);
      setEditMode(true);
      setEditId(id);
    }
  };

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      const res = await callPrivateApi(
        `/ram/${id}`,
        "DELETE",
        undefined,
        token
      );
      if (res.status === "error" || res.status === 400) {
        toast.error(res.message || "Delete failed");
      } else {
        toast.success(res.message || "RAM deleted");
        setRamList(ramList.filter((item) => item._id !== id));
      }
    } catch (error) {
      toast.error(error?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    setSearch(e.target.value.toLowerCase());
  };

  const handleBulkDelete = async () => {
    if (selectedIds.size === 0) return;
    setLoading(true);
    try {
      const idsArray = Array.from(selectedIds);
      const res = await callPrivateApi(
        "/ramList/delete-multiple",
        "POST",
        {
          ids: idsArray,
        },
        token
      );

      if (res.status === "error" || res.status === 400) {
        toast.error(res.message || "Bulk delete failed");
      } else {
        toast.success(res.message || "RAM entries deleted");
        setRamList((prev) => prev.filter((p) => !selectedIds.has(p._id)));
        setSelectedIds(new Set());
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
    const allSelected = currentItems.every((item) => selectedIds.has(item._id));
    setSelectedIds((prev) => {
      const newSelected = new Set(prev);
      currentItems.forEach((item) => {
        if (allSelected) {
          newSelected.delete(item._id);
        } else {
          newSelected.add(item._id);
        }
      });
      return newSelected;
    });
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen" ref={messagesEndRef}>
      {/* RAM Input Form */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <InputLabel
          shrink
          className="uppercase text-black text-[16px] font-semibold"
        >
          Product RAM
        </InputLabel>
        <TextField
          value={ram}
          onChange={(e) => setRam(e.target.value)}
          fullWidth
          className="mb-4"
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleAddOrEditRam}
          className="bg-blue-600 hover:bg-blue-700"
        >
          {editMode ? "Update RAM" : "Publish and View"}
        </Button>
      </div>

      {/* RAM List Table */}
      <TableContainer component={Paper} className="shadow-md">
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
              placeholder="Search RAM"
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
              <TableCell className="text-white font-semibold">
                Product RAM
              </TableCell>
              <TableCell className="text-white font-semibold">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={2} align="center">
                  <ProductTableSkeleton />
                </TableCell>
              </TableRow>
            ) : currentItems.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={2}
                  align="center"
                  className="text-gray-500 py-6"
                >
                  No RAM entries found.
                </TableCell>
              </TableRow>
            ) : (
              currentItems.map((ramItem) => (
                <TableRow key={ramItem._id}>
                  <TableCell>
                    <input
                      type="checkbox"
                      checked={selectedIds.has(ramItem._id)}
                      onChange={() => handleCheckboxChange(ramItem._id)}
                      className="mr-2"
                    />
                    {ramItem.ram}
                  </TableCell>
                  <TableCell>
                    <IconButton
                      color="primary"
                      onClick={() => handleEdit(ramItem._id)}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      color="secondary"
                      onClick={() => handleDelete(ramItem._id)}
                    >
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
        <div className="border-t py-4 px-4 flex justify-end">
          <ProductPagination
            products={ramList}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            filteredProducts={ramList}
            handlePageChange={handlePageChange}
          />
        </div>
      </TableContainer>
      <ToastContainer />
    </div>
  );
}
