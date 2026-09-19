"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 8);
  });

  return (
    <motion.nav
      animate={{
        boxShadow: scrolled ? "0 1px 0 rgba(17,17,17,0.06)" : "0 1px 0 rgba(17,17,17,0)",
      }}
      transition={{ duration: 0.2 }}
      className="sticky top-0 z-50 w-full border-b border-transparent bg-[#FAFAFA]/80 backdrop-blur-xl"
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-1 text-xl font-semibold tracking-tight text-[#111111] transition-opacity hover:opacity-80"
        >
          <span className="bg-gradient-to-r from-[#4F46E5] to-[#8B5CF6] bg-clip-text text-transparent">
            College
          </span>
          <span>AI</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-6 sm:flex">
          <Link
            href="/#explore"
            className="text-sm font-medium text-[#6B7280] transition-colors hover:text-[#111111]"
          >
            Explore
          </Link>
          <Link
            href="/#compare"
            className="text-sm font-medium text-[#6B7280] transition-colors hover:text-[#111111]"
          >
            Compare
          </Link>
          <Link
            href="/chat"
            className="rounded-lg bg-[#4F46E5] px-4 py-2 text-sm font-medium text-white shadow-sm transition-all hover:bg-[#4338CA] hover:shadow-md"
          >
            Try AI Chat
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="rounded-lg p-2 text-[#6B7280] hover:bg-[#F5F5F5] sm:hidden"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className={cn("overflow-hidden border-t border-[#E5E7EB] bg-[#FAFAFA] sm:hidden")}
          >
            <div className="flex flex-col gap-3 px-4 py-4">
              <Link
                href="/#explore"
                className="rounded-lg px-3 py-2 text-sm font-medium text-[#6B7280] hover:bg-[#F5F5F5] hover:text-[#111111]"
              >
                Explore
              </Link>
              <Link
                href="/#compare"
                className="rounded-lg px-3 py-2 text-sm font-medium text-[#6B7280] hover:bg-[#F5F5F5] hover:text-[#111111]"
              >
                Compare
              </Link>
              <Link
                href="/chat"
                className="rounded-lg bg-[#4F46E5] px-4 py-2 text-center text-sm font-medium text-white shadow-sm"
              >
                Try AI Chat
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
