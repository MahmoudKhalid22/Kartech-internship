import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";

export const productsFetch = createAsyncThunk("users/usersFetch", async () => {
  const response = await fetch(
    "https://raw.githubusercontent.com/MahmoudKhalid22/Kartech-internship/main/social-dashboard/data/users.json"
  );
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
          avatar: "../assets/one.webp",
          cover: "../assets/cover/ten.jpg",
          posts: localStorage.getItem("posts")
            ? JSON.parse(localStorage.getItem("posts"))
            : [
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
    publishPost: (state, action) => {
      state.user.posts.push(action.payload);
      let s = current(state);
      console.log(s.user.posts);
      localStorage.setItem("posts", JSON.stringify({ ...state }));
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
