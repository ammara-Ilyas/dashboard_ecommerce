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
import { Card, CardContent, grid2Classes, Typography } from "@mui/material";

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
        backgroundColor: "rgba(59, 130, 246, 1)",
        borderRadius: 4,
        barThickness: 20,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      // tooltip: {
      //   callbacks: {
      //     label: (context) => `sales: ${context.raw}`,
      //   },
      // },
    },
    scales: {
      x: {
        ticks: { color: "#000000	" },
        grid: { display: false },
        stacked: true,
      },
      y: {
        ticks: { color: "	#000000	" },
        grid: {
          display: false,
        },
        beginAtZero: true,
        stacked: true,
      },
    },
  };
  console.log("total Stats");

  return (
    <Card className="shadow-lg w-[98%] mx-auto">
      <CardContent>
        <Typography variant="h6" className="mb-4 font-semibold">
          Total Sales
        </Typography>
        <div className="w-full h-96 ">
          <Bar
            data={{
              labels: data.labels,
              datasets: data.datasets,
            }}
            options={options}
            className="w-full text-black"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default TotalSalesChart;
