// src/lib/features/products/productsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import getProducts from './productsAPI';


// Async thunks for CRUD operations
export const fetchProducts = createAsyncThunk('products/fetchProducts', async ( filters) => {
    const products = await getProducts(filters.category, filters.subCategory, filters.search)
    return products
});


const productsSlice = createSlice({
    name: 'products',
    initialState:{
        products: {},
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers:(builder) => {
        builder
        .addCase(fetchProducts.pending, (state) => {
            state.status = 'loading'
        })
        .addCase(fetchProducts.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.products = action.payload;
            
        })
        .addCase(fetchProducts.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.error.message;
        })
    }
})


export default productsSlice.reducer;