"use client";
import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  IconButton,
  Button,
} from "@mui/material";
import { AiFillEye, AiFillEdit, AiFillDelete } from "react-icons/ai";
import { callPrivateApi, callPublicApi } from "@/libs/callApis";
import Link from "next/link";
import { toast } from "react-toastify";
import { getToken } from "@/libs/Token";
import ProductListSkeleton from "@/libs/ProductSkeleton";

const OrderTable = () => {
  const [orders, setOrders] = useState([]);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const t = getToken();
    setToken(t);
  }, []);
  const fetchAllOrders = async () => {
    setLoading(true);
    try {
      const res = await callPublicApi("/orders", "GET");
      console.log("res order", res);
      setOrders(res.orders);
    } catch (error) {
      console.error(error.message || "Internal Server Error");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchAllOrders();
  }, []);
  const handleDelete = async (id) => {
    console.log("id", id);

    try {
      const res = await callPrivateApi(
        `/orders/${id}`,
        "DELETE",
        undefined,
        token
      );
      console.log("res", res);
      toast.success(res.message);
      setOrders(orders.filter((order) => order._id !== id));
    } catch (error) {
      toast.error(error.message || "Internal Server Error");
    }
  };
  return (
    <div className="p-6 bg-gray-100 min-h-screen ">
      {loading ? (
        <ProductListSkeleton />
      ) : (
        <TableContainer component={Paper} className="h-[400px] overflow-auto">
          <Table>
            <TableHead className="bg-blue-600">
              <TableRow>
                <TableCell className="text-white font-bold">Order No</TableCell>
                <TableCell className="text-white font-bold">Order ID</TableCell>
                <TableCell className="text-white font-bold">
                  Payment ID
                </TableCell>
                <TableCell className="text-white font-bold">Product</TableCell>
                <TableCell className="text-white font-bold">Name</TableCell>
                <TableCell className="text-white font-bold">Email</TableCell>
                <TableCell className="text-white font-bold">
                  Phone Number
                </TableCell>
                <TableCell className="text-white font-bold">
                  Total Amount
                </TableCell>
                <TableCell className="text-white font-bold">Address</TableCell>
                <TableCell className="text-white font-bold">
                  Order Status
                </TableCell>
                <TableCell className="text-white font-bold">
                  Date Ordered
                </TableCell>
                <TableCell className="text-white font-bold">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders &&
                orders.map((order, index) => (
                  <TableRow
                    key={index}
                    className="hover:bg-gray-100 transition duration-150 border-b-gray-400"
                  >
                    <TableCell
                      className="border-r border-r-gray-400 text-center w-[50px]"
                      sx={{
                        width: "50px",
                      }}
                    >
                      {index + 1}
                    </TableCell>
                    <TableCell
                      sx={{
                        width: "150px",
                        maxWidth: "150px",
                        whiteSpace: "nowrap", // single line
                        overflow: "hidden", // hide overflow
                        textOverflow: "ellipsis", // show ...
                      }}
                    >
                      {order?._id}
                    </TableCell>
                    <TableCell
                      sx={{
                        width: "200px",
                        maxWidth: "200px", // limit max width
                        whiteSpace: "nowrap", // single line
                        overflow: "hidden", // hide overflow
                        textOverflow: "ellipsis", // show ...
                      }}
                    >
                      {order?.stripeSessionId}
                    </TableCell>
                    <TableCell sx={{}}>
                      <Link
                        href="/order/products"
                        className="text-sm text-blue-500 underline"
                      >
                        Click Here to View Products
                      </Link>
                    </TableCell>
                    <TableCell className="font-semibold">
                      {order?.userName}
                    </TableCell>
                    <TableCell sx={{}}>{order?.userEmail}</TableCell>
                    <TableCell sx={{}}>{order?.phone}</TableCell>
                    <TableCell className="font-semibold">
                      {order?.amount}$
                    </TableCell>
                    <TableCell
                      sx={{
                        width: "250px",
                        maxWidth: "250px",
                      }}
                    >
                      {order?.address}
                    </TableCell>
                    <TableCell sx={{}}>
                      <Select
                        value={order?.status}
                        className="bg-gray-100"
                        size="small"
                      >
                        <MenuItem value="delivered">Delivered</MenuItem>
                        <MenuItem value="pending">Pending</MenuItem>
                      </Select>
                    </TableCell>
                    <TableCell sx={{}}>
                      {order?.createdAt
                        ? format(new Date(order.createdAt), "dd MMM yyyy")
                        : "N/A"}
                    </TableCell>
                    <TableCell>
                      <IconButton
                        onClick={() => handleDelete(order?._id)}
                        className="bg-red-500 text-white hover:bg-red-700"
                      >
                        <AiFillDelete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default OrderTable;
