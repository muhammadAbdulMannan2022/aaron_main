import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookie from "js-cookie";
import { baseUrl } from "../auth/auth";

const rawBaseQuery = fetchBaseQuery({
  baseUrl,
  prepareHeaders: (headers) => {
    const token = Cookie.get("access");
    if (token) headers.set("Authorization", `Bearer ${token}`);
    headers.set("ngrok-skip-browser-warning", "true");
    return headers;
  },
});

const baseQueryWithAuthCheck = async (args, api, extraOptions) => {
  const result = await rawBaseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    Cookie.remove("access");
    window.location.href = "/auth/login";
  }
  return result;
};

export const dashboard = createApi({
  reducerPath: "dashboard",
  baseQuery: baseQueryWithAuthCheck,
  endpoints: (builder) => ({
    getKpiList: builder.query({
      query: () => "/api/project/kpi-list/",
    }),
    getIdealPath: builder.query({
      query: (id) => `/api/project/ideal-path/${id}/`,
    }),
    getOrginalPath: builder.query({
      query: (id) => `/api/project/actual-path-data-with-connections/${id}/`,
    }),
  }),
});

export const {
  useGetKpiListQuery,
  useGetIdealPathQuery,
  useGetOrginalPathQuery,
} = dashboard;
