// components/Form.js
"use client";
import { TextField, Button } from "@mui/material";
import { useState } from "react";

const Form = () => {
  const [categoryName, setCategoryName] = useState("");
  const [color, setColor] = useState("");
  const [image, setImage] = useState(null);

  const handleImageUpload = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = () => {
    console.log({
      categoryName,
      color,
      image,
    });
    alert("Form submitted!");
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="space-y-4">
        <TextField
          label="Category Name"
          variant="outlined"
          fullWidth
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          className="!border-gray-300 !shadow-sm"
        />
        <TextField
          label="Color"
          variant="outlined"
          fullWidth
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="!border-gray-300 !shadow-sm"
        />
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Image Upload
          </label>
          <input
            type="file"
            onChange={handleImageUpload}
            className="block w-full text-sm text-gray-600 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:bg-gray-100 file:text-gray-600 hover:file:bg-gray-200"
          />
        </div>
        <Button
          variant="contained"
          fullWidth
          color="primary"
          onClick={handleSubmit}
          className="!bg-blue-600 hover:!bg-blue-700 !text-white !py-2"
        >
          Publish and View
        </Button>
      </div>
    </div>
  );
};

export default Form;
