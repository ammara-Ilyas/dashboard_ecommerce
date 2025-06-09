// import React, { useEffect, useState } from "react";
import ProductView from "../ProductView";
import CustomReview from "@/components/miniComponents/CustomReview";
import { CircularProgress } from "@mui/material";
import { callPublicApi } from "@/libs/callApis";

const SingleProduct = ({ product }) => {
  // const [product, setProduct] = useState({});
  // const [loading, setLoading] = useState(false);
  // const fetchProduct = async () => {
  //   setLoading(true);
  //   try {
  //     const res = await callPublicApi(`/product/${id}`, "GET");
  //     console.log("res", res);
  //     setProduct(res.product);
  //   } catch (error) {
  //     console.log("error", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  // useEffect(() => {
  //   fetchProduct();
  // }, [id]);
  console.log("prdouct", product);

  return (
    <>
      <ProductView product={product} />
      <CustomReview id={product._id} />
    </>
  );
};

export default SingleProduct;
