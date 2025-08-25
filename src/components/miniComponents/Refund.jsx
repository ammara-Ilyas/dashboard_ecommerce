"use client";
import { useEffect, useState } from "react";

const API = "http://localhost:5000/api";

export default function Refund() {
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const toggleRefund = async (enable) => {
    try {
      setLoading(true);
      const res = await fetch(`${API}/toggle-refund`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ enable }),
      });
      const data = await res.json();
      setStatus(data?.message || "Updated");
    } catch (error) {
      setStatus("Error connecting to server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-white rounded-xl border border-blue-100 shadow-sm p-6">
          <h1 className="text-2xl font-semibold text-blue-700 mb-4">Refund Control</h1>
          <p className="text-sm text-gray-600 mb-6">Enable or disable refunds across the store.</p>

          <div className="flex items-center gap-4">
            <button
              onClick={() => toggleRefund(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md"
              disabled={loading}
            >
              {loading ? "Saving..." : "Enable Refunds"}
            </button>
            <button
              onClick={() => toggleRefund(false)}
              className="bg-gray-100 hover:bg-gray-200 text-gray-900 font-medium py-2 px-4 rounded-md"
              disabled={loading}
            >
              Disable Refunds
            </button>
          </div>

          {status && (
            <div className="mt-6 text-sm text-gray-700">
              Current Status: <span className="font-semibold">{status}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
