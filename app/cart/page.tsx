// PaymentPage component
"use client";

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import CartProducts from "@/components/CartProducts";
import AlertMessage from "@/components/AlertMessage";
import Link from "next/link";
import { RootState } from "@/lib/store";
import {
  applyVoucher,
  removeVoucher,
  clearAlertMessage,
} from "@/lib/features/voucher/voucherSlice";
import { applyDiscount, removeDiscount } from "@/lib/features/cart/cartSlice";
import { Loader2 } from "lucide-react";

const PaymentPage = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const discount = useSelector((state: RootState) => state.cart.discount);
  const alertMessage = useSelector(
    (state: RootState) => state.voucher.alertMessage
  );
  const appliedVoucher = useSelector(
    (state: RootState) => state.voucher.appliedVoucher
  );
  const dispatch = useDispatch();

  const [shipping, setShipping] = useState(0); // Default to Outside Dhaka
  const [coupon, setCoupon] = useState("");
  const [loading, setLoading] = useState(false); // State to manage loading

  useEffect(() => {
    if (appliedVoucher) {
      dispatch(applyDiscount(appliedVoucher.amount));
    }
  }, [appliedVoucher, dispatch]);

  const handleApplyCoupon = () => {
    setLoading(true);
    dispatch(applyVoucher(coupon)).finally(() => setLoading(false));
  };

  const handleRemoveCoupon = () => {
    dispatch(removeVoucher());
    dispatch(removeDiscount());
  };

  const subtotal = cartItems.reduce(
    (total, item) => total + item.variant.discountPrice * item.quantity,
    0
  );

  const total = subtotal + shipping - discount;

  return (
    <div className="px-4 m-auto relative max-w-screen-xl mt-12 mb-12">
      <div className="md:flex space-y-10 md:space-y-0">
        <div className="md:w-2/3 md:mr-10 sm:max-w-lg sm:mx-auto md:max-w-none">
          <CartProducts />
        </div>
        <div className="md:w-1/3 md:mr-10 sm:max-w-lg sm:mx-auto md:max-w-none">
          <div className="sticky top-2">
            <div className="space-y-2">
              <h2 className="text-xl mb-2">Amount</h2>
              <div className="flex justify-between text-md text-slate-600">
                <p>Subtotal</p>
                <p>৳{subtotal.toFixed(2)}</p>
              </div>
              <div className="flex justify-between text-md text-slate-600">
                <p>Discount</p>
                <p>৳{discount.toFixed(2)}</p>
              </div>
              <div className="flex justify-between text-md text-slate-800 font-semibold">
                <p>Total</p>
                <p>৳{total.toFixed(2)}</p>
              </div>
            </div>
            <div className="flex gap-2 mt-6">
              <Input
                className="px-3 py-1"
                type="text"
                placeholder="Apply coupon"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
                disabled={!!appliedVoucher} // Disable input if voucher is applied
              />
              {appliedVoucher ? (
                <Button onClick={handleRemoveCoupon} disabled={loading}>
                  Remove Voucher
                </Button>
              ) : (
                <Button onClick={handleApplyCoupon} disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Please wait
                    </>
                  ) : (
                    "Apply"
                  )}
                </Button>
              )}
            </div>

            <div className="mt-4">
              {alertMessage && (
                <AlertMessage
                  type={alertMessage.type}
                  message={alertMessage.text}
                />
              )}
            </div>
            <div className="mt-4">
              <Link href="/payment">
                <Button className="w-full">Proceed to payment</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
