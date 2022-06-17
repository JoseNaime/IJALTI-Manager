import React from 'react';
import CardDetailExtraContainer from "./CardDetailExtraContainer";

function SeeOfferApplications({cardInfo}) {


    const handleButtonClick = () => {

    }

    return (
        <>
            <CardDetailExtraContainer
                counter={{title: "Aplicaciones", count: cardInfo.solicitudes.length}}
                buttonText={"Ver Solicitudes"}
                handleClick={handleButtonClick}
            />

        </>
    );
}

export default SeeOfferApplications;