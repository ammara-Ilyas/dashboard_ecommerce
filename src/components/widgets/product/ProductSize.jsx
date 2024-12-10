"use client";
import React, { useState } from "react";
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
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

const ProductSize = () => {
  const [size, setSize] = useState("");
  const [sizes, setSizes] = useState(["XL", "Xs", "S", "xl", "XS"]);
  const [editIndex, setEditIndex] = useState(null);

  const handleAddSize = () => {
    if (size.trim() && !sizes.includes(size)) {
      if (editIndex !== null) {
        const updatedSizes = [...sizes];
        updatedSizes[editIndex] = size;
        setSizes(updatedSizes);
        setEditIndex(null);
      } else {
        setSizes([...sizes, size]);
      }
      setSize("");
    }
  };

  const handleEdit = (index) => {
    setSize(sizes[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    setSizes(sizes.filter((_, i) => i !== index));
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Input and Button Section */}
      <div className="mb-6">
        <TextField
          label="Product Size"
          variant="outlined"
          value={size}
          onChange={(e) => setSize(e.target.value)}
          fullWidth
          className="mb-4"
        />
        <Button
          onClick={handleAddSize}
          variant="contained"
          color="primary"
          fullWidth
          className="bg-blue-600 text-white hover:bg-blue-700"
        >
          Publish and View
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
            {sizes.map((size, index) => (
              <TableRow key={index} className="hover:bg-gray-100">
                <TableCell>{size}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit(index)} color="primary">
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(index)} color="error">
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
