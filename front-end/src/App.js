import React, {useContext, useEffect} from 'react'
import {Navigate, Route, Routes} from 'react-router-dom';
import Login from "./routes/Login";
import {GlobalContext} from "./components/GlobalProvider";
import MyApplicationsEmployee from "./routes/Employee/MyApplicationsEmployee";
import GlobalOffersEmployee from "./routes/Employee/GlobalOffersEmployee";
import Register from "./routes/Register";

function App() {
    const {user} = useContext(GlobalContext);

    useEffect(() => {
        console.log(user);
    }, [user])


    function defaultRoute() {
        if (user) {
            switch (user.role) {
                case 'usuario':
                    return '/ofertas';

                default:
                    return '/login';
            }
        }
        return '/login';
    }

    return (
        <>
            <Routes>
                {user ? (
                    <>
                        <Route path="/ofertas" element={<GlobalOffersEmployee />} />
                        <Route path="/mis-aplicaciones" element={<MyApplicationsEmployee />} />
                    </>
                ) : (
                    <>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                    </>
                )}

                <Route path="*" element={<Navigate to={defaultRoute()} redirect/>} />

            </Routes>
        </>
    );
}

export default App;
