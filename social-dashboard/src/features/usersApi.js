import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({
    baseUrl:
      "https://raw.githubusercontent.com/MahmoudKhalid22/Kartech-internship/main/social-dashboard/data/",
  }),
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: () => "users.json",
    }),
  }),
});

// console.log(usersApi);
// export default usersApi;

export const { useGetAllProductsQuery } = usersApi;
