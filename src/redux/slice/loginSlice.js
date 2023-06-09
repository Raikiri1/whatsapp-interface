import { createSlice } from '@reduxjs/toolkit'

const initialState = {
      idInstance: '',
      ApiTokenInstance: '',
}

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    getKeys(state, action) {
      state.idInstance = action.payload.idInstance;
      state.ApiTokenInstance = action.payload.apiToken;
    }
  },
})

export const { getKeys } = loginSlice.actions;
export const loginReducer = loginSlice.reducer;

export default loginSlice.reducer