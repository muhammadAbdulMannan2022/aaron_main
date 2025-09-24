import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./auth/auth";
import { api } from "./api/api";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, api.middleware),
});
