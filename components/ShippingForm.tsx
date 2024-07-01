import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Loader2 } from "lucide-react";

const ShippingForm = ({
  handleShippingChange,
  total,
  shippingInfo,
  handleInputChange,
  loading,
  phoneError,
}) => {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-slate-800 mb-4">Contact</h1>
      <Input
        type="email"
        placeholder="Email"
        name="email"
        value={shippingInfo.email}
        onChange={handleInputChange}
        required
      />
      <div className="mt-10 space-y-4">
        <h1 className="text-2xl font-semibold text-slate-800 mb-4">Delivery</h1>
        <div className="flex space-x-4">
          <Input
            type="text"
            placeholder="First name"
            name="firstName"
            value={shippingInfo.firstName}
            onChange={handleInputChange}
            required
          />
          <Input
            type="text"
            placeholder="Last name"
            name="lastName"
            value={shippingInfo.lastName}
            onChange={handleInputChange}
            required
          />
        </div>
        <Input
          type="text"
          placeholder="City"
          name="city"
          value={shippingInfo.city}
          onChange={handleInputChange}
          required
        />
        <Input
          type="text"
          placeholder="Address"
          name="address"
          value={shippingInfo.address}
          onChange={handleInputChange}
          required
        />
        <div className="flex flex-col">
          <div className="flex items-center bg-input rounded-md">
            <label className="px-4 text-sm">+88</label>
            <Input
              className="rounded-r-md"
              type="text"
              placeholder="Phone (We will verify the number)"
              name="phoneNo"
              value={shippingInfo.phoneNo}
              onChange={handleInputChange}
              required
            />
          </div>
          {phoneError && (
            <p className="text-red-500 text-sm mt-1">{phoneError}</p>
          )}
        </div>
      </div>
      <h2 className="text-xl mt-6 mb-2">Shipping Location</h2>
      <div className="p-6 bg-slate-100 rounded-md border">
        <RadioGroup
          defaultValue="option-two"
          onValueChange={handleShippingChange}
        >
          <div className="flex justify-between">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="option-one" id="option-one" />
              <Label className="text-slate-600 text-sm" htmlFor="option-one">
                Inside Dhaka
              </Label>
            </div>
            <p className="text-sm text-slate-600">৳80</p>
          </div>
          <div className="flex justify-between">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="option-two" id="option-two" />
              <Label className="text-slate-600 text-sm" htmlFor="option-two">
                Outside Dhaka
              </Label>
            </div>
            <p className="text-sm text-slate-600">৳140</p>
          </div>
        </RadioGroup>
      </div>
      <h1 className="text-2xl font-semibold text-slate-800 mb-4 mt-10">
        Payment
      </h1>
      <div className="border rounded-md border-slate-200">
        <div className="px-6 py-4 bg-slate-100 rounded-md border-md">
          <Label>Cash On Delivery</Label>
        </div>
        <p className="p-6">
          You have to pay <b>৳{total.toFixed(0)}</b> taka
        </p>
      </div>
    </div>
  );
};

export default ShippingForm;
