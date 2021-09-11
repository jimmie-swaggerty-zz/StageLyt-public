import React, { createContext, useReducer } from 'react'

const initialState = {
    user:{email: undefined,
    id: null,
    loggedIn: false},
    pages: {}
}

//this instance holds 2 components
// 1 - Provider -  componenet that is the parent to all needing access to context
// 2 - Consumer - your componenets
export const store = createContext(initialState)

const { Provider } = store



const StateProvider = (props) => {
    const { children } = props

    const [state, dispatch] = useReducer((state, action) => {
        if (action.type === "sign-in") {
            return { user: {...state.user, email: action.payload.user.email, id: action.payload.user.id, loggedIn: true, city_id: action.payload.user.city_id }, pages: action.payload.pages}
        }
        if (action.type === "sign-out") {
            return { user: {email: undefined, id: null, loggedIn: false }, pages: {}}
        }
    }, initialState)

    return (
        <Provider value={{ state, dispatch }}>
            {children}
        </Provider>
    )
}

export default StateProvider