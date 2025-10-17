import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./auth/auth";
import { api } from "./api/api";
import { dashboard } from "./api/dashboard";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [api.reducerPath]: api.reducer,
    [dashboard.reducerPath]: dashboard.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      api.middleware,
      dashboard.middleware
    ),
});
