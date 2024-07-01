import { createSlice } from "@reduxjs/toolkit";
import CryptoJS from "crypto-js";

// Encryption and decryption functions
const encryptData = (data) => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), "secret_key").toString();
};

const decryptData = (encryptedData) => {
  const bytes = CryptoJS.AES.decrypt(encryptedData, "secret_key");
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};

// Load initial state with decryption
const loadInitialState = () => {
  if (typeof window !== "undefined") {
    const encryptedCartItems = localStorage.getItem("cart");
    if (encryptedCartItems) {
      return decryptData(encryptedCartItems);
    }
  }
  return [];
};

// Initial state with encryption
const initialState = {
  items: loadInitialState(),
  coupon: null,
  discount: 0,
  alertMessage: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItemIndex = state.items.findIndex(
        (item) =>
          item._id === action.payload._id &&
          item.variant._id === action.payload.variant._id
      );

      if (existingItemIndex >= 0) {
        state.items[existingItemIndex].quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }

      localStorage.setItem("cart", encryptData(state.items));
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(
        (item) => item.variant._id !== action.payload.variantId
      );

      localStorage.setItem("cart", encryptData(state.items));
    },
    clearCart: (state) => {
      state.items = [];
      state.coupon = null;
      state.discount = 0;
      state.alertMessage = null;
      localStorage.removeItem("cart");
      localStorage.removeItem("appliedVoucher");
    },
    updateCartItemQuantity: (state, action) => {
      const { _id, variantId, quantity } = action.payload;
      const item = state.items.find(
        (item) => item._id === _id && item.variant._id === variantId
      );
      if (item) {
        item.quantity = quantity;
        localStorage.setItem("cart", encryptData(state.items));
      }
    },
    applyDiscount: (state, action) => {
      state.discount = action.payload;
    },
    removeDiscount: (state) => {
      state.discount = 0;
      localStorage.removeItem("appliedVoucher");
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
  updateCartItemQuantity,
  applyDiscount,
  removeDiscount,
} = cartSlice.actions;

export default cartSlice.reducer;
