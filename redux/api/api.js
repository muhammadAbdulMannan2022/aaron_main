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
    // all about project
    // department
    getDepartments: builder.query({
      query: () => "/api/project/departments/",
      providesTags: ["Depertments"],
    }),
    addDepertment: builder.mutation({
      query: (data) => ({
        url: "/api/project/departments/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Depertments"],
    }),
    updateDepertment: builder.mutation({
      query: (data) => ({
        url: `/api/project/departments/${data.id}/`,
        method: "PATCH",
        body: { name: data.name, description: data.description },
      }),
      invalidatesTags: ["Depertments"],
    }),
    deleteDepertment: builder.mutation({
      query: (data) => ({
        url: `/api/project/departments/${data.id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Depertments"],
    }),
    // team
    getTeams: builder.query({
      query: () => "/api/project/teams/",
      providesTags: ["Team"],
    }),
    addTeam: builder.mutation({
      query: (data) => ({
        url: "/api/project/teams/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Team"],
    }),
    updateTeam: builder.mutation({
      query: (data) => ({
        url: `/api/project/teams/${data.id}/`,
        method: "PATCH",
        body: { name: data.name, description: data.description },
      }),
      invalidatesTags: ["Team"],
    }),
    deleteTeam: builder.mutation({
      query: (data) => ({
        url: `/api/project/teams/${data.id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Team"],
    }),
    // project
    getAllProjects: builder.query({
      query: () => "/api/project/projects/",
      providesTags: ["Projects"],
    }),
    submitProjectData: builder.mutation({
      query: (data) => ({
        url: "/api/project/projects/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Projects"],
    }),
    getColl: builder.query({
      query: (id) => `/api/project/columns/${id}/`,
    }),
    steColName: builder.mutation({
      query: (data) => ({
        url: "/api/project/define-columns/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Projects"],
    }),
    deleteProject: builder.mutation({
      query: (id) => ({
        url: `/api/project/projects/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Projects"],
    }),
  }),
});
// 👇 these are auto-generated hooks
export const {
  useGetProfileDataQuery,
  useUpdateProfileMutation,
  //   department
  useGetDepartmentsQuery,
  useAddDepertmentMutation,
  useUpdateDepertmentMutation,
  useDeleteDepertmentMutation,
  //   team
  useGetTeamsQuery,
  useAddTeamMutation,
  useUpdateTeamMutation,
  useDeleteTeamMutation,
  // upload file
  useGetAllProjectsQuery,
  useSubmitProjectDataMutation,
  useGetCollQuery,
  useSteColNameMutation,
  useDeleteProjectMutation,
} = api;
