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
  InputLabel,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { useProducts } from "@/contextApi/ProductContext";
const ProductSize = () => {
  const { sizesList, setSizesList } = useProducts();
  const [size, setSize] = useState("");
  // const [sizesList, setSizes] = useState(["XL", "Xs", "S", "xl", "XS"]);
  const [editIndex, setEditIndex] = useState(null);

  const handleAddSize = () => {
    if (size !== "") {
      if (size.trim() && !sizesList.includes(size)) {
        if (editIndex !== null) {
          const updatedSizes = [...sizesList];
          updatedSizes[editIndex] = size;
          setSizesList(updatedSizes);
          setEditIndex(null);
        } else {
          setSizesList([...sizesList, size]);
        }
        setSize("");
      }
    } else {
      alert("Write sizes first");
    }
  };

  const handleEdit = (index) => {
    setSize(sizesList[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    setSizesList(sizesList.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
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
            {sizesList.map((size, index) => (
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
