import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({
    baseUrl:
      "https://raw.githubusercontent.com/MahmoudKhalid22/Kartech-internship/main/ecommerce/data/",
  }),
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: () => "products.json",
    }),
  }),
});

export const { useGetAllProductsQuery } = productsApi;
