import React, { createContext, useReducer } from 'react';
import {AppReducer} from './AppReducer';

const initialState = {
    user: null
}

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    // Actions for changing state

    function login(user) {
        dispatch({
            type: 'LOGIN',
            payload: user
        });
    }
    function logout() {
        dispatch({
            type: 'LOGOUT',
        });
    }

    return(
        <GlobalContext.Provider value = {{user: state.user, login, logout}}>
            {children}
        </GlobalContext.Provider>
    )
}