// components/Header.js
"use client";
import Link from "next/link";

const Header = ({ title, breadcrumb }) => {
  return (
    <div className="flex justify-between items-center px-6 py-4 bg-white shadow rounded-lg">
      <h1 className="text-xl font-semibold text-gray-800">{title}</h1>
      <div className="text-sm text-gray-600">
        {breadcrumb.map((crumb, index) => (
          <span key={index} className="inline-block">
            <Link href={crumb.href}>
              <span className="text-blue-500 hover:underline">
                {crumb.label}
              </span>
            </Link>
            {index < breadcrumb.length - 1 && (
              <span className="mx-2 text-gray-400">/</span>
            )}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Header;
