"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "@/app/components/LanguageSwitcher";
import logo from "@/public/logo.svg"; // Place your logo in /public

import { useDispatch, useSelector } from "react-redux";
import {
  loginSuccess,
  selectIsAuthenticated,
  selectUser,
} from "@/store/authSlice";

interface NavLinkItem {
  nameKey: string;
  to: string;
}

const navLinks: NavLinkItem[] = [
  { nameKey: "nav.home", to: "/" },
  { nameKey: "nav.consult", to: "/consult" },
  { nameKey: "nav.dentalClinics", to: "/dental-clinics" },
  { nameKey: "nav.dentalScans", to: "/cbct-opg-lab" },
  { nameKey: "nav.bloodTest", to: "/blood-test" },
  { nameKey: "nav.fixMyTeeth", to: "/fix-my-teeth" },
  { nameKey: "nav.blogs", to: "/blog" },
  { nameKey: "nav.support", to: "/support" },
];

const Navbar: React.FC = () => {
  const { t } = useTranslation();
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
    <header className="sticky top-0 z-50 w-full font-sans bg-white shadow-md">
      {/* Main Container */}
      <div className="flex items-center justify-between w-full max-w-full px-4 py-2 mx-auto">
        <div className="relative flex items-center justify-start flex-shrink-0 min-w-0">
          <Image
            src={logo}
            alt="Dental Tourism Clinics India Logo"
            className="rounded-full"
            width={60}
            height={60}
            priority
          />
          <span
            className="ml-2 text-lg font-extrabold leading-tight text-left drop-shadow-lg md:text-xl lg:text-2xl"
            style={{
              background:
                "linear-gradient(135deg, #FF9933 0%, #00529B 50%, #138808 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              filter: "drop-shadow(1px 1px 2px rgba(0,0,0,0.2))",
            }}
          >
            Dental Tourism
            <span className="block">Clinics India</span>
          </span>
        </div>

        <nav className="absolute items-center hidden gap-6 -translate-x-1/2 left-1/2 lg:flex">
          {mainNavLinks.map((link) => (
            <Link
              key={link.nameKey}
              href={link.to}
              className={`font-medium text-gray-700 hover:text-blue-600 transition-colors duration-300 text-base whitespace-nowrap relative after:content-[''] after:absolute after:left-0 after:bottom-[-4px] after:w-0 after:h-[2px] after:bg-blue-600 after:transition-all after:duration-300 ${
                pathname === link.to
                  ? "text-blue-600 after:w-full"
                  : "hover:after:w-full"
              }`}
            >
              {t(link.nameKey)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center flex-shrink-0 gap-2">
          <button
            className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold text-white transition-all duration-300 bg-blue-600 rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
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
            <span className="hidden md:inline">
              {isAuthenticated ? t("nav.profile") : t("nav.login")}
            </span>
          </button>

          <div className="hidden md:block">
            <LanguageSwitcher />
          </div>

          <button
            className="p-2 rounded lg:hidden focus:outline-none focus:ring-2 focus:ring-gray-400"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Open menu"
          >
            <svg
              className="w-6 h-6 text-gray-800"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden bg-white absolute top-full left-0 w-full shadow-lg transition-all duration-300 ease-in-out transform ${
          menuOpen
            ? "translate-y-0 opacity-100 visible"
            : "-translate-y-4 opacity-0 invisible"
        }`}
      >
        <div className="px-4 py-4">
          {navLinks.map((link) => (
            <Link
              key={link.nameKey}
              href={link.to}
              className={`block font-semibold py-2 text-base transition-colors duration-200 ${
                pathname === link.to
                  ? "text-blue-600"
                  : "text-gray-700 hover:text-blue-600"
              }`}
              onClick={() => setMenuOpen(false)}
            >
              {t(link.nameKey)}
            </Link>
          ))}

          <div className="pt-4 mt-4 border-t border-gray-200 md:hidden">
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
