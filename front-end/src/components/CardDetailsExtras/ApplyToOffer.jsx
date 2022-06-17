import React, {useContext} from 'react';
import CardDetailExtraContainer from "./CardDetailExtraContainer";
import {GlobalContext} from "../GlobalProvider";

function ApplyToOffer({cardInfo}) {
    const {putRequest, user} = useContext(GlobalContext);

    const handleButtonClick = () => {
        console.log(cardInfo.empleoid)
        putRequest('/crearAplicacion',
            {
                empleoid: cardInfo.empleoid,
                email: user.email,
            }).then(response => {
            console.log(response)

            if (response.status === 201) {
                alert("Aplicación enviada!")
            }

        })

    }

    return (
        <CardDetailExtraContainer
            counter={{title: cardInfo.title, count: 20}}
            buttonText={"Aplicar"}
            handleClick={handleButtonClick}
        />
    );
}

export default ApplyToOffer;