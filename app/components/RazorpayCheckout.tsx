"use client";

import React from "react";
import axios from "@/lib/axios";
import {toast} from "sonner";

interface RazorpayCheckoutProps {
  planId: string;
  planName: string;
  amount: number;
  billingCycle: "month" | "year";
  type: string;
  userId?: string | null;
}

const RazorpayCheckout: React.FC<RazorpayCheckoutProps> = ({
  planId,
  planName,
  amount,
  billingCycle,
  type,
  userId,
}) => {
  const initializeRazorpay = () => {
    return new Promise<boolean>((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    const res = await initializeRazorpay();
    if (!res) {
      toast.error("Razorpay SDK failed to load. Please check your connection.");
      return;
    }

    try {
      // 1️⃣ Create order on backend
      const { data } = await axios.post("/api/payment/create-order", {
        amount,
        planId,
        planName,
        planType: type,
        billingCycle,
        user: userId,
      });

      const { order, paymentId } = data;

      // 2️⃣ Configure Razorpay options
      const options: any = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "Your Company / App Name",
        description: `${planName} Subscription`,
        order_id: order.id,
        handler: async function (response: any) {
          const verifyRes = await axios.post("/api/payment/verify", {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          });

          if (verifyRes.data.success) {
            toast.success("Payment successful! 🎉");
          } else {
            toast.error("Payment verification failed");
          }
        },
        prefill: {
          name: "John Doe",
          email: "john@example.com",
          contact: "9999999999",
        },
        theme: { color: "#2C73D2" },
      };

      // 3️⃣ Open Razorpay checkout
      const paymentObject = new (window as any).Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error(error);
      toast.error("Payment initialization failed");
    }
  };

  return (
    <button
      onClick={handlePayment}
      className="w-full py-3 text-lg font-semibold text-white transition-all duration-300 bg-blue-600 rounded-lg hover:bg-blue-700"
    >
      Pay ₹{amount} for {planName}
    </button>
  );
};

export default RazorpayCheckout;
