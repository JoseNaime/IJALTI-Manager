import React, {useContext} from 'react';
import MainContainer from "../../components/MainContainer";
import MainContent from "../../components/MainContent";
import {GlobalContext} from "../../components/GlobalProvider";

function MyApplicationsEmployee(props) {
    const {user} = useContext(GlobalContext);


    return (
        <MainContainer>
            <MainContent apiUrl={"/aplicacionesUsuario"}
                         params={{"email": user && user.email}}
                         headers={{}} />
        </MainContainer>
    );
}

export default MyApplicationsEmployee;