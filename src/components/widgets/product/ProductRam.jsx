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

export default function AddProductRAM() {
  const [ram, setRam] = useState("");
  const [ramList, setRamList] = useState([
    { id: 1, value: "4GB" },
    { id: 2, value: "8GB" },
  ]);

  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  // Handle Add/Edit RAM
  const handleAddOrEditRam = () => {
    if (editMode) {
      // Edit existing RAM
      setRamList(
        ramList.map((item) =>
          item.id === editId ? { ...item, value: ram } : item
        )
      );
      setEditMode(false);
      setEditId(null);
    } else {
      // Add new RAM
      setRamList([...ramList, { id: Date.now(), value: ram }]);
    }
    setRam(""); // Clear the input
  };

  // Handle Edit Button
  const handleEdit = (id, value) => {
    setEditMode(true);
    setEditId(id);
    setRam(value);
  };

  // Handle Delete Button
  const handleDelete = (id) => {
    setRamList(ramList.filter((item) => item.id !== id));
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Add Product RAM</h1>
      </div>

      {/* RAM Input Form */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <TextField
          label="Product RAM"
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
            {ramList.map((item) => (
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
