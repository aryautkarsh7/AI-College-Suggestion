"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavbarProps {
  onLogoClick?: () => void;
}

export function Navbar({ onLogoClick }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-[#E5E7EB]/60 bg-[#FAFAFA]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <button
          onClick={onLogoClick}
          className="flex items-center gap-1 text-xl font-semibold tracking-tight text-[#111111] transition-opacity hover:opacity-80"
        >
          <span className="text-[#4F46E5]">College</span>
          <span>AI</span>
        </button>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-6 sm:flex">
          <a
            href="#explore"
            className="text-sm font-medium text-[#6B7280] transition-colors hover:text-[#111111]"
          >
            Explore
          </a>
          <a
            href="#compare"
            className="text-sm font-medium text-[#6B7280] transition-colors hover:text-[#111111]"
          >
            Compare
          </a>
          <button className="rounded-lg border border-[#E5E7EB] bg-white px-4 py-2 text-sm font-medium text-[#111111] shadow-sm transition-all hover:border-[#4F46E5]/30 hover:shadow-md">
            Sign in
          </button>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="sm:hidden rounded-lg p-2 text-[#6B7280] hover:bg-[#F5F5F5]"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="animate-fade-in border-t border-[#E5E7EB] bg-[#FAFAFA] px-4 py-4 sm:hidden">
          <div className="flex flex-col gap-3">
            <a
              href="#explore"
              className="rounded-lg px-3 py-2 text-sm font-medium text-[#6B7280] hover:bg-[#F5F5F5] hover:text-[#111111]"
            >
              Explore
            </a>
            <a
              href="#compare"
              className="rounded-lg px-3 py-2 text-sm font-medium text-[#6B7280] hover:bg-[#F5F5F5] hover:text-[#111111]"
            >
              Compare
            </a>
            <button className="rounded-lg border border-[#E5E7EB] bg-white px-4 py-2 text-sm font-medium text-[#111111] shadow-sm">
              Sign in
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
