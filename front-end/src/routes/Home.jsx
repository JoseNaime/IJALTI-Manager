import React, {useContext, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {GlobalContext} from "../components/GlobalProvider";
import PatronFondo from '../assets/images/patron_fondo.png';
import CardsContainer from "../components/CardsContainer";
import CardDetails from '../components/CardDetails';
import Menu from '../components/Menu';
import CompanyIconTest from "../assets/images/icons/company_icon_test.png";
import ProfileIcon from '../components/ProfileIcon';

function Home() {
    const [currentCardId, setCurrentCardId] = useState(null);
    const {getUser} = useContext(GlobalContext);
    const navigate = useNavigate();

    const handleCardClick = (id) => {
        console.log(id);
        setCurrentCardId(id)
    }

    useEffect(() => {
        //console.log(getUser());
        if (getUser() === null) navigate('/login')

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const style = {
        background: {
            backgroundImage: `url(${PatronFondo})`,
        },
        container: {
            margin: 'auto',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            backgroundColor: '#FFFFFF',
            boxShadow: '0 0 50px 0 rgba(0,0,0,0.2)',
            padding: "0px 0px",
            position: 'relative',
            width: '1000px',
        },
        content: {
            margin: "0 auto",
            display: 'flex',
            flexDirection: 'row',
        },
        splitLine: {
            height: "100vh",
            border: "none",
            borderLeft: "1px solid #A6A6A6",
            width: "1px",
            position: "absolute",
            opacity: "0.35",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
        }
    }

    return (
        <div style={style.background} className="w-full h-full bg-gray">
            <div style={style.container} className={"h-full bg-slate-50"}>
                <div style={style.content} className={"h-full w-full text-center"}>
                    <CardsContainer handleCardClick={handleCardClick}/>
                    <hr style={style.splitLine}/>
                    <CardDetails
                        icon={CompanyIconTest}
                        title={'Titulo de Oferta'}
                        location={'Guadalajara, Jalisco'}
                        description={'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel minus voluptates velit nihil, reprehenderit mollitia quidem quibusdam sint recusandae vitae aliquam adipisci dicta numquam est quis ullam temporibus quam. Suscipit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni reiciendis commodi unde officiis voluptates cumque veniam exercitationem inventore, velit cupiditate, saepe accusantium perspiciatis! Nesciunt aspernatur architecto excepturi quo ab provident?'}
                        optional = {{
                            status: 'active',
                            date: '20/01/2021',
                            buttonText: 'Ver Solicitudes',
                            buttonFunction: 'si',
                            counter: 200
                        }}
                    />
                </div>
            </div>
            <Menu/>
            <ProfileIcon/>
        </div>
    );
}

export default Home;