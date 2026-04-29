import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="border-t border-[#E2EBE5] bg-white">
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-8 sm:px-6 md:grid-cols-[1.2fr_1fr_1fr]">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-[#1B6B45] shadow-sm">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M12 20s-6.5-3.9-8.6-7.1C1.3 10 2 6.6 4.9 5.5c2-.8 4.1.1 5.1 1.7 1-1.6 3.1-2.5 5.1-1.7 2.9 1.1 3.6 4.5 1.5 7.4C18.5 16.1 12 20 12 20z"
                  stroke="#FFFFFF"
                  strokeWidth="1.5"
                  fill="none"
                />
              </svg>
            </span>
            <span className="text-base font-semibold text-[#1B6B45]">Sahayak</span>
          </div>
          <p className="text-sm text-gray-600">
            A compassionate crowdfunding platform built on trust, transparency, and real impact.
          </p>
          <p className="text-xs text-gray-500">Copyright © Sahayak</p>
        </div>

        <div className="space-y-2 text-sm text-gray-600">
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">Explore</p>
          <Link href="/projects" className="block hover:text-[#1B6B45]">Campaigns</Link>
          <Link href="/dashboard" className="block hover:text-[#1B6B45]">Dashboard</Link>
          <Link href="/about" className="block hover:text-[#1B6B45]">About</Link>
        </div>

        <div className="space-y-2 text-sm text-gray-600">
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">Get started</p>
          <Link href="/fundraiser-form" className="block hover:text-[#1B6B45]">Start a fundraiser</Link>
          <Link href="/login" className="block hover:text-[#1B6B45]">Login</Link>
          <Link href="/signup" className="block hover:text-[#1B6B45]">Sign up</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
