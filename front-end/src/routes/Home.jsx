import React, {useContext, useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import {GlobalContext} from "../components/GlobalProvider";


function Home() {
    //const user = JSON.parse(localStorage.getItem('user'));
    const {logout, user} = useContext(GlobalContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user)  navigate('/login')

        // eslint-disable-next-line
    },[user])


    return (
        <div>
            <h1>Home</h1>
            {user && <div>
                <p>Bienvenido {user.username}</p>
                <button onClick={logout}>Log out</button>
            </div>}


        </div>
    );
}

export default Home;