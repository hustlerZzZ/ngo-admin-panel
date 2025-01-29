import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice.ts";
import authReducer from "./features/auth/authSlice.ts";
import { userApi } from "./features/user/userApiSlice.ts";
import { blogApi } from "./features/blogs/blogApiSlice.ts";
import { contactApi } from "./features/contact-forms/contactApiSlice.ts";
import { volunteerApi } from "./features/volunteer-forms/volunteerApiSlice.ts";

export const store = configureStore({
  reducer: {
    user: userReducer,
    auth: authReducer,
    [userApi.reducerPath]: userApi.reducer,
    [blogApi.reducerPath]: blogApi.reducer,
    [contactApi.reducerPath]: contactApi.reducer,
    [volunteerApi.reducerPath]: volunteerApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(userApi.middleware)
      .concat(blogApi.middleware)
      .concat(contactApi.middleware)
      .concat(volunteerApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
