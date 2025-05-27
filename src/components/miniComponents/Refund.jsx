"use client";
import { useState } from "react";

export default function Refund() {
  const [status, setStatus] = useState("Unknown");

  const toggleRefund = async (enabled) => {
    try {
      const res = await fetch("http://localhost:5000/api/admin/refund-toggle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ enabled }),
      });

      const data = await res.json();
      setStatus(data.message);
    } catch (error) {
      console.error("Error:", error);
      setStatus("Error connecting to server");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Refund Control Panel
      </h1>

      <div className="flex space-x-4">
        <button
          onClick={() => toggleRefund(true)}
          className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded"
        >
          Enable Refund
        </button>
        <button
          onClick={() => toggleRefund(false)}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
        >
          Disable Refund
        </button>
      </div>

      <p className="mt-6 text-lg font-medium text-gray-700">
        Current Status: <span className="font-bold">{status}</span>
      </p>
    </div>
  );
}
