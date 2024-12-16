"use client";
import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Paper,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useCategory } from "@/contextApi/CategoriesContext";

const CategoryTable = () => {
  const { subCategories, setSubCategories } = useCategory();

  // Handle Deletion of a Subcategory
  const handleDeleteSubcategory = (categoryIndex, subIndex) => {
    const updatedSubCategories = [...subCategories];
    updatedSubCategories[categoryIndex].subcategories.splice(subIndex, 1);

    // Update the state
    setSubCategories(updatedSubCategories);
  };

  return (
    <TableContainer component={Paper} className="rounded-lg shadow-lg">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell className="!bg-blue-600 !text-white font-semibold">
              Category Image
            </TableCell>
            <TableCell className="!bg-blue-600 !text-white font-semibold">
              Category
            </TableCell>
            <TableCell className="!bg-blue-600 !text-white font-semibold">
              Sub Category
            </TableCell>
          </TableRow>
        </TableHead>

        {/* Table Body */}
        <TableBody>
          {subCategories.map((category, categoryIndex) => (
            <TableRow key={categoryIndex} className="even:bg-gray-100">
              {/* Category Image */}
              <TableCell>
                <div className="flex items-center justify-center">
                  <Image
                    src={category.image}
                    alt={`${category.name} image`}
                    width={50}
                    height={50}
                    className="rounded"
                  />
                </div>
              </TableCell>

              {/* Category Name */}
              <TableCell className="text-gray-800 font-medium">
                {category.name}
              </TableCell>

              {/* Subcategories */}
              <TableCell>
                <div className="flex flex-wrap gap-2">
                  {category.subcategories.map((sub, subIndex) => (
                    <Chip
                      key={subIndex}
                      label={sub}
                      color="primary"
                      className="!bg-blue-100 !text-blue-600 !font-semibold"
                      onDelete={() =>
                        handleDeleteSubcategory(categoryIndex, subIndex)
                      }
                      deleteIcon={
                        <IconButton size="small">
                          <CloseIcon fontSize="small" />
                        </IconButton>
                      }
                    />
                  ))}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CategoryTable;
