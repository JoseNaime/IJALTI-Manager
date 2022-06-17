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
    }, [user]);


    const RoutesByRole = () => {
        if (!user) {
            return (<Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="*" element={<Navigate to={'/login'} redirect />} />
            </Routes>)
        }

        switch (user.role) {
            case 'usuario':
                return (<Routes>
                    <Route path="/ofertas"
                           element={
                               <DynamicRoute apiUrl={"/buscarEmpleos"}
                                             fieldNames={{
                                                 id: 'empleoid',
                                                 title: 'titulo',
                                                 description: 'descripcion',
                                                 company: 'empresa',
                                                 firstSpace: 'nombrecomercial',
                                                 secondSpace: 'estado',
                                                 date: 'postdate',
                                                 skills: 'habilidades',

                                             }}
                                             extraComponents={{
                                                 cardDetail_ApplyToOffer: true
                                             }}
                               />} />

                    <Route path="/mis-aplicaciones"
                           element={
                               <DynamicRoute apiUrl={"/aplicacionesUsuario"}
                                             params={{"email": user && user.email}}
                                             headers={{}}
                                             fieldNames={{
                                                 id: 'empleoid',
                                                 title: 'titulo',
                                                 description: 'descripcion',
                                                 company: 'empresa',
                                                 firstSpace: 'nombrecomercial',
                                                 secondSpace: 'estado',
                                                 date: 'aplicacionfecha',
                                                 skills: 'habilidades',
                                                 status: 'status'
                                             }}

                               />
                           } />
                    <Route path="*" element={<Navigate to={'/ofertas'} redirect />} />
                </Routes>)
            case 'empresa':
                return (<Routes>
                    <Route path="/mis-empleos"
                           element={
                               <DynamicRoute apiUrl={"/empleosEmpresa"}
                                             params={{"email": user && user.email}}
                                             headers={{}}
                                             fieldNames={{
                                                 id: 'empleoid',
                                                 title: 'titulo',
                                                 description: 'descripcion',
                                                 date: 'postdate',
                                                 skills: 'habilidades',
                                                 firstSpace: 'ciudad',
                                                 secondSpace: 'estado',
                                                 counter: {
                                                     dynamicCount: true,
                                                     title: "Aplicaciones",
                                                     count: "solicitudes"
                                                 }
                                             }}
                                             noDataButton={{
                                                 test: false,
                                                 title: 'Crear Empleo +',
                                                 handleButtonClick: 'handleToggleCreateOfferContainer'
                                             }}
                                             extraComponents={{
                                                 cardDetail_SeeOfferApplications: true
                                             }}
                               />

                           } />

                    <Route path="/buscar-usuarios"
                           element={
                               <DynamicRoute apiUrl={"/buscarUsuarios"}
                                             fieldNames={{
                                                 id: 'username',
                                                 title: 'nombrecompleto',
                                                 subTitle: 'rolactual',
                                                 description: 'biografia',
                                                 skills: 'habilidades',
                                             }}
                               />} />

                    <Route path="*" element={<Navigate to={'/mis-empleos'} redirect />} />
                </Routes>)
            default:
                return (<Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="*" element={<Navigate to={'/login'} redirect />} />
                </Routes>)
        }
    }

    return (<>
        <RoutesByRole />
    </>);
}

export default App;
