import { RootState } from '@/app/store';
import { AuthResponse } from '@/models';
import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: Partial<AuthResponse> = {
  user: {
    fullName: '',
    email: '',
    password: '',
    role: '',
    root: false,
    avatar: '',
  },
  accessToken: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<Partial<AuthResponse>>) {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
    },

    userLogout(state) {
      state.user = initialState.user;
      state.accessToken = '';
    },
  },
});

// Actions
export const authActions = authSlice.actions;

// Selector
export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectIsLoggedIn = createSelector(selectCurrentUser, (user) => user?.fullName);

// Reducer
const authReducer = authSlice.reducer;
export default authReducer;
