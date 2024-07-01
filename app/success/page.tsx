"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { CircleCheck } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const SuccessPage = () => {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <p>Thank you for your support!</p>
      <div className="flex flex-col items-center p-8 md:p-10 rounded-lg shadow-lg max-w-lg mx-auto">
        <CircleCheck className="h-12 w-12 text-green-500 mb-4" />
        <h1 className="text-3xl font-semibold mt-4 text-center">
          Order Placed Successfully!
        </h1>
        <p className="text-gray-600 mt-2 mb-4 text-center">
          Your order ID is #<span className="font-semibold">{orderId}</span>
        </p>
        <Link href="/">
          <Button size="lg">Go to Home</Button>
        </Link>
      </div>
    </div>
  );
};

const SuccessPageWrapper = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SuccessPage />
    </Suspense>
  );
};

export default SuccessPageWrapper;
