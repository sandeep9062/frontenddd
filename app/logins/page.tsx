"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import toast from "react-hot-toast";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import logo from "../../public/logo.png";
import axios from "axios";

interface LoginResponse {
  token: string;
}

const Login: React.FC = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await axios.post<LoginResponse>("/api/patient/login", formData);
      toast.success("Logged in successfully!");
      localStorage.setItem("token", data.token);
      router.push("/");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  const responseGoogle = async (response: any) => {
    try {
      const { data } = await axios.post<LoginResponse>("/api/patient/google-login", {
        token: response.credential,
      });
      toast.success("Logged in successfully!");
      localStorage.setItem("token", data.token);
      router.push("/");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Google login failed");
    }
  };

  return (
    <GoogleOAuthProvider clientId="762100531597-7ce1m658uhi2lnm3tqtnnpe5j0l1pnt3.apps.googleusercontent.com">
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-teal-400">
        <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-xl">
          <div className="flex justify-center">
          <Image src={logo} alt="Logo" width={80} height={80} />
        </div>
        <h2 className="text-3xl font-extrabold text-center text-gray-800">
          Patient Login
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="text-sm font-bold text-gray-600">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 mt-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="text-sm font-bold text-gray-600">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 mt-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
              placeholder="********"
            />
          </div>
          <div className="flex items-center justify-end">
            <a
              href="/forgot-password"
              className="text-sm font-medium text-blue-600 hover:text-blue-500"
            >
              Forgot your password?
            </a>
          </div>
          <button
            type="submit"
            className="w-full py-3 font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Login
          </button>
        </form>

        <div className="flex items-center justify-center my-4">
          <div className="w-full border-t border-gray-300"></div>
          <div className="px-2 text-sm text-gray-500 bg-white">OR</div>
          <div className="w-full border-t border-gray-300"></div>
        </div>

        <GoogleLogin
          onSuccess={responseGoogle}
          onError={() => {
            toast.error("Login Failed");
          }}
        />

          <p className="text-sm text-center text-gray-600">
            Don't have an account?{" "}
            <a
              href="/register"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Sign up
            </a>
          </p>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default Login;
