import React from "react";
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
  Button,
} from "@mui/material";

const orders = [
  {
    orderId: "c71a2d10bff4a25f1dc5f8aa",
    paymentId: "pay_PAY123457890",
    productLink: "Click here to view",
    name: "demo",
    phone: "+91 9826392013",
    address: "testperson near sample area, school, test city, State",
    pincode: "574001",
    totalAmount: "₹ 1200",
    email: "demo1@gmail.com",
    storeId: "c7129a6a29bfb82ca4742",
    orderStatus: "Delivered",
    dateOrdered: "2023-12-10",
  },
  {
    orderId: "c712f829dc728f52a4769",
    paymentId: "pay_PAY4234756724",
    productLink: "Click here to view",
    name: "DESIGN",
    phone: "+91 8327693435",
    address: "valid city example street",
    pincode: "572203",
    totalAmount: "₹ 920",
    email: "exampleuser987@gmail.com",
    storeId: "c712f456765e329bd2782",
    orderStatus: "Confirm",
    dateOrdered: "2023-12-08",
  },
  // Add more sample data as needed
];

const OrderTable = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <TableContainer component={Paper}>
        <Table>
          <TableHead className="bg-blue-600">
            <TableRow>
              <TableCell className="text-white font-bold">Order ID</TableCell>
              <TableCell className="text-white font-bold">Payment ID</TableCell>
              <TableCell className="text-white font-bold">Product</TableCell>
              <TableCell className="text-white font-bold">Name</TableCell>
              <TableCell className="text-white font-bold">
                Phone Number
              </TableCell>
              <TableCell className="text-white font-bold">Address</TableCell>
              <TableCell className="text-white font-bold">Pincode</TableCell>
              <TableCell className="text-white font-bold">
                Total Amount
              </TableCell>
              <TableCell className="text-white font-bold">Email</TableCell>
              <TableCell className="text-white font-bold">Store ID</TableCell>
              <TableCell className="text-white font-bold">
                Order Status
              </TableCell>
              <TableCell className="text-white font-bold">
                Date Ordered
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order, index) => (
              <TableRow
                key={index}
                className="hover:bg-gray-100 transition duration-150"
              >
                <TableCell>{order.orderId}</TableCell>
                <TableCell>{order.paymentId}</TableCell>
                <TableCell>
                  <Button variant="text" className="text-blue-500 underline">
                    {order.productLink}
                  </Button>
                </TableCell>
                <TableCell>{order.name}</TableCell>
                <TableCell>{order.phone}</TableCell>
                <TableCell>{order.address}</TableCell>
                <TableCell>{order.pincode}</TableCell>
                <TableCell>{order.totalAmount}</TableCell>
                <TableCell>{order.email}</TableCell>
                <TableCell>{order.storeId}</TableCell>
                <TableCell>
                  <Select
                    value={order.orderStatus}
                    className="bg-gray-100"
                    size="small"
                  >
                    <MenuItem value="Delivered">Delivered</MenuItem>
                    <MenuItem value="Confirm">Confirm</MenuItem>
                  </Select>
                </TableCell>
                <TableCell>{order.dateOrdered}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default OrderTable;
