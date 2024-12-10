"use client";
import React, { useState } from "react";
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
  Paper,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

export default function AddProductWeight() {
  const [weight, setWeight] = useState("");
  const [weightList, setWeightList] = useState([
    { id: 1, value: "2KG" },
    { id: 2, value: "4KG" },
    { id: 3, value: "5KG" },
  ]);

  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  // Add or Edit Product Weight
  const handleAddOrEditWeight = () => {
    if (editMode) {
      setWeightList(
        weightList.map((item) =>
          item.id === editId ? { ...item, value: weight } : item
        )
      );
      setEditMode(false);
      setEditId(null);
    } else {
      setWeightList([...weightList, { id: Date.now(), value: weight }]);
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
    setWeightList(weightList.filter((item) => item.id !== id));
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Add Product WEIGHT</h1>
      </div>

      {/* Weight Input Form */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <TextField
          label="Product WEIGHT"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          fullWidth
          className="mb-4"
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleAddOrEditWeight}
          className="bg-blue-600 hover:bg-blue-700"
        >
          {editMode ? "Update WEIGHT" : "Publish and View"}
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
            {weightList.map((item) => (
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
