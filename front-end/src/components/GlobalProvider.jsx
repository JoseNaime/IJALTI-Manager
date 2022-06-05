import React, {createContext, useReducer} from 'react';
import {AppReducer} from './AppReducer';
import axios from "axios";

const initialState = {
    user: null
}

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({children}) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    function getUser() {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            console.log(storedUser);
            dispatch({
                type: 'SET_USER',
                payload: JSON.parse(storedUser)
            })
        }
        return state.user;
    }

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
            params: data
            
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

    function putRequest(url, body) {
        const requestUrl = process.env.REACT_APP_API_URL + url;
        const requestOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            data: body
        }
        return axios(requestUrl, requestOptions).then(res => res.data);
    }

    return (
        <GlobalContext.Provider value={{user: state.user, getUser, login, logout, getRequest, postRequest, putRequest}}>
            {children}
        </GlobalContext.Provider>
    )
}