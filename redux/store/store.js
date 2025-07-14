import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../userSlice'; // Correct the path to your userSlice file
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Using local storage for persistence

// Configuring redux-persist
const persistConfig = {
  key: 'root',
  storage,
};

// Persisted reducer to store user data
const persistedReducer = persistReducer(persistConfig, userReducer);

// Configuring the store
export const store = configureStore({
  reducer: {
    user: persistedReducer, // The user reducer will be persisted
  },
});

// Persistor for storing the Redux store in localStorage
export const persistor = persistStore(store);
