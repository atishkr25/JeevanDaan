"use client";

import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import logo from "@/assets/logo.png";
import Link from "next/link";

const Navbar = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-gray-900 text-white shadow-xl border-b border-gray-700 sticky top-0 z-50">
      <div className="flex justify-between items-center px-4 sm:px-6 h-16">
      {/* 🔹 Logo Section */}
      <Link href="/" className="flex items-center gap-3 cursor-pointer">
        <Image src={logo} alt="Sahayak Logo" width={38} height={38} className="rounded-full shadow-md" />
        <span className="font-bold text-lg sm:text-xl tracking-wide hover:text-yellow-400 transition duration-300">
          SAHAYAK
        </span>
      </Link>

      <button
        type="button"
        className="md:hidden nav-btn !px-3 !py-2"
        onClick={() => setShowMobileMenu((prev) => !prev)}
      >
        {showMobileMenu ? "Close" : "Menu"}
      </button>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-4">
        <Link href="/" passHref>
          <button className="nav-btn bg-gradient-to-r from-gray-700 to-gray-800">Home</button>
        </Link>

        <Link href="/about" passHref>
          <button className="nav-btn bg-gradient-to-r from-gray-700 to-gray-800">About</button>
        </Link>

        <Link href="/projects" passHref>
          <button className="nav-btn bg-gradient-to-r from-gray-700 to-gray-800">Projects</button>
        </Link>

        {!session ? (
          <>
            <button
              onClick={() => router.push("/login")}
              className="nav-btn bg-gradient-to-r from-gray-700 to-gray-800"
            >
              Login
            </button>

            <Link href="/signup" passHref>
              <button className="nav-btn bg-gradient-to-r from-gray-700 to-gray-800">Sign Up</button>
            </Link>
          </>
        ) : (
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setShowProfileMenu((prev) => !prev)}
              className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center font-bold text-white hover:shadow-lg hover:from-blue-600 hover:to-indigo-600 transition duration-300 border-2 border-white shadow-md"
              title={session.user?.name || session.user?.email}
            >
              {session.user?.name?.charAt(0)?.toUpperCase() || session.user?.email?.charAt(0)?.toUpperCase() || "U"}
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 mt-3 w-56 rounded-lg border border-gray-700 bg-gray-900 shadow-2xl z-50 overflow-hidden">
                <button
                  onClick={() => {
                    setShowProfileMenu(false);
                    router.push("/profile");
                  }}
                  className="w-full text-left px-4 py-3 text-sm font-semibold hover:bg-gray-800 transition"
                >
                  Profile
                </button>
                <button
                  onClick={() => {
                    setShowProfileMenu(false);
                    router.push("/my-fundraisers");
                  }}
                  className="w-full text-left px-4 py-3 text-sm font-semibold hover:bg-gray-800 transition"
                >
                  My Fundraisers
                </button>
                <button
                  onClick={() => {
                    setShowProfileMenu(false);
                    signOut({ callbackUrl: "/login" });
                  }}
                  className="w-full text-left px-4 py-3 text-sm font-semibold hover:bg-gray-800 text-red-300 transition"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}

        <Link href="/hurray" passHref>
          <button className="nav-btn bg-gradient-to-r from-gray-700 to-gray-800">Hurray</button>
        </Link>
      </div>
      </div>

      {/* Mobile Navigation */}
      {showMobileMenu && (
        <div className="md:hidden px-4 pb-4 space-y-2 border-t border-gray-700">
          <Link href="/" onClick={() => setShowMobileMenu(false)} className="mobile-link">Home</Link>
          <Link href="/about" onClick={() => setShowMobileMenu(false)} className="mobile-link">About</Link>
          <Link href="/projects" onClick={() => setShowMobileMenu(false)} className="mobile-link">Projects</Link>
          <Link href="/hurray" onClick={() => setShowMobileMenu(false)} className="mobile-link">Hurray</Link>

          {!session ? (
            <>
              <button
                onClick={() => {
                  setShowMobileMenu(false);
                  router.push("/login");
                }}
                className="mobile-btn"
              >
                Login
              </button>
              <button
                onClick={() => {
                  setShowMobileMenu(false);
                  router.push("/signup");
                }}
                className="mobile-btn"
              >
                Sign Up
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => {
                  setShowMobileMenu(false);
                  router.push("/profile");
                }}
                className="mobile-btn"
              >
                Profile
              </button>
              <button
                onClick={() => {
                  setShowMobileMenu(false);
                  router.push("/my-fundraisers");
                }}
                className="mobile-btn"
              >
                My Fundraisers
              </button>
              <button
                onClick={() => {
                  setShowMobileMenu(false);
                  signOut({ callbackUrl: "/login" });
                }}
                className="mobile-btn text-red-300"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}

      {/* 🔹 Button Styling */}
      <style jsx>{`
        .nav-btn {
          padding: 10px 18px;
          font-size: 14px;
          font-weight: bold;
          border-radius: 8px;
          transition: transform 0.2s ease-in-out, background 0.3s ease-in-out;
          color: white;
          box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .nav-btn:hover {
          transform: scale(1.1);
          filter: brightness(1.3);
        }

        .mobile-link {
          display: block;
          width: 100%;
          padding: 10px 12px;
          border-radius: 8px;
          background: linear-gradient(to right, #374151, #1f2937);
          font-weight: 600;
        }

        .mobile-btn {
          width: 100%;
          text-align: left;
          padding: 10px 12px;
          border-radius: 8px;
          background: linear-gradient(to right, #374151, #1f2937);
          font-weight: 600;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
