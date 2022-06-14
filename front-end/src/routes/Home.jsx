import React, {useContext, useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import {GlobalContext} from "../components/GlobalProvider";
import MainContainer from "../components/MainContainer";

function Home() {
    // Fetch data
    const {user} = useContext(GlobalContext);

    const navigate = useNavigate();

    useEffect(() => {
        //console.log(getUser());
        if (user === null) navigate('/login');

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <MainContainer>



        </MainContainer>
    );
}

export default Home;