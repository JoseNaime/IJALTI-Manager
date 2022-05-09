import React from 'react';
import ReactDOM from 'react-dom/client';
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";
import './index.css';
import App from "./App";
import {GlobalProvider} from "./components/GlobalProvider";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <GlobalProvider>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </GlobalProvider>
    </React.StrictMode>
);