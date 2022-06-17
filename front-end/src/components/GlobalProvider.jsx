import React, {createContext, useEffect, useReducer} from 'react';
import {AppReducer} from './AppReducer';
import axios from "axios";
import Cookies from "js-cookie";

const initialState = {
    user: null,
    cardsInfo: [],
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

    function setCardsInfo(cardsInfo) {
        console.log("GlobalProvider setCardsInfo: ");
        console.log(cardsInfo);
        dispatch({
            type: 'SET_CARDS_INFO',
            payload: cardsInfo
        });
    }

    function clearCardsInfo() {
        console.log("GlobalProvider clearCardsInfo");
        dispatch({
            type: 'CLEAR_CARDS_INFO'
        });
    }

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
<<<<<<< HEAD
        console.log(user);
=======
        console.log(JSON.stringify(user))
>>>>>>> d38ab66e5dd525f617351d838085627e0f492599
        dispatch({
            type: 'LOGIN',
            payload: user
        });
    }

    function logout() {
        clearCardsInfo();
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
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET'
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
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST'
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
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'PUT'
            },
            data: body
        }
        return axios(requestUrl, requestOptions).then(res => res.data);
    }

    return (
        <GlobalContext.Provider value={{
            user: state.user,
            cardsInfo: state.cardsInfo,
            getUser,
            login,
            logout,
            setCardsInfo,
            clearCardsInfo,
            getRequest,
            postRequest,
            putRequest
        }}>
            {children}
        </GlobalContext.Provider>
    )
}