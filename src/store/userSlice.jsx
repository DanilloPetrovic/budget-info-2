import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  uid: null,
  name: null,
  email: null,
  expenses: [],
  incomes: [],
  incomesCategories: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setData(state, action) {
      state.uid = action.payload.uid;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.expenses = action.payload.expenses || [];
      state.incomes = action.payload.incomes || [];
      state.incomesCategories = action.payload.incomesCategories || [];
    },
    logout(state, actions) {
      return initialState;
    },
  },
});
