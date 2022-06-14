import React, {useContext, useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import {GlobalContext} from "../components/GlobalProvider";
import MainContainer from "../components/MainContainer";

function Home() {
    // Fetch data
    const {getUser, user} = useContext(GlobalContext);

    const navigate = useNavigate();

    useEffect(() => {
        //console.log(getUser());
        if (getUser() === null) navigate('/login');

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <MainContainer>
            {/*
            <RouteTest
                apiUrl={"/buscarEmpleos"}
            />

            {user &&
                <RouteTest
                    apiUrl={"/aplicacionesUsuario"}
                    params={{"email": user.email}}
                />
            }*/}


        </MainContainer>
    );
}

export default Home;