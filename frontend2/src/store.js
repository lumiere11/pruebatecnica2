import { configureStore } from '@reduxjs/toolkit'
import onlineReducer from './features/online/onlineSlice'

export const store = configureStore({
  reducer: {
    online: onlineReducer
  },
})