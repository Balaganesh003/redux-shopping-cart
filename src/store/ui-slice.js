import { createSlice } from '@reduxjs/toolkit'

const initialUiState = {
    notification: null,
}

const uiSlice = createSlice({
    name: 'ui',
    initialState: initialUiState,
    reducers: {
        showNotification(state, action) {
            state.notification = {
                message: action.payload.message,
                type: action.payload.type,
                open: action.payload.open,
            }
        },
    },
})

export const uiActions = uiSlice.actions

export default uiSlice
