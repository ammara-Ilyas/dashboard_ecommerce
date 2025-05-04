"use client";
import React, { useState, useEffect, useRef } from "react";
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
import { useProducts } from "@/contextApi/ProductContext";
import { toast, ToastContainer } from "react-toastify";
import { callPrivateApi, callPublicApi } from "@/libs/callApis";
import "react-toastify/dist/ReactToastify.css";
export default function AddProductWeight() {
  const { weightsList, setWeightsList } = useProducts();
  const [weight, setWeight] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loader, setLoader] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await callPublicApi("/weight", "GET");
        console.log("res in WeightList list ", res);

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
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [editId]);
  // Add or Edit Product Weight
  const handleAddOrEditWeight = async () => {
    if (weight.trim === "") {
      toast.error("Please enter weight");
    }
    if (editMode) {
      setWeight(weight);
      try {
        const res = await callPrivateApi(`/weight/${editId}`, "PUT", {
          weight: weight,
        });
        // console.log("res in update weight ", res);
        if (res.status === "error" || res.status === 400) {
          toast.error(res.message || "weight updated failed");
        } else {
          toast.success(res.message || "weight updated successfully");
          setWeight("");
        }
        setWeightsList(
          weightsList.map((item) =>
            item._id === editId ? { ...item, weight: weight } : item
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
      setWeight("");
    } else {
      try {
        const res = await callPrivateApi("/weight", "POST", {
          weight: weight,
        });
        // console.log("res in add weight ", res);
        if (res.status === "error" || res.status === 400) {
          toast.error(res.message || "weight added failed");
        } else {
          toast.success(res.message || "weight added successfully");
          setWeight("");
          setWeightsList([...weightsList, { weight: weight }]);
        }
      } catch (error) {
        toast.error(error?.message || "Something went wrong");
      } finally {
        setLoading(false);
        // to call useEffect
      }
    }
  };

  // Edit Weight
  const handleEdit = (id) => {
    const selectedWeight = weightsList.find((item) => item._id === id);
    if (selectedWeight) {
      setWeight(selectedWeight.weight);
    }
    setEditMode(true);
    setEditId(id);
  };

  // Delete Weight
  const handleDelete = async (id) => {
    setWeightsList(weightsList.filter((item) => item._id !== id));

    setLoading(true);
    try {
      const res = await callPrivateApi(`/weight/${id}`, "DELETE");
      // console.log("res in weight delete ", res);
      if (res.status === "error" || res.status === 400) {
        toast.error(res.message || "weight deleted failed");
      } else {
        toast.success(res.message || "weight deleted successfully");
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
      {/* Weight Input Form */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <div className="flex flex-col ">
          <InputLabel
            shrink
            className="uppercase text-black text-[16px] font-semibold "
          >
            Product Weight
          </InputLabel>
          <TextField
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            fullWidth
            className="mb-4 uppercase"
          />
        </div>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleAddOrEditWeight}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700"
        >
          {editMode ? "Update Weight" : "Add Weight"}
        </Button>
      </div>

      {/* Weight List Table */}
      <TableContainer component={Paper} className="shadow-md">
        <Table>
          <TableHead>
            <TableRow className="bg-blue-600">
              <TableCell className="text-white font-semibold">
                Product WEIGHT
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
              weightsList &&
              weightsList.map((weights) => (
                <TableRow key={weights._id}>
                  <TableCell>{weights.weight}</TableCell>
                  <TableCell>
                    <IconButton
                      color="primary"
                      onClick={() => handleEdit(weights._id)}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      color="secondary"
                      onClick={() => handleDelete(weights._id)}
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
