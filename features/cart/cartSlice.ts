import { RootState } from '@/app/store'
import { Product } from '@/models'
import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface CartItemSlice extends Product {
	quantity: number
	isActive: boolean
}

export interface CartState {
	isShowMiniCart: boolean
	cartItems: CartItemSlice[]
}

const initialState: CartState = {
	isShowMiniCart: false,
	cartItems: [],
}

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		setCartItems(state: CartState, action: PayloadAction<CartItemSlice[]>) {
			state.cartItems = action.payload
		},

		setShowMiniCart(state: CartState) {
			state.isShowMiniCart = true
		},

		setHideMiniCart(state: CartState) {
			state.isShowMiniCart = false
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

		addToCart(state: CartState, action: PayloadAction<CartItemSlice>) {
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

		setQuantity(state: CartState, action: PayloadAction<{ _id: string; quantity: number }>) {
			const { _id, quantity } = action.payload

			// Check if item exists
			const itemIndex = state.cartItems.findIndex((item) => item._id === _id)

			if (itemIndex >= 0) state.cartItems[itemIndex].quantity = quantity
		},

		removeFromCart(state: CartState, action: PayloadAction<string>) {
			const idToRemove = action.payload

			// Check if item exists
			const itemIndex = state.cartItems.findIndex((item) => item._id === idToRemove)

			if (itemIndex >= 0) {
				state.cartItems = state.cartItems.filter((cartItem) => cartItem._id !== idToRemove)
			}
		},

		removeCartItemsActive(state: CartState) {
			state.cartItems = state.cartItems.filter((cartItem) => !cartItem.isActive)
		},

		purchaseCart(state: CartState) {
			state.cartItems = state.cartItems.filter((cartItem) => !cartItem.isActive)
		},

		resetCart(state: CartState) {
			state.cartItems = []
		},
	},
})

// Actions
export const cartActions = cartSlice.actions

// Selectors
export const selectCartItems = (state: RootState) => state.cart.cartItems

export const selectIsShowMiniCart = (state: RootState) => state.cart.isShowMiniCart

// Total quantity of cart
export const selectCartItemTotalQuantity = createSelector(selectCartItems, (cartItems) =>
	cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
)
// Count of product
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
