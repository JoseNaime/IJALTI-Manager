import React, {createContext, useReducer} from 'react';
import {AppReducer} from './AppReducer';
import axios from "axios";

const initialState = {
    user: null
}

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({children}) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

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

    function getRequest(url, data) {
        const requestUrl = process.env.REACT_APP_API_URL + url;
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            data: data
        }
        return axios(requestUrl, requestOptions);
    }

    function postRequest(url, body) {
        const requestUrl = process.env.REACT_APP_API_URL + url;
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            data: body
        }
        return axios(requestUrl, requestOptions).then(res => res.data);
    }

    return (
        <GlobalContext.Provider value={{user: state.user, login, logout, getRequest, postRequest}}>
            {children}
        </GlobalContext.Provider>
    )
}