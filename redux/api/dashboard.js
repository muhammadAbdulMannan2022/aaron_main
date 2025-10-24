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
    // kpi
    getProcessVarient: builder.query({
      query: (id) => `/api/project/process-variants/${id}/`,
    }),
    getKpiList: builder.query({
      query: () => "/api/project/kpi-list/",
    }),
    getIdealPath: builder.query({
      query: (id) => `/api/project/ideal-path/${id}/`,
    }),
    getOrginalPath: builder.query({
      query: (id) => `/api/project/actual-path-data-with-connections/${id}/`,
    }),
    // dashboard
    getDashboards: builder.query({
      query: () => "/api/project/dashboard/",
      providesTags: ["Dashboard"],
    }),
    getOneDashboard: builder.query({
      query: (id) => `/api/project/dashboard/${id}/`,
      invalidatesTags: ["Dashboard"],
    }),
    createNewDashboard: builder.mutation({
      query: (data) => ({
        url: "/api/project/dashboard/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Dashboard"],
    }),
    updateDashboard: builder.mutation({
      query: (data) => ({
        url: `/api/project/dashboard/${data.projectId}/${data.dashboardId}/`,
        method: "PATCH",
        body: { data: data.data },
      }),
      invalidatesTags: ["Dashboard"],
    }),
    // KPIs
    getAbailableKpis: builder.query({
      query: () => "/api/project/kpi-list/",
    }),
    // list of 27
    getCycleTime: builder.query({
      query: (data) => {
        const {
          projectId,
          startTime,
          endTime,
          variants = [],
          minCycleTime,
          maxCycleTime,
        } = data;

        // build variants query like variants=1&variants=2...
        const variantsQuery = variants.length
          ? variants.map((v) => `variants=${v}`).join("&")
          : "variants=";

        return `/api/project/cycle-time/${projectId}/?start_date=${
          startTime || ""
        }&end_date=${endTime || ""}&${variantsQuery}&min_cycle_time=${
          minCycleTime || ""
        }&max_cycle_time=${maxCycleTime || ""}`;
      },
    }),
  }),
});

export const {
  useGetProcessVarientQuery,
  useGetKpiListQuery,
  useGetIdealPathQuery,
  useGetOrginalPathQuery,
  // dashboard
  useGetDashboardsQuery,
  useGetOneDashboardQuery,
  useCreateNewDashboardMutation,
  useUpdateDashboardMutation,
  // KPIs
  useGetAbailableKpisQuery,
  useLazyGetCycleTimeQuery,
} = dashboard;
