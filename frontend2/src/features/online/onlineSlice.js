import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: true,
}

export const onlineSlice = createSlice({
  name: 'online',
  initialState,
  reducers: {
    changeOnlineState: (state, action) => {
      state.value = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { changeOnlineState } = onlineSlice.actions

export default onlineSlice.reducer