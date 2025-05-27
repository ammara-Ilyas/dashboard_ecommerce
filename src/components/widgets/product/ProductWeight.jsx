"use client";
import React, { useState, useEffect, useRef, useMemo } from "react";
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
  CircularProgress,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { useCategory } from "@/contextApi/CategoriesContext";
import { toast, ToastContainer } from "react-toastify";
import { callPrivateApi, callPublicApi } from "@/libs/callApis";
import "react-toastify/dist/ReactToastify.css";
import ProductPagination from "@/components/miniComponents/Pagination";
import { getToken } from "@/libs/Token";

export default function AddProductWeight() {
  const { weightsList, setWeightsList } = useCategory();
  const [weight, setWeight] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loader, setLoader] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedIds, setSelectedIds] = useState(new Set());
  const messagesEndRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const t = getToken();
    setToken(t);
  }, []);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await callPublicApi("/weight", "GET");
        if (res.status === "error" || res.status === 400) {
          toast.error(res.message || "Weights fetch failed");
        } else {
          toast.success(res.message || "Weights fetched successfully");
          setWeightsList(res.weights);
        }
      } catch (error) {
        toast.error(error?.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [weightsList, setWeightsList]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [editId]);

  const handleAddOrEditWeight = async () => {
    if (weight.trim() === "") {
      toast.error("Please enter weight");
      return;
    }

    setLoading(true);
    if (editMode) {
      try {
        const res = await callPrivateApi(
          `/weight/${editId}`,
          "PUT",
          {
            weight,
          },
          token
        );
        if (res.status === "error" || res.status === 400) {
          toast.error(res.message || "Weight update failed");
        } else {
          toast.success(res.message || "Weight updated successfully");
          setWeightsList((prev) =>
            prev.map((item) =>
              item._id === editId ? { ...item, weight } : item
            )
          );
          setEditMode(false);
          setEditId(null);
          setWeight("");
        }
      } catch (error) {
        toast.error(error?.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    } else {
      try {
        const res = await callPrivateApi("/weight", "POST", { weight }, token);
        if (res.status === "error" || res.status === 400) {
          toast.error(res.message || "Weight add failed");
        } else {
          toast.success(res.message || "Weight added successfully");
          setWeightsList((prev) => [...prev, { ...res.weight }]);
          setWeight("");
        }
      } catch (error) {
        toast.error(error?.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleEdit = (id) => {
    const selectedWeight = weightsList.find((item) => item._id === id);
    if (selectedWeight) {
      setWeight(selectedWeight.weight);
      setEditMode(true);
      setEditId(id);
    }
  };

  const handleDelete = async (id) => {
    setWeightsList(weightsList.filter((item) => item._id !== id));
    setLoading(true);
    try {
      const res = await callPrivateApi(
        `/weight/${id}`,
        "DELETE",
        undefined,
        token
      );
      if (res.status === "error" || res.status === 400) {
        toast.error(res.message || "Weight delete failed");
      } else {
        toast.success(res.message || "Weight deleted successfully");
      }
    } catch (error) {
      toast.error(error?.message || "Something went wrong");
    } finally {
      setLoading(false);
      setLoader((prev) => !prev);
    }
  };

  const handleSearch = (e) => {
    setSearch(e.target.value.toLowerCase());
  };

  const handleCheckboxChange = (id) => {
    setSelectedIds((prev) => {
      const updated = new Set(prev);
      if (updated.has(id)) {
        updated.delete(id);
      } else {
        updated.add(id);
      }
      return updated;
    });
  };

  const handleBulkDelete = async () => {
    if (selectedIds.size === 0) return;
    setLoading(true);
    try {
      const idsArray = Array.from(selectedIds);
      const res = await callPrivateApi(
        "/weightsList/delete-multiple",
        "POST",
        {
          ids: idsArray,
        },
        token
      );
      if (res.status === "error" || res.status === 400) {
        toast.error(res.message || "Bulk delete failed");
      } else {
        toast.success(res.message || "Weights deleted successfully");
        setWeightsList((prev) => prev.filter((p) => !selectedIds.has(p._id)));
        setSelectedIds(new Set());
      }
    } catch (error) {
      toast.error(error?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleSelectAll = () => {
    const allSelected = currentItems.every((item) => selectedIds.has(item._id));
    setSelectedIds((prev) => {
      const updated = new Set(prev);
      currentItems.forEach((item) =>
        allSelected ? updated.delete(item._id) : updated.add(item._id)
      );
      return updated;
    });
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const currentItems = useMemo(() => {
    if (!weightsList || weightsList.length === 0) return [];
    const filtered = weightsList.filter((item) =>
      item.weight?.toLowerCase().includes(search)
    );
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return filtered.slice(indexOfFirstItem, indexOfLastItem);
  }, [weightsList, search, currentPage]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen" ref={messagesEndRef}>
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <InputLabel className="uppercase text-black text-[16px] font-semibold">
          Product Weight
        </InputLabel>
        <TextField
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          fullWidth
          className="mb-4 uppercase"
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleAddOrEditWeight}
          disabled={loading}
        >
          {editMode ? "Update Weight" : "Add Weight"}
        </Button>
      </div>

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
              placeholder="Search Weight"
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
              <TableCell className="text-white font-semibold">Weight</TableCell>
              <TableCell className="text-white font-semibold">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={2} align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : currentItems.length == 0 ? (
              <TableRow>
                <TableCell colSpan={2}>No weight found</TableCell>
              </TableRow>
            ) : (
              currentItems.map((weights) => (
                <TableRow key={weights._id}>
                  <TableCell>
                    <input
                      type="checkbox"
                      checked={selectedIds.has(weights._id)}
                      onChange={() => handleCheckboxChange(weights._id)}
                      className="mr-2"
                    />
                    {weights.weight}
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEdit(weights._id)}>
                      <Edit />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(weights._id)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
        <div className="p-4 flex justify-end">
          <ProductPagination
            products={weightsList}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            filteredProducts={weightsList}
            handlePageChange={handlePageChange}
          />
        </div>
      </TableContainer>
      <ToastContainer />
    </div>
  );
}
