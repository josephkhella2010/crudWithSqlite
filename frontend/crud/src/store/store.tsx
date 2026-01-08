import { configureStore } from "@reduxjs/toolkit";
import InputSliceReducer from "./Slices/InputSlice";

// Create Store
const store = configureStore({
  reducer: {
    InputeData: InputSliceReducer,
  },
});

// Run Saga
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
