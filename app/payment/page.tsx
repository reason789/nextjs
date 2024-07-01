"use client";

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid"; // Import uuid
import { RootState } from "@/lib/store";
import PaymentItems from "@/components/PaymentItems";
import ShippingForm from "@/components/ShippingForm";
import { createOrder, clearOrderState } from "@/lib/features/order/orderSlice";
import { clearCart } from "@/lib/features/cart/cartSlice"; // Import the clearCart action
import { Button } from "@/components/ui/button";
import extractVariantValues from "@/utils/variantDetails";
import { Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const PaymentPage = () => {
  const router = useRouter();
  const { toast } = useToast();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const discount = useSelector((state: RootState) => state.cart.discount);
  const appliedVoucher = useSelector(
    (state: RootState) => state.voucher.appliedVoucher
  );
  const orderState = useSelector((state: RootState) => state.order);
  const dispatch = useDispatch();

  const [shipping, setShipping] = useState(140); // Default to Outside Dhaka
  const [shippingInfo, setShippingInfo] = useState({
    email: "",
    firstName: "",
    lastName: "",
    phoneNo: "",
    city: "",
    address: "",
  });
  const [phoneError, setPhoneError] = useState("");

  const handleShippingChange = (value) => {
    setShipping(value === "option-one" ? 80 : 140);
  };

  const subtotal = cartItems.reduce(
    (total, item) => total + item.variant.discountPrice * item.quantity,
    0
  );

  const total = subtotal + shipping - discount;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo({ ...shippingInfo, [name]: value });

    if (name === "phoneNo") {
      if (!value.startsWith("01") || value.length !== 11) {
        setPhoneError("Phone number must start with 01 and be 11 digits long");
      } else {
        setPhoneError("");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (phoneError) return; // Prevent form submission if there's a phone error

    // Generate a dynamic order ID
    const dynamicOrderId = uuidv4().replace(/-/g, "").substring(0, 10);

    const orderData = {
      orderLineItems: cartItems.map((item) => ({
        product: item._id,
        variant: item.variant._id,
        order: dynamicOrderId, // Use the dynamic order ID
        name: item.name,
        image: item.image,
        quantity: item.quantity,
        price: item.variant.discountPrice,
        productVariant: {
          name: extractVariantValues(item.variant)[0],
          value: extractVariantValues(item.variant)[1],
        },
      })),
      shippingInfo,
      orderId: dynamicOrderId, // Use the dynamic order ID
      discount,
      itemsPrice: subtotal,
      shippingPrice: shipping,
      totalPrice: total,
    };

    dispatch(createOrder(orderData));
  };

  useEffect(() => {
    if (orderState.successMessage) {
      router.push(`/success?orderId=${orderState.order.orderId}`);
      // toast({
      //   variant: "success",
      //   description: orderState.successMessage,
      // });
      dispatch(clearOrderState());
      dispatch(clearCart());
    }
    if (orderState.error) {
      toast({
        variant: "destructive",
        description: orderState.error,
      });
    }
  }, [orderState, dispatch, router]);

  return (
    <div className="px-4 md:px-8 lg:px-16 m-auto relative max-w-screen-xl mt-12 mb-12">
      <form onSubmit={handleSubmit} className="md:flex space-y-10">
        <div className="md:w-1/2 md:mr-5 sm:max-w-lg sm:mx-auto md:max-w-none">
          <ShippingForm
            handleShippingChange={handleShippingChange}
            total={total}
            shippingInfo={shippingInfo}
            handleInputChange={handleInputChange}
            loading={orderState.loading}
            phoneError={phoneError} // Pass phoneError to ShippingForm
          />
        </div>
        <div className="md:w-1/2 md:ml-5 sm:max-w-lg sm:mx-auto md:max-w-none">
          <div className="sticky top-24">
            <div className="space-y-4">
              {cartItems.map((item) => (
                <PaymentItems key={item._id} item={item} />
              ))}
            </div>
            <div className="mt-10 space-y-2">
              <div className="flex justify-between text-sm text-slate-600">
                <p>Subtotal</p>
                <p>৳{subtotal.toFixed(2)}</p>
              </div>
              <div className="flex justify-between text-sm text-slate-600">
                <p>Shipping</p>
                <p>৳{shipping.toFixed(2)}</p>
              </div>
              <div className="flex justify-between text-sm text-slate-600">
                <p>Discount</p>
                <p>৳{discount.toFixed(2)}</p>
              </div>
              <div className="flex justify-between text-lg text-slate-800 font-semibold">
                <p>Total</p>
                <p>৳{total.toFixed(2)}</p>
              </div>
            </div>
            <div className="mt-4">
              <Button
                disabled={orderState.loading || !!phoneError} // Disable if loading or phoneError exists
                type="submit"
                className="w-full py-6"
              >
                {orderState.loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                  </>
                ) : (
                  "Place Order"
                )}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PaymentPage;
