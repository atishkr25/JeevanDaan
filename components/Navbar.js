"use client";

import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";

const Navbar = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const menuRef = useRef(null);
  const navLinks = [
    { href: "/projects", label: "Explore" },
    { href: "/#how-it-works", label: "How it works" },
    { href: "/dashboard", label: "Dashboard" },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 border-b border-[#E2EBE5] bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/80 transition-shadow ${
        isScrolled ? "shadow-sm" : "shadow-none"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-[#1B6B45] shadow-sm">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M12 20s-6.5-3.9-8.6-7.1C1.3 10 2 6.6 4.9 5.5c2-.8 4.1.1 5.1 1.7 1-1.6 3.1-2.5 5.1-1.7 2.9 1.1 3.6 4.5 1.5 7.4C18.5 16.1 12 20 12 20z"
                stroke="#FFFFFF"
                strokeWidth="1.5"
                fill="none"
              />
            </svg>
          </span>
          <span className="text-lg font-semibold tracking-tight text-[#1B6B45]">Sahayak</span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-gray-600 transition hover:text-[#1B6B45]"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          {!session ? (
            <>
              <button
                type="button"
                onClick={() => router.push("/fundraiser-form")}
                className="cursor-pointer rounded-xl bg-[#1B6B45] px-6 py-2.5 text-sm font-medium text-white transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B6B45]/30"
              >
                Start a fundraiser
              </button>
              <button
                type="button"
                onClick={() => router.push("/login")}
                className="cursor-pointer rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-800 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B6B45]/30"
              >
                Login
              </button>
              <Link href="/signup" className="text-sm font-medium text-gray-600 hover:text-[#1B6B45]">
                Sign up
              </Link>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={() => router.push("/fundraiser-form")}
                className="cursor-pointer rounded-xl bg-[#1B6B45] px-6 py-2.5 text-sm font-medium text-white transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B6B45]/30"
              >
                Start a fundraiser
              </button>
              <div className="relative" ref={menuRef}>
                <button
                  onClick={() => setShowProfileMenu((prev) => !prev)}
                  className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-[#E2EBE5] bg-white text-sm font-semibold text-gray-900 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B6B45]/30"
                  title={session.user?.name || session.user?.email}
                >
                  {session.user?.name?.charAt(0)?.toUpperCase() ||
                    session.user?.email?.charAt(0)?.toUpperCase() ||
                    "U"}
                </button>

                {showProfileMenu && (
                  <div className="absolute right-0 mt-3 w-56 overflow-hidden rounded-xl border border-[#E2EBE5] bg-white shadow-lg">
                    <button
                      onClick={() => {
                        setShowProfileMenu(false);
                        router.push("/profile");
                      }}
                      className="w-full cursor-pointer px-4 py-3 text-left text-sm font-medium text-gray-700 focus-visible:bg-gray-50 focus-visible:outline-none"
                    >
                      Profile
                    </button>
                    <button
                      onClick={() => {
                        setShowProfileMenu(false);
                        router.push("/my-fundraisers");
                      }}
                      className="w-full cursor-pointer px-4 py-3 text-left text-sm font-medium text-gray-700 focus-visible:bg-gray-50 focus-visible:outline-none"
                    >
                      My Fundraisers
                    </button>
                    <button
                      onClick={() => {
                        setShowProfileMenu(false);
                        signOut({ callbackUrl: "/login" });
                      }}
                      className="w-full cursor-pointer px-4 py-3 text-left text-sm font-medium text-red-500 focus-visible:bg-red-50 focus-visible:outline-none"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        <button
          type="button"
          className="inline-flex cursor-pointer items-center justify-center rounded-lg border border-[#E2EBE5] bg-white px-3 py-2 text-sm font-semibold text-gray-700 shadow-sm md:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B6B45]/30"
          onClick={() => setShowMobileMenu((prev) => !prev)}
        >
          {showMobileMenu ? "Close" : "Menu"}
        </button>
      </div>

      {showMobileMenu && (
        <div className="md:hidden">
          <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 pb-6 pt-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-xl border border-[#E2EBE5] bg-white px-4 py-3 text-sm font-medium text-gray-700"
                onClick={() => setShowMobileMenu(false)}
              >
                {link.label}
              </Link>
            ))}

            {!session ? (
              <>
                <button
                  onClick={() => {
                    setShowMobileMenu(false);
                    router.push("/fundraiser-form");
                  }}
                  className="cursor-pointer rounded-xl bg-[#1B6B45] px-4 py-3 text-sm font-medium text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B6B45]/30"
                >
                  Start a fundraiser
                </button>
                <button
                  onClick={() => {
                    setShowMobileMenu(false);
                    router.push("/login");
                  }}
                  className="cursor-pointer rounded-xl border border-[#E2EBE5] bg-white px-4 py-3 text-sm font-medium text-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B6B45]/30"
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    setShowMobileMenu(false);
                    router.push("/signup");
                  }}
                  className="cursor-pointer rounded-xl border border-[#E2EBE5] bg-white px-4 py-3 text-sm font-medium text-gray-700"
                >
                  Sign up
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    setShowMobileMenu(false);
                    router.push("/fundraiser-form");
                  }}
                  className="cursor-pointer rounded-xl bg-[#1B6B45] px-4 py-3 text-sm font-medium text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B6B45]/30"
                >
                  Start a fundraiser
                </button>
                <button
                  onClick={() => {
                    setShowMobileMenu(false);
                    router.push("/profile");
                  }}
                  className="cursor-pointer rounded-xl border border-[#E2EBE5] bg-white px-4 py-3 text-sm font-medium text-gray-700"
                >
                  Profile
                </button>
                <button
                  onClick={() => {
                    setShowMobileMenu(false);
                    router.push("/my-fundraisers");
                  }}
                  className="cursor-pointer rounded-xl border border-[#E2EBE5] bg-white px-4 py-3 text-sm font-medium text-gray-700"
                >
                  My Fundraisers
                </button>
                <button
                  onClick={() => {
                    setShowMobileMenu(false);
                    signOut({ callbackUrl: "/login" });
                  }}
                  className="cursor-pointer rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-600"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );

};

export default Navbar;
