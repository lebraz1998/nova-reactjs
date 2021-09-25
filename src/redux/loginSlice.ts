import { createSlice } from "@reduxjs/toolkit";
const data = { username: "" };
const log = sessionStorage.getItem("login");

if (log) {
  data.username = log;
}

console.log(log);
export const loginSlice = createSlice({
  name: "login",
  initialState: {
    username: data.username,
  },
  reducers: {
    setLogin: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.username = action.payload.username;
    },
    deleteLogin: (state) => {
      state.username = "a";
    },
  },
});

// Action creators are generated for each case reducer function
export const { setLogin, deleteLogin } = loginSlice.actions;

export default loginSlice.reducer;
