"use client";

import { FcGoogle } from "react-icons/fc";
import { GoogleLogin } from "@react-oauth/google";
import axios from "@/lib/axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { AxiosError } from "axios";

export default function GoogleButton() {
  const router = useRouter();

  return (
    <GoogleLogin
      onSuccess={async (credentialResponse) => {
        try {
          const res = await axios.post("/auth/google", {
            token: credentialResponse.credential,
          });
          localStorage.setItem("token", res.data.token);
          toast.success("Logged in successfully!");
          router.push("/");
        } catch (error) {
          const err = error as AxiosError<{ message: string }>;
          toast.error(err.response?.data?.message || "Google login failed");
        }
      }}
      onError={() => {
        toast.error("Google login failed");
      }}
    />
  );
}
