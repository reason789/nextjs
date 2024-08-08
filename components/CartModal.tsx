"use client";

import Image from "next/image";
import { removeFromCart } from "@/lib/features/cart/cartSlice";
import { useDispatch } from "react-redux";
import { Trash2 } from "lucide-react";
import Link from "next/link";

const CartModal = ({ cartItems }) => {
  const isLoading = false;
  const dispatch = useDispatch();

  const handleRemoveFromCart = (variantId) => {
    dispatch(removeFromCart({ variantId }));
  };

  const subtotal = cartItems.reduce(
    (total, item) => total + item.variant.discountPrice * item.quantity,
    0
  );

  return (
    <div className=" space-y-6 max-h-[600px] overflow-y-auto">
      {cartItems.length == 0 ? (
        <div className="">Cart is Empty</div>
      ) : (
        <>
          <h2 className="text-xl">Shopping Cart</h2>
          {/* LIST */}
          <div className="flex flex-col gap-8">
            {/* ITEM */}
            {cartItems.map((item, index) => (
              <div className="flex gap-4" key={index}>
                <Image
                  src={item.image}
                  alt=""
                  width={72}
                  height={96}
                  className="object-cover rounded-md"
                />
                <div className="flex flex-col justify-between w-full">
                  {/* TOP */}
                  <div className="">
                    {/* TITLE */}
                    <div className="flex items-center justify-between gap-8">
                      <h3 className="font-semibold">{item.name}</h3>
                      <div className="p-1 bg-gray-50 rounded-sm flex items-center gap-2">
                        <div className="text-xs text-green-500">
                          {item.quantity} x{" "}
                        </div>
                        ৳{item?.variant?.discountPrice}
                      </div>
                    </div>
                    {/* DESC */}
                    <div className="text-sm text-gray-500">In stock</div>
                  </div>
                  {/* BOTTOM */}
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500">Qty. {item.quantity}</span>
                    <span
                      className="text-red-400"
                      style={{ cursor: isLoading ? "not-allowed" : "pointer" }}
                      onClick={() => handleRemoveFromCart(item.variant._id)}
                    >
                      <Trash2 className=" h-4 w-4 hover:text-red-500" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* BOTTOM */}
          <div className="">
            <div className="flex items-center justify-between font-semibold">
              <span className="">Subtotal</span>
              <span className="">৳{subtotal}</span>
            </div>
            <p className="text-gray-500 text-sm mt-2 mb-4">
              Shipping and taxes calculated at checkout.
            </p>
            <div className="flex justify-between text-sm p-1">
              <Link href="/cart">
                <button className="rounded-md py-3 px-4 ring-1 ring-gray-300">
                  View Cart
                </button>
              </Link>
              <Link href="/payment">
                <button
                  className="rounded-md py-3 px-4 bg-[#face14] text-black disabled:cursor-not-allowed disabled:opacity-75"
                  disabled={isLoading}
                  // onClick={handleCheckout}
                >
                  Checkout
                </button>
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CartModal;
