"use client";
import React, { useState, useEffect, useRef } from "react";
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
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { useProducts } from "@/contextApi/ProductContext";
const ProductSize = () => {
  const { sizesList, setSizesList } = useProducts();
  const [size, setSize] = useState("");
  const [editId, setEditId] = useState(null);
  const [editMode, setEditMode] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [editId]);
  const handleAddOrEditSize = () => {
    if (size !== "") {
      if (editMode) {
        setSizesList(
          sizesList.map((item) =>
            item.id === editId ? { ...item, value: size } : item
          )
        );
        setEditMode(false);
        setEditId(null);
      } else {
        setSizesList([...sizesList, { id: Date.now(), value: size }]);
      }
    } else {
      alert("add size");
    }
    setSize("");
  };

  const handleEdit = (id) => {
    size = sizesList.filter((item) => item.id == id);
    // setSize(size.size);
    setEditId(id);
    setEditMode(true);
  };

  const handleDelete = (id) => {
    setSizesList(sizesList.filter((item) => item.id !== id));
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
            {sizesList &&
              sizesList.map((size, index) => (
                <TableRow key={index} className="hover:bg-gray-100">
                  <TableCell>{size.size}</TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => handleEdit(size.id)}
                      color="primary"
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDelete(size.id)}
                      color="error"
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
};

export default ProductSize;
