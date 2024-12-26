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
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { useProducts } from "@/contextApi/ProductContext";
export default function AddProductWeight() {
  const { weightsList, setWeightsList } = useProducts();
  const [weight, setWeight] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [editId]);
  // Add or Edit Product Weight
  const handleAddOrEditWeight = () => {
    if (weight !== "") {
      if (editMode) {
        setWeightsList(
          weightsList.map((item) =>
            item.id === editId ? { ...item, value: weight } : item
          )
        );
        setEditMode(false);
        setEditId(null);
      } else {
        setWeightsList([...weightsList, { id: Date.now(), value: weight }]);
      }
    } else {
      alert("add weight");
    }
    setWeight("");
  };

  // Edit Weight
  const handleEdit = (id, value) => {
    setEditMode(true);
    setEditId(id);
    setWeight(value);
  };

  // Delete Weight
  const handleDelete = (id) => {
    setWeightsList(weightsList.filter((item) => item.id !== id));
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
          className="bg-blue-600 hover:bg-blue-700"
        ></Button>
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
            {weightsList &&
              weightsList.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.value}</TableCell>
                  <TableCell>
                    <IconButton
                      color="primary"
                      onClick={() => handleEdit(item.id, item.value)}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      color="secondary"
                      onClick={() => handleDelete(item.id)}
                    >
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
