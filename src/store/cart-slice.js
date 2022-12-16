import { createSlice } from '@reduxjs/toolkit'

const initialCartState = {
    itemsList: [],
    totalQuantity: 0,
    isCartOpen: false,
    changed: false,
}

const cartSlice = createSlice({
    name: 'cart',
    initialState: initialCartState,
    reducers: {
        replaceData(state, action) {
            state.itemsList = action.payload.itemsList
            state.totalQuantity = action.payload.totalQuantity
        },

        addToCart(state, action) {
            state.changed = true
            const newItem = action.payload

            const existingItem = state.itemsList.find(
                (item) => item.id === newItem.id
            )
            if (existingItem) {
                existingItem.quantity++
                existingItem.totalPrice += newItem.price
            } else {
                state.itemsList.push({
                    id: newItem.id,
                    name: newItem.name,
                    price: newItem.price,
                    quantity: 1,
                    totalPrice: newItem.price,
                })
                state.totalQuantity++
            }
        },
        removeFromCart(state, action) {
            state.changed = true
            const id = action.payload
            const existingItem = state.itemsList.find((item) => item.id === id)
            if (existingItem.quantity === 1) {
                state.itemsList = state.itemsList.filter(
                    (item) => item.id !== id
                )
                state.totalQuantity--
            } else {
                existingItem.quantity--
                existingItem.totalPrice -= existingItem.price
            }
        },
        toggleCart(state) {
            state.isCartOpen = !state.isCartOpen
        },
    },
})

export const cartActions = cartSlice.actions

export default cartSlice
