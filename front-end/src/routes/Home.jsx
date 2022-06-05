import React, {useContext, useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import {GlobalContext} from "../components/GlobalProvider";
import PatronFondo from '../assets/images/patron_fondo.png';

function Home() {
    //const user = JSON.parse(localStorage.getItem('user'));
    const {logout, user, getUser} = useContext(GlobalContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!getUser) navigate('/login')
    }, [getUser, navigate, user])

    const style = {
        background: {
            backgroundImage: `url(${PatronFondo})`,
        },
        container: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            backgroundColor: '#F6F6F6',
            boxShadow: '0 0 50px 0 rgba(0,0,0,0.2)',
            padding: "100px 80px",
        },
        content: {
            margin: "0 auto",
            display: 'flex',
            flexDirection: 'column',
        }
    }

    return (
        <div style={style.background} className="w-full h-full bg-light-gray">
            <div style={style.container} className={"container h-full bg-slate-50"}>
                <div style={style.content} className={"h-full w-full text-center"}>
                </div>
            </div>
        </div>
    );
}

export default Home;