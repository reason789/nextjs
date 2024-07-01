import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import getRelatedProducts from './relatedProductsAPI';


// Async thunks for CRUD operations
export const fetchRelatedProducts = createAsyncThunk('product/fetchRelatedProducts', async ( id) => {
    const products = await getRelatedProducts(id)
    return products
});


const productsSlice = createSlice({
    name: 'product',
    initialState:{
        products: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers:(builder) => {
        builder
        .addCase(fetchRelatedProducts.pending, (state) => {
            state.status = 'loading'
        })
        .addCase(fetchRelatedProducts.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.products = action.payload;
            
        })
        .addCase(fetchRelatedProducts.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.error.message;
        })
    }
})


export default productsSlice.reducer;