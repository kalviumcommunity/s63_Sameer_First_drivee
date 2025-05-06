import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import carReducer from './slices/carSlice';
import forumReducer from './slices/forumSlice';
import checklistReducer from './slices/checklistSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cars: carReducer,
    forum: forumReducer,
    checklist: checklistReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
}); 