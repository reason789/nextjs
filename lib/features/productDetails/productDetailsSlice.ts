// src/lib/features/products/productsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import getProductDetails from './productDetailsAPI';


// Async thunks for CRUD operations
export const fetchProductDetails = createAsyncThunk('product/fetchProductDetails', async ( id) => {
    const products = await getProductDetails(id)
    return products
});


const productsSlice = createSlice({
    name: 'product',
    initialState:{
        product: {},
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers:(builder) => {
        builder
        .addCase(fetchProductDetails.pending, (state) => {
            state.status = 'loading'
        })
        .addCase(fetchProductDetails.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.product = action.payload;
            
        })
        .addCase(fetchProductDetails.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.error.message;
        })
    }
})


export default productsSlice.reducer;