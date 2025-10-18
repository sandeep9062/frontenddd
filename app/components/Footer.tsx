"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import customLogo from "../../public/logo.png"; // adjust path if needed

// ✅ SVG ICONS (same as before)
const InstagramIcon = () => (
  <svg
    className="w-6 h-6"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient
        id="instagram-gradient"
        x1="0%"
        y1="100%"
        x2="100%"
        y2="0%"
      >
        <stop offset="0%" style={{ stopColor: "#feda75" }} />
        <stop offset="25%" style={{ stopColor: "#fa7e1e" }} />
        <stop offset="50%" style={{ stopColor: "#d62976" }} />
        <stop offset="75%" style={{ stopColor: "#962fbf" }} />
        <stop offset="100%" style={{ stopColor: "#4f5bd5" }} />
      </linearGradient>
    </defs>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 0C8.74 0 8.333.015 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.74 0 12s.015 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948s-.014-3.667-.072-4.947C21.927 2.69 19.505.273 15.148.073 13.867.014 13.46 0 12 0zm0 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849s-.012 3.584-.069 4.849c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.849-.07c-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849s.013-3.583.07-4.849c.149-3.227 1.664-4.771 4.919-4.919C8.416 2.175 8.796 2.163 12 2.163zM12 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.88 1.44 1.44 0 000-2.88z"
      fill="url(#instagram-gradient)"
    />
  </svg>
);

const YouTubeIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="#FF0000">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

// ✅ Footer Component
const Footer: React.FC = () => {
  const linkClass =
    "mb-1 text-sm transition-colors duration-200 hover:text-[#F4A300]";
  const titleClass =
    "pb-1 mb-4 text-lg font-extrabold tracking-wide border-b-2 border-white/50";

  return (
    <footer
      className="w-full pt-8 pb-4 mt-0 overflow-x-hidden transition-colors duration-300 sm:pt-12"
      style={{
        backgroundColor: "#2C73D2",
        color: "white",
      }}
    >
      <div className="flex flex-col items-center px-4 mx-auto max-w-7xl md:px-8">
        {/* Main Grid */}
        <div className="grid w-full grid-cols-2 mb-8 sm:grid-cols-4 lg:grid-cols-7 gap-x-6 gap-y-8 lg:gap-x-10">
          {/* Column 1 */}
          <div className="flex flex-col items-start min-w-[120px]">
            <span className={titleClass}>For Patients</span>
            <Link href="/consult" className={linkClass}>
              Search Dentist
            </Link>
            <Link href="/clinics" className={linkClass}>
              Search Dental Clinics
            </Link>
            <Link href="/consult" className={linkClass}>
              Consult Now
            </Link>
            <Link href="/patient-refund-policy" className={linkClass}>
              Refund Policy
            </Link>
          </div>

          {/* Column 2 */}
          <div className="flex flex-col items-start min-w-[110px]">
            <span className={titleClass}>For Dentist</span>
            <Link href="/consult" className={linkClass}>
              Profile
            </Link>
            <Link href="/refund-policy" className={linkClass}>
              Refund Policy
            </Link>
          </div>

          {/* Column 3 */}
          <div className="flex flex-col items-start min-w-[160px]">
            <span className={titleClass}>For CBCT & OPG Centre</span>
            <Link href="/cbct-opg-lab" className={linkClass}>
              Profile
            </Link>
            <Link href="/refund-policy" className={linkClass}>
              Refund Policy
            </Link>
          </div>

          {/* Column 4 */}
          <div className="flex flex-col items-start min-w-[160px]">
            <span className={titleClass}>For Blood Test Lab</span>
            <Link href="/blood-test" className={linkClass}>
              Profile
            </Link>
            <Link href="/refund-policy" className={linkClass}>
              Refund Policy
            </Link>
          </div>

          {/* Column 5 */}
          <div className="flex flex-col items-start min-w-[120px]">
            <span className={titleClass}>For Dental Essentials</span>
            <Link href="#" className={linkClass}>
              Profile
            </Link>
            <Link href="/refund-policy" className={linkClass}>
              Refund Policy
            </Link>
          </div>

          {/* Column 6 */}
          <div className="flex flex-col items-start min-w-[120px]">
            <span className={titleClass}>More</span>
            <Link href="/support" className={linkClass}>
              Help & Center
            </Link>
            <Link href="/privacy-policy" className={linkClass}>
              Privacy Policy
            </Link>
            <Link href="#" className={linkClass}>
              Cookie Policy
            </Link>
            <Link href="/terms" className={linkClass}>
              T&C
            </Link>
            <Link href="/contact" className={linkClass}>
              Contact Us
            </Link>
            <Link href="/articles" className={linkClass}>
              Articles
            </Link>
          </div>

          {/* Column 7: Social */}
          <div className="flex flex-col items-start min-w-[120px]">
            <span className={titleClass}>Social</span>
            <div className="flex justify-start gap-5 mt-2">
              <a
                href="https://www.instagram.com/dentaltourismclinicsindia?igsh=MWF1aG1nN21pczVnYw%3D%3D&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="transition-transform duration-200 transform hover:scale-110"
              >
                <InstagramIcon />
              </a>
              <a
                href="https://youtube.com/@dentaltourismclinicsindia?si=jp-9UDM9RO_CsJ2W"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="transition-transform duration-200 transform hover:scale-110"
              >
                <YouTubeIcon />
              </a>
            </div>
          </div>
        </div>

        <hr className="w-full my-6 border-t border-white/30" />

        {/* Logo and Copyright */}
        <div className="flex flex-col items-center mt-2">
          <Image
            src={customLogo}
            alt="Dental Tourism Clinics India Logo"
            width={80}
            height={80}
            className="object-contain mb-4"
            priority
          />

          <div className="flex flex-col items-center">
            <div className="w-24 h-0.5 bg-white/50 mb-3"></div>
            <span className="px-4 text-sm font-medium leading-relaxed text-center text-white/90 sm:text-base sm:px-2">
              Copyright © 2025, Dental Tourism Clinics India. All rights
              reserved.{" "}
              <Link
                href="/terms"
                className="font-bold text-white transition-colors duration-300 hover:text-[#F4A300]"
              >
                Terms apply.
              </Link>
            </span>
          </div>

          {/* Disclaimer */}
          <div className="px-4 mt-6 text-sm leading-normal text-justify text-white/70 sm:px-6 md:px-8">
            <p className="tracking-wide">
              <strong className="text-sm text-white/90">Disclaimer:</strong> The
              information provided on this website is for general informational
              purposes only and should not be considered as medical advice.
              Always consult with qualified dental professionals before making
              any treatment decisions. Dental Tourism Clinics India serves as a
              platform connecting patients with dental clinics and does not
              directly provide medical services. Treatment outcomes may vary,
              and we recommend verifying credentials and facilities before
              proceeding with any dental treatment.
            </p>
          </div>

          {/* Admin Link */}
          <div className="mt-4 transition-opacity duration-500 opacity-20 hover:opacity-100">
            <Link
              href="/admin/login"
              className="text-[8px] tracking-widest transition-colors duration-300"
              style={{ color: "#ffffff30" }}
              title="Admin Access"
            >
              ADMIN ACCESS
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
