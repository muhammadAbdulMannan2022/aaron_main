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
    averageVmedianCycleTime: builder.query({
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

        return `/api/project/average-vs-median-by-time/${projectId}/?start_date=${
          startTime || ""
        }&end_date=${endTime || ""}&${variantsQuery}&min_cycle_time=${
          minCycleTime || ""
        }&max_cycle_time=${maxCycleTime || ""}`;
      },
    }),
    totalCaseCount: builder.query({
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

        return `/api/project/total-case-count/${projectId}/?start_date=${
          startTime || ""
        }&end_date=${endTime || ""}&${variantsQuery}&min_cycle_time=${
          minCycleTime || ""
        }&max_cycle_time=${maxCycleTime || ""}`;
      },
    }),
    loopsAndRatio: builder.query({
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

        return `/api/project/total-loops-&-ratio/${projectId}/?start_date=${
          startTime || ""
        }&end_date=${endTime || ""}&${variantsQuery}&min_cycle_time=${
          minCycleTime || ""
        }&max_cycle_time=${maxCycleTime || ""}`;
      },
    }),
    bottlenecksAndRatio: builder.query({
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

        return `/api/project/total-bottleneck-&-ratio/${projectId}/?start_date=${
          startTime || ""
        }&end_date=${endTime || ""}&${variantsQuery}&min_cycle_time=${
          minCycleTime || ""
        }&max_cycle_time=${maxCycleTime || ""}`;
      },
    }),
    calculateStepAndCases: builder.query({
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

        return `/api/project/calculate-step-and-cases/${projectId}/?start_date=${
          startTime || ""
        }&end_date=${endTime || ""}&${variantsQuery}&min_cycle_time=${
          minCycleTime || ""
        }&max_cycle_time=${maxCycleTime || ""}`;
      },
    }),
    dropoutAndRatio: builder.query({
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

        return `/api/project/dropout-rate/${projectId}/?start_date=${
          startTime || ""
        }&end_date=${endTime || ""}&${variantsQuery}&min_cycle_time=${
          minCycleTime || ""
        }&max_cycle_time=${maxCycleTime || ""}`;
      },
    }),
    avarageActivityTime: builder.query({
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

        return `/api/project/average-activity-time/${projectId}/?start_date=${
          startTime || ""
        }&end_date=${endTime || ""}&${variantsQuery}&min_cycle_time=${
          minCycleTime || ""
        }&max_cycle_time=${maxCycleTime || ""}`;
      },
    }),
    firstPassRate: builder.query({
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

        return `/api/project/first-pass-rate/${projectId}/?start_date=${
          startTime || ""
        }&end_date=${endTime || ""}&${variantsQuery}&min_cycle_time=${
          minCycleTime || ""
        }&max_cycle_time=${maxCycleTime || ""}`;
      },
    }),
    longestWaitingTime: builder.query({
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

        return `/api/project/longest-waiting-time/${projectId}/?start_date=${
          startTime || ""
        }&end_date=${endTime || ""}&${variantsQuery}&min_cycle_time=${
          minCycleTime || ""
        }&max_cycle_time=${maxCycleTime || ""}`;
      },
    }),
    variantComplexity: builder.query({
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

        return `/api/project/variant-complexity-index/${projectId}/?start_date=${
          startTime || ""
        }&end_date=${endTime || ""}&${variantsQuery}&min_cycle_time=${
          minCycleTime || ""
        }&max_cycle_time=${maxCycleTime || ""}`;
      },
    }),
    variantChangeOverTime: builder.query({
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

        return `/api/project/variant-change-over-time/${projectId}/?start_date=${
          startTime || ""
        }&end_date=${endTime || ""}&${variantsQuery}&min_cycle_time=${
          minCycleTime || ""
        }&max_cycle_time=${maxCycleTime || ""}`;
      },
    }),
    casesFollowingTopVariant: builder.query({
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

        return `/api/project/cases-following-top-variant/${projectId}/?start_date=${
          startTime || ""
        }&end_date=${endTime || ""}&${variantsQuery}&min_cycle_time=${
          minCycleTime || ""
        }&max_cycle_time=${maxCycleTime || ""}`;
      },
    }),
    maxStepInACase: builder.query({
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

        return `/api/project/max-steps-in-a-case/${projectId}/?start_date=${
          startTime || ""
        }&end_date=${endTime || ""}&${variantsQuery}&min_cycle_time=${
          minCycleTime || ""
        }&max_cycle_time=${maxCycleTime || ""}`;
      },
    }),
    timeSavedPotential: builder.query({
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

        return `/api/project/time-saved-potential/${projectId}/?start_date=${
          startTime || ""
        }&end_date=${endTime || ""}&${variantsQuery}&min_cycle_time=${
          minCycleTime || ""
        }&max_cycle_time=${maxCycleTime || ""}`;
      },
    }),
    activityFrequencyDistribution: builder.query({
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

        return `/api/project/activity-frequency-distribution/${projectId}/?start_date=${
          startTime || ""
        }&end_date=${endTime || ""}&${variantsQuery}&min_cycle_time=${
          minCycleTime || ""
        }&max_cycle_time=${maxCycleTime || ""}`;
      },
    }),
    happyPathCompliance: builder.query({
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

        return `/api/project/happy-path-compliance/${projectId}/?start_date=${
          startTime || ""
        }&end_date=${endTime || ""}&${variantsQuery}&min_cycle_time=${
          minCycleTime || ""
        }&max_cycle_time=${maxCycleTime || ""}`;
      },
    }),

    totalCompletedCase: builder.query({
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

        return `/api/project/total-completed-cases/${projectId}/?start_date=${
          startTime || ""
        }&end_date=${endTime || ""}&${variantsQuery}&min_cycle_time=${
          minCycleTime || ""
        }&max_cycle_time=${maxCycleTime || ""}`;
      },
    }),
    happyPathDeviation: builder.query({
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

        return `/api/project/happy-path-deviation/${projectId}/?start_date=${
          startTime || ""
        }&end_date=${endTime || ""}&${variantsQuery}&min_cycle_time=${
          minCycleTime || ""
        }&max_cycle_time=${maxCycleTime || ""}`;
      },
    }),
    skippedStepsRate: builder.query({
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

        return `/api/project/skipped-steps-rate/${projectId}/?start_date=${
          startTime || ""
        }&end_date=${endTime || ""}&${variantsQuery}&min_cycle_time=${
          minCycleTime || ""
        }&max_cycle_time=${maxCycleTime || ""}`;
      },
    }),
    caseThroughPutRate: builder.query({
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

        return `/api/project/case-throughput-rate/${projectId}/?start_date=${
          startTime || ""
        }&end_date=${endTime || ""}&${variantsQuery}&min_cycle_time=${
          minCycleTime || ""
        }&max_cycle_time=${maxCycleTime || ""}`;
      },
    }),
    idleTimeAndRatio: builder.query({
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

        return `/api/project/total-idle-time-&-ratio/${projectId}/?start_date=${
          startTime || ""
        }&end_date=${endTime || ""}&${variantsQuery}&min_cycle_time=${
          minCycleTime || ""
        }&max_cycle_time=${maxCycleTime || ""}`;
      },
    }),
    costPerCase: builder.query({
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

        return `/api/project/cost-per-process/${projectId}/?start_date=${
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
  useLazyAverageVmedianCycleTimeQuery,
  useLazyTotalCaseCountQuery,
  useLazyLoopsAndRatioQuery,
  useLazyBottlenecksAndRatioQuery,
  useLazyCalculateStepAndCasesQuery,
  useLazyDropoutAndRatioQuery,
  useLazyAvarageActivityTimeQuery,
  useLazyFirstPassRateQuery,
  useLazyLongestWaitingTimeQuery,
  useLazyVariantComplexityQuery,
  useLazyVariantChangeOverTimeQuery,
  useLazyCasesFollowingTopVariantQuery,
  useLazyMaxStepInACaseQuery,
  useLazyTimeSavedPotentialQuery,
  useLazyActivityFrequencyDistributionQuery,
  useLazyHappyPathComplianceQuery,
  useLazyTotalCompletedCaseQuery,
  useLazyHappyPathDeviationQuery,
  useLazySkippedStepsRateQuery,
  useLazyCaseThroughPutRateQuery,
  useLazyIdleTimeAndRatioQuery,
  useLazyCostPerCaseQuery,
} = dashboard;
