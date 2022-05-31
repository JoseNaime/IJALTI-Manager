import React, {useContext, useEffect} from 'react'
import {Route, Routes} from 'react-router-dom';
import Login from "./routes/Login";
import {GlobalContext} from "./components/GlobalProvider";
import Home from "./routes/Home";
import Register from "./routes/Register";

function App() {
    const {login} = useContext(GlobalContext);
    useEffect(() => {
        const userInLocalStorage = JSON.parse(localStorage.getItem('user'));
        if (userInLocalStorage) {
            console.log(userInLocalStorage)
            login(userInLocalStorage);
        }
        // eslint-disable-next-line
    }, []);
    return (
        <>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/login" element={<Login/>} />
                <Route path="/register" element={<Register/>} />
            </Routes>
        </>
    );
}

export default App;
