import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"; // 👈 notice /react
import Cookie from "js-cookie";
import { baseUrl } from "../auth/auth";

const baseQueryWithAuthCheck = async (args, api, extraOptions) => {
  const rawBaseQuery = fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      const token = Cookie.get("access_token");
      console.log(token);
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  });

  const result = await rawBaseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    Cookie.remove("access_token");
    window.location.href = "/auth/login"; // works outside React
  }

  return result;
};

export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithAuthCheck,
  tagTypes: ["Profile"], // 👈 recommended
  endpoints: (builder) => ({
    getProfileData: builder.query({
      query: () => "/api/accounts/profile/",
      providesTags: ["Profile"],
    }),
    updateProfile: builder.mutation({
      query: (data) => ({
        url: "/api/accounts/profile/",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Profile"],
    }),
  }),
});

// 👇 these are auto-generated hooks
export const { useGetProfileDataQuery, useUpdateProfileMutation } = api;
