import React, {useContext, useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import MainContainer from "../../components/MainContainer";
import MainContent from "../../components/MainContent";
import {GlobalContext} from "../../components/GlobalProvider";

function MyApplicationsEmployee(props) {
    const {user, getUser} = useContext(GlobalContext);
    const navigate = useNavigate();

    useEffect(() => {
        //console.log(getUser());
        if (getUser() === null) navigate('/login');

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <MainContainer>
            {user &&
                <MainContent apiUrl={"/aplicacionesUsuario"}
                             params={{"email": user && user.email}}
                             headers={{}} />
            }
        </MainContainer>
    );
}

export default MyApplicationsEmployee;