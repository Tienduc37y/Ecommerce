import { login, getMeWithToken, updateMe } from '@/services/auth'
import {createAsyncThunk} from '@reduxjs/toolkit'
export const loginThunk = createAsyncThunk(
    'auth/loginThunk',
    async (infoUser, thunkAPI) => {
      const data = await login(infoUser)
      const profile = await getMeWithToken(data.jwt)
      data.user = {...data.user, ...profile}
      return data
    }
)

export const saveUserThunk = createAsyncThunk(
  'auth/saveUserThunk',
  async (infoUser, thunkAPI) => {
    const data = await updateMe(infoUser)
    return data
  }
)

export default (builder) => {
  builder.addCase(loginThunk.pending, (state, action) => {
    state.loading = true
  })
  builder.addCase(loginThunk.fulfilled, (state, action) => {
    state.token = action.payload.jwt
    state.user = action.payload.user
    state.loading = false
  })
  builder.addCase(loginThunk.rejected, (state, action) => {
    state.loading = false
  })
  builder.addCase(saveUserThunk.fulfilled, (state, action)=>{
    state.user = {
      ...state.user,
      ...action.payload
    }
  })
}
