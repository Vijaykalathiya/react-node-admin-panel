import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
  reducerPath: "adminApi",
  tagTypes: [
    "User",
    "Products",
    "Customers",
    "Transactions",
    "Geography",
    "OverallStat",
    "Admin",
    "Performance",
    "Dashboard"
  ],
  endpoints: (build) => ({
    getUser: build.query({
      query: (id) => `general/user/${id}`,
      providesTags: ["User"],
    }),
    getProducts: build.query({
      query: () => `client/products`,
      providesTags: ["Products"],
    }),
    getCustomers: build.query({
      query: () => `client/customers`,
      providesTags: ["Customers"],
    }),
    getTransactions: build.query({
      query: ({ search, sort, page, pageSize }) => ({
        url: `client/transactions`,
        method: "GET",
        params: { search, sort, page, pageSize },
      }),
      providesTags: ["Transactions"],
    }),
    getGrography: build.query({
      query: () => `client/geography`,
      providesTags: ["Geography"],
    }),
    getOverallStat: build.query({
      query: () => `sales/stat`,
      providesTags: ["OverallStat"],
    }),
    getAdmin: build.query({
      query: () => `management/admins`,
      providesTags: ["Admin"],
    }),
    getUserPerformance: build.query({
      query: (id) => `management/performance/${id}`,
      providesTags: ["Performance"],
    }),
    getDashboard: build.query({
      query: () => `general/dashboard`,
      providesTags: ["Dashboard"],
    })
  }),
});

export const {
  useGetUserQuery,
  useGetProductsQuery,
  useGetCustomersQuery,
  useGetTransactionsQuery,
  useGetGrographyQuery,
  useGetOverallStatQuery,
  useGetAdminQuery,
  useGetUserPerformanceQuery,
  useGetDashboardQuery
} = api;
