"use client";

import { useState } from "react";
import {
  FiMenu,
  FiX,
  FiSearch,
  FiShoppingCart,
  FiUser,
  FiChevronDown,
} from "react-icons/fi";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [phonesDropdown, setPhonesDropdown] = useState(false);

  return (
    <nav className="bg-[#0F0F0F] border-b border-[#404040] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#FFEA00] rounded-lg flex items-center justify-center text-[#1A1A1A] font-bold text-sm">
              TH
            </div>
            <span className="text-[#FFEA00] font-bold text-xl hidden sm:inline">
              TechHub
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {/* Phones Dropdown */}
            <div className="relative group">
              <button className="text-[#FFFFFF] hover:text-[#FFEA00] transition-colors text-sm flex items-center gap-1">
                Phones
                <FiChevronDown size={16} />
              </button>
              <div className="absolute left-0 mt-0 w-48 bg-[#1A1A1A] border border-[#404040] rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                <a
                  href="#"
                  className="block px-4 py-2 text-[#FFFFFF] hover:text-[#FFEA00] hover:bg-[#2A2A2A] text-sm border-b border-[#404040]"
                >
                  Apple
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-[#FFFFFF] hover:text-[#FFEA00] hover:bg-[#2A2A2A] text-sm border-b border-[#404040]"
                >
                  Samsung
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-[#FFFFFF] hover:text-[#FFEA00] hover:bg-[#2A2A2A] text-sm border-b border-[#404040]"
                >
                  Google Pixel
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-[#FFFFFF] hover:text-[#FFEA00] hover:bg-[#2A2A2A] text-sm border-b border-[#404040]"
                >
                  OnePlus
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-[#FFFFFF] hover:text-[#FFEA00] hover:bg-[#2A2A2A] text-sm"
                >
                  Xiaomi
                </a>
              </div>
            </div>

            <a
              href="#"
              className="text-[#FFFFFF] hover:text-[#FFEA00] transition-colors text-sm"
            >
              Motorcycles
            </a>

            <a
              href="#"
              className="text-[#FFFFFF] hover:text-[#FFEA00] transition-colors text-sm"
            >
              About
            </a>
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-[#2A2A2A] rounded-lg transition-colors">
              <FiSearch size={20} className="text-[#FFFFFF]" />
            </button>
            <button className="p-2 hover:bg-[#2A2A2A] rounded-lg transition-colors hidden sm:block">
              <FiUser size={20} className="text-[#FFFFFF]" />
            </button>
            <button className="p-2 hover:bg-[#2A2A2A] rounded-lg transition-colors relative">
              <FiShoppingCart size={20} className="text-[#FFFFFF]" />
              <span className="absolute top-1 right-1 w-4 h-4 bg-[#FFEA00] text-[#1A1A1A] text-xs rounded-full flex items-center justify-center font-bold">
                3
              </span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 hover:bg-[#2A2A2A] rounded-lg transition-colors"
            >
              {isOpen ? <FiX size={20} /> : <FiMenu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu - Slides from left */}
        <div
          className={`fixed left-0 top-16 h-screen w-64 bg-[#1A1A1A] border-r border-[#404040] transform transition-transform duration-300 ease-in-out md:hidden ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="p-4 space-y-4">
            {/* Mobile Phones Dropdown */}
            <div>
              <button
                onClick={() => setPhonesDropdown(!phonesDropdown)}
                className="w-full text-left text-[#FFFFFF] hover:text-[#FFEA00] transition-colors py-2 flex items-center justify-between"
              >
                Phonesdsfafafdasfasfa
                <FiChevronDown
                  size={16}
                  className={`transform transition-transform ${
                    phonesDropdown ? "rotate-180" : ""
                  }`}
                />
              </button>
              {phonesDropdown && (
                <div className="ml-4 space-y-2 mt-2 border-l-2 border-[#FFEA00] pl-3">
                  <a
                    href="#"
                    className="block text-[#FFFFFF] hover:text-[#FFEA00] transition-colors text-sm py-1"
                  >
                    Apple
                  </a>
                  <a
                    href="#"
                    className="block text-[#FFFFFF] hover:text-[#FFEA00] transition-colors text-sm py-1"
                  >
                    Samsung
                  </a>
                  <a
                    href="#"
                    className="block text-[#FFFFFF] hover:text-[#FFEA00] transition-colors text-sm py-1"
                  >
                    Google Pixel
                  </a>
                  <a
                    href="#"
                    className="block text-[#FFFFFF] hover:text-[#FFEA00] transition-colors text-sm py-1"
                  >
                    OnePlus
                  </a>
                  <a
                    href="#"
                    className="block text-[#FFFFFF] hover:text-[#FFEA00] transition-colors text-sm py-1"
                  >
                    Xiaomi
                  </a>
                </div>
              )}
            </div>
            <a
              href="#"
              className="block text-[#FFFFFF] hover:text-[#FFEA00] transition-colors py-2"
            >
              Motorcycles
            </a>

            <a
              href="#"
              className="block text-[#FFFFFF] hover:text-[#FFEA00] transition-colors py-2"
            >
              About
            </a>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isOpen && (
          <div
            className="fixed inset-0 bg-black/50 md:hidden z-40 top-16"
            onClick={() => setIsOpen(false)}
          />
        )}
      </div>
    </nav>
  );
}
