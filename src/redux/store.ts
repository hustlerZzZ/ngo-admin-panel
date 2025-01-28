import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice.ts";
import authReducer from "./features/auth/authSlice.ts";
import { userApi } from "./features/user/userApiSlice.ts";

export const store = configureStore({
  reducer: {
    user: userReducer,
    auth: authReducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
