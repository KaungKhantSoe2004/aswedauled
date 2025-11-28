"use client";

import { useState } from "react";
import { Link } from "react-router-dom";

export default function Sidebar({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [phoneOpen, setPhoneOpen] = useState(false);
  const [cycleOpen, setCycleOpen] = useState(false);

  const phoneCategories = [
    "Apple",
    "Samsung",
    "Xiaomi",
    "Oppo",
    "Vivo",
    "Realme",
    "OnePlus",
  ];
  const cycleCategories = ["Honda", "Yamaha", "Suzuki", "Bajaj", "Hero", "KTM"];

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-full w-64 bg-gray-900 text-white z-40 transform transition-transform duration-300 md:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ paddingTop: "4rem" }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-800 rounded-lg"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <nav className="p-4 space-y-2">
          {/* Phones */}
          <div>
            <button
              onClick={() => setPhoneOpen(!phoneOpen)}
              className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-800 rounded-lg transition-colors font-bold"
            >
              <span>Phones</span>
              <svg
                className={`w-4 h-4 transition-transform ${
                  phoneOpen ? "rotate-180" : ""
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                />
              </svg>
            </button>
            {phoneOpen && (
              <div className="ml-4 space-y-1 mt-1">
                {phoneCategories.map((cat) => (
                  <Link
                    key={cat}
                    to={`/category/phones-${cat.toLowerCase()}`}
                    className="block px-4 py-2 hover:bg-yellow-400 hover:text-black rounded-lg transition-colors text-sm"
                    onClick={onClose}
                  >
                    {cat}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Motorcycles */}
          <div>
            <button
              onClick={() => setCycleOpen(!cycleOpen)}
              className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-800 rounded-lg transition-colors font-bold"
            >
              <span>Motorcycles</span>
              <svg
                className={`w-4 h-4 transition-transform ${
                  cycleOpen ? "rotate-180" : ""
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                />
              </svg>
            </button>
            {cycleOpen && (
              <div className="ml-4 space-y-1 mt-1">
                {cycleCategories.map((cat) => (
                  <Link
                    key={cat}
                    to={`/category/cycles-${cat.toLowerCase()}`}
                    className="block px-4 py-2 hover:bg-yellow-400 hover:text-black rounded-lg transition-colors text-sm"
                    onClick={onClose}
                  >
                    {cat}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <hr className="my-4 border-gray-700" />

          <Link
            to="/info"
            className="block px-4 py-3 hover:bg-gray-800 rounded-lg transition-colors font-bold"
            onClick={onClose}
          >
            Contact Us
          </Link>
        </nav>
      </aside>
    </>
  );
}
