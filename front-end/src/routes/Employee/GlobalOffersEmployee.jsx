import React from 'react';
import MainContainer from "../../components/MainContainer";
import MainContent from "../../components/MainContent";

function GlobalOffersEmployee(props) {
    return (
        <MainContainer>
            <MainContent apiUrl={"/buscarEmpleos"}  />
        </MainContainer>
    );
}

export default GlobalOffersEmployee;