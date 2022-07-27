import { RootState } from '@/app/store'
import { AuthResponse, User } from '@/models'
import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: Partial<AuthResponse> & { isRequireLogin: boolean; accessToken: string } = {
	user: {
		_id: '',
		fullName: '',
		email: '',
		phoneNumber: '',
		gender: 'male',
		address: '',
		role: '',
		root: false,
		avatar: '',
	},
	accessToken: '',
	isRequireLogin: false,
}

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setUserAuth(state, action: PayloadAction<AuthResponse>) {
			state.user = action.payload.user
			state.accessToken = action.payload.accessToken
		},

		setUserData(state, action: PayloadAction<User>) {
			state.user = { ...state.user, ...action.payload }
		},

		setRequireLogin(state) {
			state.isRequireLogin = true
		},

		unSetRequireLogin(state) {
			state.isRequireLogin = false
		},

		userLogout(state) {
			state.user = initialState.user
			state.accessToken = ''
		},
	},
})

// Actions
export const authActions = authSlice.actions

// Selector
export const selectCurrentUser = (state: RootState) => state.auth.user
export const selectUserAccessToken = (state: RootState) => state.auth.accessToken
export const selectIsRequireLogin = (state: RootState) => state.auth.isRequireLogin

export const selectIsLoggedIn = createSelector(selectCurrentUser, (user) => user?._id)

// Reducer
const authReducer = authSlice.reducer
export default authReducer
