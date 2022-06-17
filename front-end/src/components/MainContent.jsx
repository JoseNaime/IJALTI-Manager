import React, {useContext, useEffect, useState} from 'react';
import useFetch from "../customHooks/useFetch";
import CardsContainer from "./CardsContainer";
import CardDetails from "./CardDetails";
import {GlobalContext} from "./GlobalProvider";
import CreateOfferContainer from "./CreateOfferContainer";
import SearchBarPremium from './SearchBarPremium';
import SearchBar from './SearchBar';

const style = {
    h1: {
        fontSize: "2.5rem"
    }
}

function MainContent({apiUrl, params, fieldNames, noDataButton, extraComponents}) {
    const {data, isLoading} = useFetch({url: apiUrl, method: "GET", params: params});
    const [auxCardsInfo, setAuxCardsInfo] = useState([]);
    const [selectedCardInfo, setSelectedCardInfo] = useState(null);
    const {cardsInfo, setCardsInfo} = useContext(GlobalContext);

    const handleCardClick = (cardInfo) => {
        console.log(cardInfo)
        setSelectedCardInfo(cardInfo)
    }

    const [isCreateOfferContainerVisible, setIsCreateOfferContainerVisible] = useState(false);

    const handleToggleCreateOfferContainer = () => {
        console.log("handleToggleCreateOfferContainer")
        setIsCreateOfferContainerVisible(!isCreateOfferContainerVisible)
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
                                    fieldNames={fieldNames}> 
                        <SearchBarPremium/>
                            {/* <SearchBar/> */}
                    </CardsContainer>
                    <CardDetails
                        cardInfo={selectedCardInfo}
                        fieldNames={fieldNames}
                        extraComponents={extraComponents}
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
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-light-gray px-10 py-8 shadow-2xl">
                            <div className="text-center">
                                <h1 style={style.h1} className="font-bold opacity-50">NO HAY DATOS PARA MOSTRAR</h1>
                                {noDataButton &&
                                    <div className="bg-gray mt-3 px-7 py-3 rounded-full w-fit m-auto">
                                        {/* eslint-disable-next-line no-eval */}
                                        <button className="" onClick={eval(noDataButton.handleButtonClick)}>
                                            <p className="opacity-50 font-medium">{noDataButton.title}</p>
                                        </button>
                                    </div>
                                }
                            </div>
                        </div>
                    </>

            }
            {<CreateOfferContainer isOpen={isCreateOfferContainerVisible} handleClose={handleToggleCreateOfferContainer}/>}
        </>
    )
}

export default MainContent;