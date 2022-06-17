import React from 'react';
import CardDetailExtraContainer from "./CardDetailExtraContainer";
import OfferApplicationsContainer from "../OfferApplicationsContainer";

function SeeOfferApplications({cardInfo}) {
    const [isOfferAplicationsContainerOpen, setIsOfferAplicationsContainerOpen] = React.useState(true);


    const handleButtonClick = () => {

    }

    return (
        <>
            <CardDetailExtraContainer
                counter={{title: "Aplicaciones", count: cardInfo.solicitudes.length}}
                buttonText={"Ver Solicitudes"}
                handleClick={handleButtonClick}
            >
                {isOfferAplicationsContainerOpen && <OfferApplicationsContainer />}
            </CardDetailExtraContainer>

        </>
    );
}

export default SeeOfferApplications;