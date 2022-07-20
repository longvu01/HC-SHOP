import authReducer from '@/features/auth/authSlice'
import cartReducer from '@/features/cart/cartSlice'
import { Action, AnyAction, combineReducers, configureStore, ThunkAction } from '@reduxjs/toolkit'
import { createWrapper, HYDRATE } from 'next-redux-wrapper'

const combinedReducer = combineReducers({
	auth: authReducer,
	cart: cartReducer,
})

// const reducer = (state: ReturnType<typeof combinedReducer>, action: AnyAction) => {
// 	if (action.type === HYDRATE) {
// 		return {
// 			...state, // use previous state
// 			...action.payload, // apply delta from hydration
// 		}
// 	} else {
// 		return combinedReducer(state, action)
// 	}
// }

export const makeStore = () =>
	configureStore({
		reducer: combinedReducer,
		// @ts-ignore
		// reducer,
	})

type Store = ReturnType<typeof makeStore>

export type AppDispatch = Store['dispatch']
export type RootState = ReturnType<Store['getState']>
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>

export const wrapper = createWrapper(makeStore, { debug: true })
