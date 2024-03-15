import { configureStore, combineReducers } from '@reduxjs/toolkit'
import cartReducer from './cartSlice'
import authReducer from './auth'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'


let rootReducer = combineReducers({
    cart: cartReducer,
    auth: authReducer
})

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart', 'auth']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      serializableCheck: false
    })
})

export const persistor = persistStore(store)