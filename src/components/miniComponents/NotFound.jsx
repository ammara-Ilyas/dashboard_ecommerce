"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
export default function NotFound() {
  const router = useRouter();
  const handleBackward = () => {
    router.push("/");
  };
  return (
    <div className="flex flex-col  items-center pt-16 min-h-screen bg-gray-100 text-gray-900">
      <h1 className="text-6xl font-bold text-blue-600 mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-2">Oops! Page Not Found</h2>
      <p className="text-gray-600 mb-6">
        The page you are looking for might have been removed or is temporarily
        unavailable.
      </p>
      <button
        className="bg-blue-600 focus:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg"
        onClick={handleBackward}
      >
        Go Back Home
      </button>
      <footer className="text-center mt-5 text-gray-600">
        © Ammara Ilyas, All Rights Reserved. Designed By HTML Codex
        <br />
        Distributed By Rumble
      </footer>
    </div>
  );
}
