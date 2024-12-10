"use client";
import { Bar } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js"; // Import required components
import { Card, CardContent, Typography } from "@mui/material";

// Register components explicitly
Chart.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const TotalSalesChart = () => {
  // Chart.js configuration
  const data = {
    labels: [
      "JAN",
      "FEB",
      "MAR",
      "APRIL",
      "MAY",
      "JUNE",
      "JULY",
      "AUG",
      "SEPT",
      "OCT",
      "NOV",
      "DEC",
    ],
    datasets: [
      {
        label: "Sales",
        data: [0, 5000, 0, 0, 0, 0, 0, 0, 10000, 20000, 22000, 2000],
        backgroundColor: "rgba(59, 130, 246, 0.8)", // Blue
        borderRadius: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context) => `sales: ${context.raw}`,
        },
      },
    },
    scales: {
      x: {
        ticks: { color: "#4B5563" }, // Tailwind Gray-700
      },
      y: {
        ticks: { color: "#4B5563" }, // Tailwind Gray-700
        beginAtZero: true,
      },
    },
  };
  console.log("total Stats");

  return (
    <Card className="shadow-lg">
      <CardContent className="">
        <Typography variant="h6" className="text-gray-700 font-semibold mb-4 ">
          Total Sales
        </Typography>
        <div className="w-full h-96 ">
          <Bar data={data} options={options} className=" w-full" />
        </div>
      </CardContent>
    </Card>
  );
};

export default TotalSalesChart;
