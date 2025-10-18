"use client";

import { useState } from "react";
import axios from "@/lib/axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const res = await axios.post("/auth/forgot", { email });
    setMsg(res.data.message);
  };

  return (
    <div className="max-w-md p-6 mx-auto mt-16 bg-white shadow rounded-xl">
      <h2 className="mb-4 text-xl font-bold text-center">Forgot Password</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="email"
          placeholder="Enter your registered email"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button type="submit" className="w-full">
          Send Reset Link
        </Button>
        {msg && <p className="text-sm text-green-600">{msg}</p>}
      </form>
    </div>
  );
}
