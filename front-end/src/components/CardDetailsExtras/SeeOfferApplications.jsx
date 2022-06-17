import React from 'react';
import CardDetailExtraContainer from "./CardDetailExtraContainer";
import OfferApplicationsContainer from "../OfferApplicationsContainer";

function SeeOfferApplications({cardInfo}) {
    const [isOfferAplicationsContainerOpen, setIsOfferAplicationsContainerOpen] = React.useState(false);


    const handleButtonClick = () => {
        setIsOfferAplicationsContainerOpen(!isOfferAplicationsContainerOpen)
    }

    return (
        <>
            <CardDetailExtraContainer
                counter={{title: "Solicitudes", count: cardInfo.solicitudes.length}}
                buttonText={"Ver Solicitudes"}
                handleClick={handleButtonClick}
            >
                {isOfferAplicationsContainerOpen && <OfferApplicationsContainer offerApplications={cardInfo.solicitudes}  />}
            </CardDetailExtraContainer>

        </>
    );
}

export default SeeOfferApplications;