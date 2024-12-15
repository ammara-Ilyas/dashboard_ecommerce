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
  Paper,
} from "@mui/material";
import { useCategory } from "@/contextApi/CategoriesContext";
const CategoryTable = () => {
  const { subCategories, setSubCategories } = useCategory();

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
          {subCategories.map((category, index) => (
            <TableRow key={index} className="even:bg-gray-100">
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
