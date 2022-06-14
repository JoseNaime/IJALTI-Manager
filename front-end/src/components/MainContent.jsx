import React, {useEffect, useState} from 'react';
import useFetch from "../customHooks/useFetch";
import CardsContainer from "./CardsContainer";
import CardDetails from "./CardDetails";

function MainContent({apiUrl, params}) {
    const {data, isLoading, error} = useFetch({url: apiUrl, method: "GET", params: params});
    const [cardsInfo, setCardsInfo] = useState([]);
    const [selectedCardInfo, setSelectedCardInfo] = useState(null);

    const handleCardClick = (cardInfo) => {
        console.log(cardInfo)
        setSelectedCardInfo(cardInfo)
    }

    useEffect(() => {
        if (data) {
            setCardsInfo(data);
            setSelectedCardInfo(data[0]);
        }
    }, [data]);

    return (
        <>
            {selectedCardInfo &&
                <>
                    <CardsContainer data={cardsInfo}
                                    selectedCardInfoId={selectedCardInfo.empleoid}
                                    handleCardClick={handleCardClick} />
                    <CardDetails
                        cardInfo={selectedCardInfo}
                    />
                </>
            }
            {isLoading && <div>Loading...</div>}
            {error && <div>Error: {error.message}</div>}
        </>
    )
}

export default MainContent;