import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const baseUrl = "https://key-humpback-scarcely.ngrok-free.app";
export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://key-humpback-scarcely.ngrok-free.app",
    headers: {
      "ngrok-skip-browser-warning": "true",
    },
  }),
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (data) => ({
        url: "/api/accounts/normal_register/",
        method: "POST",
        body: data,
      }),
    }),
    verifyOtp: builder.mutation({
      query: (data) => ({
        url: "/api/accounts/varify_otp/",
        method: "POST",
        body: data,
      }),
    }),
    login: builder.mutation({
      query: (data) => ({
        url: "/api/accounts/login/",
        method: "POST",
        body: data,
      }),
    }),
    socialLogin: builder.mutation({
      query: (email) => ({
        url: `/api/accounts/social_login_register/`,
        method: "POST",
        body: { email },
      }),
    }),
    resendOtp: builder.mutation({
      query: (data) => ({
        url: "/api/accounts/resend_otp/",
        method: "POST",
        body: data,
      }),
    }),
    forgotPassword: builder.mutation({
      query: (data) => ({
        url: "/api/accounts/forgot_password/",
        method: "POST",
        body: data,
      }),
    }),
    changePassword: builder.mutation({
      query: (data) => ({
        url: "/api/accounts/forgot_password_change/",
        method: "POST",
        body: data,
      }),
    }),
    verifyForgotOtp: builder.mutation({
      query: (data) => ({
        url: "/api/accounts/forgot_password_verify_otp/",
        method: "POST",
        body: data,
      }),
    }),
    // landing page
    getLogos: builder.query({
      query: () => "/api/landing_page/company_logo/",
    }),
    getTestimonial: builder.query({
      query: () => "/api/landing_page/testimonial/",
    }),
    getFaq: builder.query({
      query: () => "/api/landing_page/faq/",
    }),
    // bot
    getBotResponse: builder.mutation({
      query: (data) => ({
        url: "/api/landing_page/chatbot/",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useSignupMutation,
  useVerifyOtpMutation,
  useLoginMutation,
  useSocialLoginMutation,
  useResendOtpMutation,
  useForgotPasswordMutation,
  useChangePasswordMutation,
  useVerifyForgotOtpMutation,
  useGetFaqQuery,
  useGetTestimonialQuery,
  useGetLogosQuery,
  useGetBotResponseMutation,
} = authApi;
