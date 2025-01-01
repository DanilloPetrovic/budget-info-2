import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  uid: null,
  username: null,
  email: null,
  expenses: [],
  income: [],
  incomeCategories: [],
  notes: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setData(state, actions) {
      state.uid = actions.payload.uid;
      state.username = actions.payload.username;
      state.email = actions.payload.email;
      state.expenses = actions.payload.expenses;
      state.expensesCategories = actions.payload.expensesCategories;
      state.income = actions.payload.income;
      state.incomeCategories = actions.payload.incomeCategories;
      state.notes = actions.payload.notes;
    },
    logout(state, actions) {
      return initialState;
    },
  },
});
