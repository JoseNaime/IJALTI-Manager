import React, {useContext, useEffect} from 'react'
import {Navigate, Route, Routes} from 'react-router-dom';
import Login from "./routes/Login";
import {GlobalContext} from "./components/GlobalProvider";
import Register from "./routes/Register";
import DynamicRoute from "./routes/DynamicRoute";

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
                        <Route path="/ofertas" element={
                            <DynamicRoute apiUrl={"/buscarEmpleos"} />
                        } />

                        <Route path="/mis-aplicaciones" element={
                            <DynamicRoute apiUrl={"/aplicacionesUsuario"}
                                          params={{"email": user && user.email}}
                                          headers={{}} />
                        } />
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
