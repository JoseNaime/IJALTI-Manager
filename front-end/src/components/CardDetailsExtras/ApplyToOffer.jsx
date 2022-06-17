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
            if (response.status === 404){
                alert("Ya has aplicado a este empleo")
            }
        })
    }

    return (
        <CardDetailExtraContainer
            counter={{title: "Solicitudes", count: cardInfo.numsolicitudes}}
            buttonText={"Aplicar"}
            handleClick={handleButtonClick}
        />
    );
}

export default ApplyToOffer;