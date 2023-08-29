import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const productsFetch = createAsyncThunk("users/usersFetch", async () => {
  const response = await fetch("http://localhost:5000/users");
  return await response.json();
});

export const accountSlice = createSlice({
  name: "accounts",
  initialState: {
    user: localStorage.getItem("account")
      ? JSON.parse(localStorage.getItem("account"))
      : {
          id: 1,
          name: "Alice",
          age: 28,
          followers: 1500,
          posts: [
            {
              id: 101,
              content: "Hello from Alice!",
              likes: 50,
              comments: 10,
              shares: 5,
              dateTime: "2023-08-27T10:00:00Z",
            },
            {
              id: 102,
              content: "A new day has begun.",
              likes: 30,
              comments: 8,
              shares: 3,
              dateTime: "2023-08-27T14:30:00Z",
            },
          ],
        },
  },
  reducers: {
    switchUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("account", JSON.stringify(action.payload));
    },
    publishPost(state, action) {
      state.posts.push(action.payload);
    },
  },
  extraReducers: {
    [productsFetch.pending]: (state, action) => {
      state.status = "pending";
    },
    [productsFetch.fulfilled]: (state, action) => {
      state.status = "success";
      state.items = action.payload;
    },
    [productsFetch.rejected]: (state, action) => {
      state.status = "rejected";
    },
  },
});

export const { switchUser, publishPost } = accountSlice.actions;
export default accountSlice.reducer;
