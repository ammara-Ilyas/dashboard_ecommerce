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
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { useProducts } from "@/contextApi/ProductContext";
export default function AddProductRAM() {
  const { ramList, setRamList } = useProducts();
  const [ram, setRam] = useState("");

  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [editId]);
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
    } else if (ram !== "") {
      // Add new RAM
      setRamList([...ramList, { id: Date.now(), value: ram }]);
    } else {
      alert("write ram");
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
            {ramList &&
              ramList.map((item) => (
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
