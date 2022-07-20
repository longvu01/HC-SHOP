import { RootState } from '@/app/store'
import { Product } from '@/models'
import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface CartItem extends Product {
	quantity: number
	isActive?: boolean
}

export interface CartState {
	isShowMiniCart: boolean
	cartItems: CartItem[]
}

const initialState: CartState = {
	isShowMiniCart: false,
	cartItems: [],
}

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addToCart(state: CartState, action: PayloadAction<CartItem>) {
			const newItem = action.payload

			// Check if item exists
			const itemIndex = state.cartItems.findIndex((item) => item._id === newItem._id)

			if (itemIndex >= 0) {
				state.cartItems[itemIndex].quantity += action.payload.quantity
			} else {
				newItem.isActive = true
				state.cartItems.unshift(newItem)
			}
		},

		removeFromCart(state: CartState, action: PayloadAction<{ idToRemove: string }>) {
			const { idToRemove } = action.payload
			// Check if item exists
			const itemIndex = state.cartItems.findIndex((item) => item._id === idToRemove)

			if (itemIndex >= 0) {
				state.cartItems.filter((cartItem) => cartItem._id !== idToRemove)
			}
		},

		setQuantity(state: CartState, action: PayloadAction<{ _id: string; quantity: number }>) {
			const { _id, quantity } = action.payload
			// Check if item exists
			const itemIndex = state.cartItems.findIndex((item) => item._id === _id)
			console.log(state.cartItems[itemIndex].quantity)
			if (itemIndex >= 0) state.cartItems[itemIndex].quantity = quantity
		},

		toggleActive(state: CartState, action: PayloadAction<{ cartItemId: string }>) {
			const { cartItemId } = action.payload

			// Check if item exists
			const itemIndex = state.cartItems.findIndex((item) => item._id === cartItemId)

			if (itemIndex >= 0) {
				state.cartItems[itemIndex].isActive = !state.cartItems[itemIndex].isActive
			}
		},

		toggleActiveAll(state: CartState) {
			const isExistsItemNonActive = state.cartItems.some((cartItem) => !cartItem.isActive)

			if (isExistsItemNonActive) {
				state.cartItems.forEach((cartItem) => (cartItem.isActive = true))
			} else {
				state.cartItems.forEach((cartItem) => (cartItem.isActive = false))
			}
		},
	},
})

// Actions
export const cartActions = cartSlice.actions

// Selectors
export const selectCartItems = (state: RootState) => state.cart.cartItems

export const selectCartItemCount = createSelector(selectCartItems, (cartItems) => cartItems.length)

export const selectCartItemActive = createSelector(selectCartItems, (cartItems) =>
	cartItems.filter((cartItem) => cartItem.isActive)
)

/* TODO: replace to salePrice */
export const selectCartTotalPrice = createSelector(selectCartItemActive, (cartItemActive) =>
	// cartItemActive.reduce((total, cartItem) => (total += cartItem.salePrice * cartItem.quantity), 0)
	cartItemActive.reduce((total, cartItem) => (total += cartItem.price * cartItem.quantity), 0)
)

// Reducer
const cartReducer = cartSlice.reducer
export default cartReducer
