"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import LanguageSwitcher from "@/app/components/LanguageSwitcher";
import logo from "@/public/logo.svg"; // Place your logo in /public

import { useDispatch, useSelector } from "react-redux";
import {
  loginSuccess,
  selectIsAuthenticated,
  selectUser,
} from "@/store/authSlice";

interface NavLinkItem {
  name: string;
  to: string;
}

const navLinks: NavLinkItem[] = [
  { name: "Home", to: "/" },
  { name: "Consult", to: "/consult" },
  { name: "Dental Clinics", to: "/dental-clinics" },
  { name: "Dental Scans", to: "/cbct-opg-lab" },
  { name: "Blood Test", to: "/blood-test" },
  { name: "Fix My Teeth", to: "/fix-my-teeth" },
  { name: "Blogs", to: "/blog" },
  { name: "Support", to: "/support" },
  { name: "Log In", to: "/login" },
];

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    if (token && user) {
      dispatch(loginSuccess({ user: JSON.parse(user), token }));
    }
  }, [dispatch]);

  const handleLoginClick = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    if (isAuthenticated && user) {
      switch (user.role) {
        case "dentist":
          router.push("/dentist/profile");
          break;
        case "cbct&opgcenters":
          router.push("/cbct-opg-lab/profile");
          break;
        case "pharma&brand":
          router.push("/pharma-brand/profile");
          break;
        case "diagnosticlabs":
          router.push("/diagnostic-labs/profile");
          break;
        case "patient":
          router.push("/patient/profile");
          break;
        default:
          router.push("/login");
          break;
      }
    } else {
      router.push("/login");
    }
  };

  const mainNavLinks = navLinks.filter((link) => link.to !== "/login");

  return (
    <header
      className="bg-[#2C73D2] shadow-sm sticky top-0 z-50 w-full font-[Poppins]"
      style={{ minHeight: "74px" }}
    >
      {/* Main Container */}
      <div className="flex items-center justify-between w-full px-4 py-3 mx-auto max-w-7xl">
        {/* Left: Logo + Brand */}
        <div className="relative flex items-center justify-start flex-shrink-0 min-w-0">
          <Image
            src={logo}
            alt="Dental Tourism Clinics India Logo"
            className="rounded-full"
            width={64}
            height={64}
            priority
          />

          <span
            className="ml-3 text-lg font-extrabold leading-tight text-left drop-shadow-lg md:text-xl lg:text-2xl"
            style={{
              background:
                "linear-gradient(135deg, #FF9933 0%, #FFFFFF 50%, #138808 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              filter: "drop-shadow(1px 1px 2px rgba(0,0,0,0.3))",
            }}
          >
            Dental Tourism
            <span className="block">Clinics India</span>
          </span>
        </div>

        {/* Center: Nav Links */}
        <nav className="absolute items-center hidden gap-5 -translate-x-1/2 left-1/2 md:flex">
          {mainNavLinks.map((link) => (
            <Link
              key={link.name}
              href={link.to}
              className={`font-semibold hover:text-[#F4A300] transition text-base whitespace-nowrap ${
                pathname === link.to ? "text-[#F4A300]" : "text-white"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Right: Utility Group */}
        <div className="flex items-center flex-shrink-0">
          {/* Login Button */}
          <button
            className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-white text-white bg-[#2C73D2] hover:bg-white hover:text-[#2C73D2] transition"
            onClick={handleLoginClick}
            aria-label="Login"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25a8.25 8.25 0 1115 0v.75a.75.75 0 01-.75.75h-13.5a.75.75 0 01-.75-.75v-.75z"
              />
            </svg>
          </button>

          {/* Language Switcher */}
          <div className="ml-2 md:ml-4">
            <LanguageSwitcher />
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="flex items-center justify-center p-2 rounded md:hidden focus:outline-none focus:ring-2 focus:ring-white"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Open menu"
          >
            <svg
              className="text-white w-7 h-7"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#2C73D2] shadow-lg border-t border-white px-4 py-4 flex flex-col gap-2 animate-fade-in absolute w-full left-0 top-full z-50">
          {navLinks.map((link) =>
            link.to === "/login" ? (
              <button
                key={link.name}
                className="flex items-center gap-2 px-6 py-2 rounded-full border-2 border-white text-white font-semibold bg-[#2C73D2] hover:bg-white hover:text-[#2C73D2] transition mt-2"
                onClick={() => {
                  setMenuOpen(false);
                  router.push("/login");
                }}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25a8.25 8.25 0 1115 0v.75a.75.75 0 01-.75.75h-13.5a.75.75 0 01-.75-.75v-.75z"
                  />
                </svg>
              </button>
            ) : (
              <Link
                key={link.name}
                href={link.to}
                className={`font-semibold py-2 text-base hover:text-[#F4A300] ${
                  pathname === link.to ? "text-[#F4A300]" : "text-white"
                }`}
                onClick={() => setMenuOpen(false)}
              >
                {link.name}
              </Link>
            )
          )}
          <div className="pt-4 mt-4 border-t border-white/20">
            <LanguageSwitcher />
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
