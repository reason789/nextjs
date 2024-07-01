import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import CryptoJS from "crypto-js";

// Encryption and decryption functions
const encryptData = (data) => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), "secret_key").toString();
};

const decryptData = (encryptedData) => {
  const bytes = CryptoJS.AES.decrypt(encryptedData, "secret_key");
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};

// Async Thunks
export const fetchAvailableVouchers = createAsyncThunk(
  "voucher/fetchAvailableVouchers",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("https://api.foodvela.com/api/v1/avialable-vouchers");
      return data.vouchers;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const applyVoucher = createAsyncThunk(
  "voucher/applyVoucher",
  async (code, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("https://api.foodvela.com/api/v1/apply-voucher", { code });
      return data.voucher;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Initial state and localStorage handling
const loadInitialVoucherState = () => {
  if (typeof window !== "undefined") {
    const encryptedAppliedVoucher = localStorage.getItem("appliedVoucher");
    if (encryptedAppliedVoucher) {
      return decryptData(encryptedAppliedVoucher);
    }
  }
  return null;
};

// Voucher Slice
const initialState = {
  vouchers: [],
  appliedVoucher: loadInitialVoucherState(),
  loading: false,
  error: null,
  alertMessage: null,
};

const voucherSlice = createSlice({
  name: "voucher",
  initialState,
  reducers: {
    clearAlertMessage: (state) => {
      state.alertMessage = null;
    },
    removeVoucher: (state) => {
      state.appliedVoucher = null;
      state.alertMessage = { type: "info", text: "Promo code removed" };
      localStorage.removeItem("appliedVoucher");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAvailableVouchers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAvailableVouchers.fulfilled, (state, action) => {
        state.loading = false;
        state.vouchers = action.payload;
      })
      .addCase(fetchAvailableVouchers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(applyVoucher.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(applyVoucher.fulfilled, (state, action) => {
        state.loading = false;
        state.appliedVoucher = action.payload;
        state.alertMessage = { type: "success", text: "Promo code applied successfully" };
        localStorage.setItem("appliedVoucher", encryptData(action.payload));
      })
      .addCase(applyVoucher.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.alertMessage = { type: "error", text: action.payload };
      });
  },
});

export const { clearAlertMessage, removeVoucher } = voucherSlice.actions;

export default voucherSlice.reducer;
