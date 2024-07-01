// // import { createSlice } from "@reduxjs/toolkit";

// // const loadInitialState = () => {
// //   if (typeof window !== "undefined") {
// //     const cartItems = localStorage.getItem("cart");
// //     return cartItems ? JSON.parse(cartItems) : [];
// //   }
// //   return [];
// // };

// // const initialState = {
// //   items: loadInitialState || [],
// //   coupon: null,
// //   discount: 0,
// //   alertMessage: null,
// // };

// // const cartSlice = createSlice({
// //   name: "cart",
// //   initialState,
// //   reducers: {
// //     addToCart: (state, action) => {
// //       const existingItemIndex = state.items.findIndex(
// //         (item) =>
// //           item._id === action.payload._id &&
// //           item.variant._id === action.payload.variant._id
// //       );

// //       if (existingItemIndex >= 0) {
// //         state.items[existingItemIndex].quantity += action.payload.quantity;
// //       } else {
// //         state.items.push(action.payload);
// //       }

// //       localStorage.setItem("cart", JSON.stringify(state.items));
// //     },
// //     removeFromCart: (state, action) => {
// //       state.items = state.items.filter(
// //         (item) => item.variant._id !== action.payload.variantId
// //       );

// //       localStorage.setItem("cart", JSON.stringify(state.items));
// //     },
// //     clearCart: (state) => {
// //       state.items = [];
// //       state.coupon = null;
// //       state.discount = 0;
// //       state.alertMessage = null;
// //       localStorage.removeItem("cart");
// //       localStorage.removeItem("appliedVoucher");
// //     },
// //     updateCartItemQuantity: (state, action) => {
// //       const { _id, variantId, quantity } = action.payload;
// //       const item = state.items.find(
// //         (item) => item._id === _id && item.variant._id === variantId
// //       );
// //       if (item) {
// //         item.quantity = quantity;
// //         localStorage.setItem("cart", JSON.stringify(state.items));
// //       }
// //     },
// //     applyDiscount: (state, action) => {
// //       state.discount = action.payload;
// //     },
// //     removeDiscount: (state) => {
// //       state.discount = 0;
// //       localStorage.removeItem("appliedVoucher");
// //     },
// //   },
// // });

// // export const {
// //   addToCart,
// //   removeFromCart,
// //   clearCart,
// //   updateCartItemQuantity,
// //   applyDiscount,
// //   removeDiscount
  
// // } = cartSlice.actions;

// // export default cartSlice.reducer;
































// // src/lib/features/voucher/voucherSlice.js

// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";


// // Async Thunks
// export const fetchAvailableVouchers = createAsyncThunk(
//   "voucher/fetchAvailableVouchers",
//   async (_, { rejectWithValue }) => {
//     try {
//       const { data } = await axios.get("http://localhost:4000/api/v1/avialable-vouchers");
//       return data.vouchers;
//     } catch (error) {
//       return rejectWithValue(error.response.data.message);
//     }
//   }
// );

// export const applyVoucher = createAsyncThunk(
//   "voucher/applyVoucher",
//   async (code, { rejectWithValue }) => {
//     try {
//       const { data } = await axios.post("http://localhost:4000/api/v1/apply-voucher", { code });
//       return data.voucher;
//     } catch (error) {
//       return rejectWithValue(error.response.data.message);
//     }
//   }
// );

// // Voucher Slice
// const voucherSlice = createSlice({
//   name: "voucher",
//   initialState: {
//     vouchers: [],
//     // appliedVoucher: null,
//     appliedVoucher: JSON.parse(localStorage.getItem("appliedVoucher")) || null,
//     loading: false,
//     error: null,
//     alertMessage: null,
//   },
//   reducers: {
//     clearAlertMessage: (state) => {
//       state.alertMessage = null;
//     },
//     removeVoucher: (state) => {
//         state.appliedVoucher = null;
//         state.alertMessage = { type: "info", text: "Promo code removed" };
//       },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchAvailableVouchers.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchAvailableVouchers.fulfilled, (state, action) => {
//         state.loading = false;
//         state.vouchers = action.payload;
//       })
//       .addCase(fetchAvailableVouchers.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       .addCase(applyVoucher.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(applyVoucher.fulfilled, (state, action) => {
//         state.loading = false;
//         state.appliedVoucher = action.payload;
//         state.alertMessage = { type: "success", text: "Promo code applied successfully" };
//         localStorage.setItem("appliedVoucher", JSON.stringify(action.payload));
//       })
//       .addCase(applyVoucher.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//         state.alertMessage = { type: "error", text: action.payload };
//       });
//   },
// });

// export const { clearAlertMessage, removeVoucher  } = voucherSlice.actions;

// export default voucherSlice.reducer;
