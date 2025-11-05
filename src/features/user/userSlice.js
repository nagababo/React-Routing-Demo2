import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  loading: false,
  error: null,
  filters: {}
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    fetchUsersRequest: (state, action) => {
      state.loading = true;
      state.error = null;
      if (action.payload) state.filters = action.payload
    },
    fetchUsersSuccess: (state, action) => {
      state.loading = false;
      state.users = action.payload;
    },
    fetchUsersFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchUsersRequest,
  fetchUsersSuccess,
  fetchUsersFailure,
} = userSlice.actions;

export default userSlice.reducer;
