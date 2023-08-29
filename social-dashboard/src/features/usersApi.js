import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/",
  }),
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: () => "users",
    }),
  }),
});

// console.log(usersApi);
// export default usersApi;

export const { useGetAllProductsQuery } = usersApi;
