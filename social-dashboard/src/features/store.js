import { configureStore } from "@reduxjs/toolkit";

import accountReducer from "./accountSlice";
import { usersApi } from "./usersApi";

export default configureStore({
  reducer: {
    account: accountReducer,
    [usersApi.reducerPath]: usersApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(usersApi.middleware);
  },
});
