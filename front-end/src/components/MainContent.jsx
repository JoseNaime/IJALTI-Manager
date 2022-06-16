import React, {useContext, useEffect, useState} from 'react';
import useFetch from "../customHooks/useFetch";
import CardsContainer from "./CardsContainer";
import CardDetails from "./CardDetails";
import {GlobalContext} from "./GlobalProvider";

const style = {
    h1: {
        fontSize: "2.5rem"
    }
}

function MainContent({apiUrl, params, fieldNames, noDataButton}) {
    const {data, isLoading, error} = useFetch({url: apiUrl, method: "GET", params: params});
    const [auxCardsInfo, setAuxCardsInfo] = useState([]);
    const [selectedCardInfo, setSelectedCardInfo] = useState(null);
    const {cardsInfo, setCardsInfo} = useContext(GlobalContext);

    const handleCardClick = (cardInfo) => {
        console.log(cardInfo)
        setSelectedCardInfo(cardInfo)
    }

    useEffect(() => {
        console.log("is any data: " + !!data)
        if (data && cardsInfo.length === 0) {
            console.log("Data from " + apiUrl)
            console.log(data)
            setCardsInfo(data);
        }

        if (data && cardsInfo.length > 0) {
            setAuxCardsInfo(data);
        }

        if (auxCardsInfo.length > 0 && selectedCardInfo === null) {
            setSelectedCardInfo(auxCardsInfo[0]);
        }
    }, [data, auxCardsInfo, cardsInfo, selectedCardInfo, apiUrl, setCardsInfo]);

    return (
        <>
            {(selectedCardInfo && auxCardsInfo.length > 0) ?
                <>
                    <CardsContainer data={auxCardsInfo}
                                    selectedCardInfoId={selectedCardInfo[fieldNames.id]}
                                    handleCardClick={handleCardClick}
                                    fieldNames={fieldNames} />
                    <CardDetails
                        cardInfo={selectedCardInfo}
                        fieldNames={fieldNames}
                    />
                </>
                :
                isLoading ?
                    <>
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                            <div className="text-center">
                                <h1 style={style.h1} className="font-bold opacity-50">Cargando...</h1>
                            </div>
                        </div>
                    </>
                    :
                    <>
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                            <div className="text-center">
                                <h1 style={style.h1} className="font-bold opacity-50">NO HAY DATOS PARA MOSTRAR</h1>
                                {}
                            </div>
                        </div>
                    </>

            }
        </>
    )
}

export default MainContent;