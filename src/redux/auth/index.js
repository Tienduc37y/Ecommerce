import { createSlice } from '@reduxjs/toolkit'
import auth from './thunk'

const initialState = {
  token: "",
  user: {},
  loading: false
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state)=>{
      state.token = ''
      state.user = {}
      state.loading = false
    }
  },
  extraReducers: auth
})

export const { setUserAccess, logout } = authSlice.actions
export default authSlice.reducer