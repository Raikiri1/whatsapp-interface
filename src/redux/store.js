import { configureStore } from '@reduxjs/toolkit'
import loginSlice, { loginReducer } from './slice/loginSlice'
import chatsSlice from './slice/chatsSlice'
export const store = configureStore({
  reducer: {
    login: loginReducer,
      chatsSlice,
  },
})