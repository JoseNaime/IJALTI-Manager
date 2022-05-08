import React from 'react';
import ReactDOM from 'react-dom/client';
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";
import './index.css';
import App from './App';
import {GlobalProvider} from "./components/GlobalProvider";
import Login from "./routes/Login";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <GlobalProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<App />} />
                    <Route path="/login" element={<Login/>} />
                </Routes>
            </BrowserRouter>
        </GlobalProvider>
    </React.StrictMode>
);