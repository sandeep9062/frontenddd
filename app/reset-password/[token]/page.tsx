"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "@/lib/axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ResetPassword() {
  const { token } = useParams();
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleReset = async (e: any) => {
    e.preventDefault();
    const res = await axios.post(`/auth/reset/${token}`, { password });
    setMsg(res.data.message);
    setTimeout(() => router.push("/login"), 2000);
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-6 bg-white rounded-xl shadow">
      <h2 className="text-xl font-bold mb-4 text-center">Reset Password</h2>
      <form onSubmit={handleReset} className="space-y-4">
        <Input
          type="password"
          placeholder="New Password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" className="w-full">
          Reset Password
        </Button>
        {msg && <p className="text-green-600 text-sm">{msg}</p>}
      </form>
    </div>
  );
}
