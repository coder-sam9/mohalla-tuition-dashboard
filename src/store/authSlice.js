import { createSlice } from "@reduxjs/toolkit"

 const authSlice = createSlice({
  name: "auth",
  initialState: { user: null },
  reducers: {}
})

export const { setUser } = authSlice.actions
export default authSlice.reducer