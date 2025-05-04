import React from "react";
import { TableRow, TableCell, Skeleton, IconButton } from "@mui/material";

const ProductTableSkeleton = () => {
  return (
    <>
      {Array.from({ length: 5 }).map((_, index) => (
        <TableRow key={index} className="w-full">
          <TableCell>
            <div className="flex gap-3 items-center">
              <Skeleton variant="rectangular" width={50} height={50} />
              <div>
                <Skeleton width={100} />
                <Skeleton width={150} />
              </div>
            </div>
          </TableCell>
          <TableCell>
            <Skeleton width={80} />
          </TableCell>
          <TableCell>
            <Skeleton width={80} />
          </TableCell>
          <TableCell>
            <Skeleton width={60} height={24} />
          </TableCell>
          <TableCell>
            <Skeleton width={70} />
            <Skeleton width={70} />
          </TableCell>
          <TableCell>
            <Skeleton width={90} />
          </TableCell>
          <TableCell>
            <div className="flex space-x-2">
              <Skeleton variant="circular" width={32} height={32} />
              <Skeleton variant="circular" width={32} height={32} />
              <Skeleton variant="circular" width={32} height={32} />
            </div>
          </TableCell>
        </TableRow>
      ))}
    </>
  );
};

export default ProductTableSkeleton;
