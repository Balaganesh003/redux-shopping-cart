import React from 'react'
import './Cart.css'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { cartActions } from './../store/cart-slice'
const Cart = () => {
    const dispatch = useDispatch()
    const quantity = useSelector((state) => state.cart.totalQuantity)
    const toggleCart = () => {
        dispatch(cartActions.toggleCart())
    }
    return (
        <div className="cartIcon">
            <h3 onClick={toggleCart}>Cart: {quantity} Items</h3>
        </div>
    )
}

export default Cart
