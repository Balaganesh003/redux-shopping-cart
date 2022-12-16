import { uiActions } from './ui-slice'
import { cartActions } from './cart-slice'
import { useSelector } from 'react-redux'

export const fetchData = () => {
    return async (dispatch) => {
        const fetchHandler = async () => {
            const res = await fetch(
                'https://redux-http-39aee-default-rtdb.asia-southeast1.firebasedatabase.app/cartItems.json'
            )
            const data = await res.json()
            return data
        }
        try {
            const cartData = await fetchHandler()
            dispatch(cartActions.replaceData(cartData))
        } catch (err) {
            dispatch(
                uiActions.showNotification({
                    open: true,
                    message: 'Fetching data failed',
                    type: 'error',
                })
            )
        }
    }
}

export const sendCartData = (cart) => {
    return async (dispatch) => {
        dispatch(
            uiActions.showNotification({
                open: true,
                message: 'Sending request...',
                type: 'warning',
            })
        )
        const sendRequest = async () => {
            const res = await fetch(
                'https://redux-http-39aee-default-rtdb.asia-southeast1.firebasedatabase.app/cartItems.json',
                {
                    method: 'PUT',
                    body: JSON.stringify(cart),
                }
            )
            const data = await res.json()
            dispatch(
                uiActions.showNotification({
                    open: true,
                    message: 'Request sent successfully',
                    type: 'success',
                })
            )
        }

        try {
            await sendRequest()
        } catch (err) {
            dispatch(
                uiActions.showNotification({
                    open: true,
                    message: 'Request failed',
                    type: 'error',
                })
            )
        }
    }
}
