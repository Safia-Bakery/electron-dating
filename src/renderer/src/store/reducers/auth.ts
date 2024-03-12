import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../rootConfig'

interface State {
  token: string | null
}

const initialState: State = {
  token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MTAzMDcxNDIsInN1YiI6Im1haW5fYWRtaW4ifQ.CmA8sRElEFLbohU8KROwq3IrprFDNBfyq3Kaim5TjWY'
}

export const authReducer = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logoutHandler: (state) => {
      state.token = null
    },
    loginHandler: (state, { payload }) => {
      state.token = payload
    }
  }
})

export const tokenSelector = (state: RootState) => state?.auth?.token

export const { loginHandler, logoutHandler } = authReducer.actions

export default authReducer.reducer
