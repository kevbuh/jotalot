import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "user",
  initialState: {
    value: 0,
    currentUser: {
      email: "",
      authToken: "",
      firstName: "",
      lastName: "",
    },
  },
  reducers: {
    LogUserIn: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.currentUser = action.payload;
    },
    LogUserOut: (state) => {
      state.currentUser.email = "";
      state.currentUser.authToken = "";
      state.currentUser.firstName = "";
      state.currentUser.lastName = "";
    },
    SetUserFirstName: (state) => {
      state.currentUser.firstName = action.payload;
    },
    SetUserLastName: (state) => {
      state.currentUser.lastName = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { LogUserIn, LogUserOut, SetUserFirstName, SetUserLastName } =
  slice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
// export const selectValue = (state) => state.slice.currentUser.email;
export const userEmail = (state) => state.user.currentUser.email;
export const userToken = (state) => state.user.currentUser.authToken;
export const userFirstName = (state) => state.user.currentUser.firstName;
export const userLastName = (state) => state.user.currentUser.lastName;

export default slice.reducer;
