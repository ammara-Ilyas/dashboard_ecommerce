import React from "react";
import { Pagination } from "@mui/material";
const ProductPagination = ({
  products,
  itemsPerPage,
  filteredProducts,
  currentPage,
  handlePageChange,
}) => {
  return (
    <div className=" flex justify-end ">
      {products?.length > itemsPerPage && (
        <div className="flex justify-center ">
          <Pagination
            count={Math.ceil(filteredProducts?.length / itemsPerPage)}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
          />
        </div>
      )}
    </div>
  );
};

export default ProductPagination;
