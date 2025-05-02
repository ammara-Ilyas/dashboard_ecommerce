"use client";
import React, { useState, useRef, useEffect } from "react";
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
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useProducts } from "@/contextApi/ProductContext";
import { callPrivateApi, callPublicApi } from "@/libs/callApis";
export default function AddProductRAM() {
  const { ramList, setRamList } = useProducts();
  const [ram, setRam] = useState("");

  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loader, setLoader] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [editId]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      console.log("ok in useEffect of rams");

      try {
        const res = await callPublicApi("/ram", "GET");
        // console.log("res in Rams list ", res);

        if (res.status === "error" || res.status === 400) {
          toast.error(res.message || "Rams fetch failed");
        } else {
          toast.success(res.message || "Rams fetched successfully");
          setRamList(res.rams);
        }
      } catch (error) {
        toast.error(error?.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Handle Add/Edit RAM
  const handleAddOrEditRam = async () => {
    if (ram.trim === "") {
      toast.error("Please enter ram");
    }
    if (editMode) {
      setRam(ram);
      try {
        const res = await callPrivateApi(`/ram/${editId}`, "PUT", {
          ram: ram,
        });
        // console.log("res in add ram ", res);
        if (res.status === "error" || res.status === 400) {
          toast.error(res.message || "ram updated failed");
        } else {
          toast.success(res.message || "ram updated successfully");
          setRam("");
        }
        setRamList(
          ramList.map((item) =>
            item._id === editId ? { ...item, ram: ram } : item
          )
        );
      } catch (error) {
        toast.error(error?.message || "Something went wrong");
      } finally {
        setLoading(false);
      }

      setEditMode(false);
      setEditId(null);
      setRam("");
    } else {
      // Add new RAM
      try {
        const res = await callPrivateApi("/ram", "POST", { ram: ram });
        // console.log("res in add ram ", res);
        if (res.status === "error" || res.status === 400) {
          toast.error(res.message || "ram added failed");
        } else {
          toast.success(res.message || "ram added successfully");
          setRamList([...ramList, { ram: ram }]);
          setRam(""); // Clear the input
        }
      } catch (error) {
        toast.error(error?.message || "Something went wrong");
      } finally {
        setLoading(false);
        // to call useEffect
      }
    }
  };

  // Handle Edit Button
  const handleEdit = (id) => {
    const selectedRam = ramList.find((item) => item._id === id);
    if (selectedRam) {
      setRam(selectedRam.ram);
    }
    setEditMode(true);
    setEditId(id);
  };

  // Handle Delete Button
  const handleDelete = async (id) => {
    setRamList(ramList.filter((item) => item._id !== id));
    setLoading(true);
    try {
      const res = await callPrivateApi(`/ram/${id}`, "DELETE");
      // console.log("res in ram delete ", res);
      if (res.status === "error" || res.status === 400) {
        toast.error(res.message || "ram added failed");
      } else {
        toast.success(res.message || "ram deleted successfully");
      }
    } catch (error) {
      toast.error(error?.message || "Something went wrong");
    } finally {
      setLoading(false);
      // to call useEffect
      setLoader(() => !loader);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen" ref={messagesEndRef}>
      {/* RAM Input Form */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <div className="flex flex-col ">
          <InputLabel
            shrink
            className="uppercase text-black text-[16px] font-semibold "
          >
            Product RAM
          </InputLabel>
          <TextField
            value={ram}
            onChange={(e) => setRam(e.target.value)}
            fullWidth
            className="mb-4"
          />
        </div>
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
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : (
              ramList &&
              ramList.map((ram) => (
                <TableRow key={ram._id}>
                  <TableCell>{ram.ram}</TableCell>
                  <TableCell>
                    <IconButton
                      color="primary"
                      onClick={() => handleEdit(ram._id)}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      color="secondary"
                      onClick={() => handleDelete(ram._id)}
                    >
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <ToastContainer />
    </div>
  );
}
