"use client";

import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import axios from "@/lib/axios";
import { AxiosError } from "axios";
import GoogleButton from "./GoogleButton";
import Link from "next/link";
import Image from "next/image";

export default function AuthForm({ type }: { type: "login" | "register" }) {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    phone: "",
    clinicName: "",
    specialization: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const endpoint =
        type === "login" ? "/api/auth/login" : "/api/auth/register";
      const res = await axios.post(endpoint, form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      toast.success(
        type === "login"
          ? "Logged in successfully!"
          : "Registered successfully!"
      );

      console.log(res.data.role);
      if (res.data.role === "dentist") {
        router.push("/dentist/profile");
      } else if (res.data.role === "cbct&opgcenters") {
        router.push("/cbct-opg-lab/profile");
      } else if (res.data.role === "pharma&brand") {
        router.push("/pharma-brand/profile");
      } else if (res.data.role === "diagnosticlabs") {
        router.push("/diagnostic-labs/profile");
      } else if (res.data.role === "patient") {
        router.push("/patient/profile");
      } else {
        router.push("/login");
      }
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md p-6 mx-auto mt-16 mb-16 bg-white shadow rounded-2xl">
      <div className="flex justify-center mb-6">
        <Image src="/logo.png" alt="Logo" width={100} height={100} />
      </div>
      <h2 className="mb-6 text-2xl font-bold text-center">
        {type === "login" ? "Login to Your Account" : "Create an Account"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name (only for register) */}
        {type === "register" && (
          <Input
            type="text"
            placeholder="Full Name"
            required
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        )}

        {/* Email */}
        <Input
          type="email"
          placeholder="Email"
          required
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        {/* Password */}
        <Input
          type="password"
          placeholder="Password"
          required
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        {/* Phone (only for register) */}
        {type === "register" && (
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-600">
              Phone Number
            </label>
            <PhoneInput
              country={"in"}
              enableSearch
              inputClass="!w-full !h-10 !text-sm !pl-12 !border !border-gray-300 !rounded-md"
              dropdownClass="!z-50"
              onChange={(phone) => setForm({ ...form, phone })}
            />
          </div>
        )}

        {/* Role Selector (only for register) */}
        {type === "register" && (
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-600">
              Select Role
            </label>
            <Select
              onValueChange={(value) => setForm({ ...form, role: value })}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Choose your role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="patient">Patient</SelectItem>
                <SelectItem value="dentist">Dentist</SelectItem>
                <SelectItem value="pharma&brand">Pharma & Brand</SelectItem>
                <SelectItem value="cbct&opgcenters">
                  CBCT & OPG Centers
                </SelectItem>
                <SelectItem value="diagnosticlabs">Diagnostic Labs</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Please wait..." : type === "login" ? "Login" : "Register"}
        </Button>

        <div className="relative flex items-center py-4">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="flex-shrink mx-4 text-gray-500">OR</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        <GoogleButton />

        {type === "login" && (
          <div className="mt-4 text-sm text-center">
            <Link
              href="/forgot-password"
              className="font-medium text-blue-600 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>
        )}
      </form>

      <div className="mt-6 text-sm text-center">
        {type === "login" ? (
          <p>
            Dont have an account?{" "}
            <Link
              href="/register"
              className="font-medium text-blue-600 hover:underline"
            >
              Sign Up
            </Link>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-blue-600 hover:underline"
            >
              Login
            </Link>
          </p>
        )}
      </div>
    </div>
  );
}
