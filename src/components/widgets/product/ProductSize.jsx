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
import { useProducts } from "@/contextApi/ProductContext";
import { useCategory } from "@/contextApi/CategoriesContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { callPrivateApi, callPublicApi } from "@/libs/callApis";
import ProductPagination from "@/components/miniComponents/Pagination";
const ProductSize = () => {
  const { sizeList, setSizeList } = useCategory();
  const [size, setSize] = useState("");
  const [editId, setEditId] = useState(null);
  const [editMode, setEditMode] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loader, setLoader] = useState(false);
  const messagesEndRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  // Handle Pagination
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  // Calculate Paginated Items
  const currentItems = useMemo(() => {
    if (!sizeList || sizeList.length === 0) return [];
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return sizeList.slice(indexOfFirstItem, indexOfLastItem);
  }, [sizeList, currentPage]);
  console.log("current items", currentItems);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [editId]);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await callPublicApi("/size", "GET");
        console.log("res in sizes list ", res);

        if (res.status === "error" || res.status === 400) {
          toast.error(res.message || "sizes fetch failed");
        } else {
          toast.success(res.message || "sizes fetched successfully");
          setSizeList(res.sizes);
        }
      } catch (error) {
        toast.error(error?.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAddOrEditSize = async () => {
    if (size.trim === "") {
      toast.error("Please enter size");
    }
    if (editMode) {
      setSize(size);
      try {
        const res = await callPrivateApi(`/size/${editId}`, "PUT", {
          size: size,
        });
        //console.log("res in add size ", res);
        if (res.status === "error" || res.status === 400) {
          toast.error(res.message || "size updated failed");
        } else {
          toast.success(res.message || "size updated successfully");
          setSize("");
        }
        setSizeList(
          sizeList.map((item) =>
            item._id === editId ? { ...item, size: size } : item
          )
        );
      } catch (error) {
        toast.error(error?.message || "Something went wrong");
      } finally {
        setLoading(false);
        // to call useEffect
      }

      setEditMode(false);
      setEditId(null);
    } else {
      try {
        const res = await callPrivateApi("/size", "POST", { size: size });
        //console.log("res in add size ", res);
        if (res.status === "error" || res.status === 400) {
          toast.error(res.message || "size added failed");
        } else {
          toast.success(res.message || "size added successfully");
          setSize("");
          setSizeList([...sizeList, { size: size }]);
        }
      } catch (error) {
        toast.error(error?.message || "Something went wrong");
      } finally {
        setLoading(false);
        // to call useEffect
      }
    }
  };

  const handleEdit = async (id) => {
    const selectedSize = sizeList.find((item) => item._id === id);
    if (selectedSize) {
      setSize(selectedSize.size);
      setEditId(id);
      setEditMode(true);
    }
    setEditId(id);
    setEditMode(true);
  };

  const handleDelete = async (id) => {
    setSizeList(sizeList.filter((item) => item._id !== id));
    try {
      const res = await callPrivateApi(`/size/${id}`, "DELETE");
      //console.log("res in size delete ", res);
      if (res.status === "error" || res.status === 400) {
        toast.error(res.message || "size deleted failed");
      } else {
        toast.success(res.message || "size deleted successfully");
      }
    } catch (error) {
      toast.error(error?.message || "Something went wrong");
    } finally {
      setLoading(false);
      // to call useEffect
      setLoader(() => !loader);
    } // setSize(size.size);  };
  };
  return (
    <div
      className="bg-white p-6 rounded-lg shadow-md mb-6"
      ref={messagesEndRef}
    >
      <div className="mb-6">
        <div className="flex flex-col ">
          <InputLabel
            shrink
            className="uppercase text-black text-[16px] font-semibold "
          >
            Product Size
          </InputLabel>
          <TextField
            variant="outlined"
            value={size}
            onChange={(e) => setSize(e.target.value)}
            fullWidth
            className="mb-4"
          />
        </div>
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

      {/* Table Section */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow className="bg-blue-600">
              <TableCell className="text-white font-bold">
                Product Size
              </TableCell>
              <TableCell className="text-white font-bold">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={2} align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : (
              currentItems &&
              currentItems.map((size, i) => (
                <TableRow key={size._id || i} className="hover:bg-gray-100">
                  <TableCell>{size.size}</TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => handleEdit(size._id)}
                      color="primary"
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDelete(size._id)}
                      color="error"
                    >
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>{" "}
        <div className="border-2 flex items-center justify-end">
          {" "}
          <ProductPagination
            products={sizeList}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            filteredProducts={sizeList}
            handlePageChange={handlePageChange}
          />
        </div>
      </TableContainer>
      <ToastContainer />
    </div>
  );
};

export default ProductSize;
