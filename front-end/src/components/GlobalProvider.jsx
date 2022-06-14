import React, {createContext, useEffect, useReducer} from 'react';
import {AppReducer} from './AppReducer';
import axios from "axios";
import Cookies from "js-cookie";

const initialState = {
    user: null
}

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({children}) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    useEffect(() => {
        const user = Cookies.get('user');
        console.log("GlobalProvider User: " + user);
        if (user) {
            dispatch({
                type: 'SET_USER',
                payload: user
            });
        }
    }, []);

    function getUser() {
        const storedUser = Cookies.get('user');
        if (storedUser) {
            console.log("GlobalContext: " + storedUser);
            dispatch({
                type: 'SET_USER',
                payload: storedUser
            })
        }
        return storedUser;
    }

    function login(user) {
        console.log(JSON.stringify(user))
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