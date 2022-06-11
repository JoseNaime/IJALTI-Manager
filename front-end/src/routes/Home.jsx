import React, {useContext, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";

import {MENU_OPTIONS_BY_ROLE} from "../json/MENU_OPTIONS_BY_ROLE";
import {GlobalContext} from "../components/GlobalProvider";

import useFetch from "../customHooks/useFetch";

import CardsContainer from "../components/CardsContainer";
import CardDetails from '../components/CardDetails';
import Menu from '../components/Menu';
import ProfileIcon from '../components/ProfileIcon';
import MainContainer from "../components/MainContainer";

function RouteTest({apiUrl, params}) {
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
        </>
    )
}

function Home() {
    // Fetch data
    const {getUser, user} = useContext(GlobalContext);
    const [menuOptions, setMenuOptions] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        //console.log(getUser());
        if (getUser() === null) navigate('/login');

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        console.log(user);
        if (user)
            setMenuOptions(MENU_OPTIONS_BY_ROLE[user.role]);

    }, [user]);


    return (
        <MainContainer>
            <RouteTest
                apiUrl={"/buscarEmpleos"}
            />

            {/*{user &&
                <RouteTest
                    apiUrl={"/aplicacionesUsuario"}
                    params={{"email": user.email}}
                />
            }*/}


            <Menu menuOptions={menuOptions} />
            <ProfileIcon />
        </MainContainer>
    );
}

export default Home;