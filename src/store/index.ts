import { configureStore } from '@reduxjs/toolkit';
import garageReducer from './garageSlice';

export const store = configureStore({
  reducer: {
    garage: garageReducer,
  },
});

// ✅ Export the types so other files can import them
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
