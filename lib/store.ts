import { configureStore } from '@reduxjs/toolkit'
// import { persistStore, persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';
// import { encryptTransform } from 'redux-persist-transform-encrypt';
import counterReducer from "@/lib/features/counter/counterSlice";
import productsReducer from '@/lib/features/products/productsSlice';
import cartReducer from '@/lib/features/cart/cartSlice';
import productDetailsReducer from '@/lib/features/productDetails/productDetailsSlice';
import relatedProductsReducer from '@/lib/features/relatedProducts/relatedProductsSlice';
import voucherReducer  from '@/lib/features/voucher/voucherSlice'
import orderReducer  from '@/lib/features/order/orderSlice'

// const persistConfig = {
//   key: 'root',
//   storage,
//   transforms: [
//     encryptTransform({
//       secretKey: 'mySecretKey',
//       onError: function(error){
//         console.error('Encryption Error:', error);
//       }
//     })
//   ]
// };

// const persistedReducer = persistReducer(persistConfig, counterReducer);

export const makeStore = () => {
  return configureStore({
    reducer: {
      counter: counterReducer,
      products : productsReducer,
      cart: cartReducer,
      productDetails: productDetailsReducer,
      relatedProducts: relatedProductsReducer,
      voucher: voucherReducer,
      order: orderReducer
    },
    // middleware: (getDefaultMiddleware) =>
    //   getDefaultMiddleware({
    //     serializableCheck: false,
    //   }),
  })
}


// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

// export const persistor = persistStore(makeStore());