import React from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import './App.css'
import Auth from './components/Auth'
import Layout from './components/Layout'
import Notification from './components/Notification'
import { useDispatch } from 'react-redux'
import { fetchData, sendCartData } from './store/cart-actions'

let isFirstRender = true

function App() {
    const dispatch = useDispatch()
    const notification = useSelector((state) => state.ui.notification)
    const cart = useSelector((state) => state.cart)
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)

    useEffect(() => {
        dispatch(fetchData())
    }, [dispatch])

    useEffect(() => {
        if (isFirstRender) {
            isFirstRender = false
            return
        }
        if (cart.changed) {
            dispatch(sendCartData(cart))
        }
    }, [cart, dispatch])

    return (
        <div className="App">
            {notification && (
                <Notification
                    type={notification.type}
                    message={notification.message}
                />
            )}
            {!isAuthenticated && <Auth />}
            {isAuthenticated && <Layout />}
        </div>
    )
}

export default App
