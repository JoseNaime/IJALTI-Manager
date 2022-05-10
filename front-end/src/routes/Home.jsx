import React, { useEffect} from 'react';
import {useNavigate} from "react-router-dom";


function Home() {
    const user = JSON.parse(localStorage.getItem('user'));
    const navigate = useNavigate();

    useEffect(() => {
        if (!user)  navigate('/login')

        // eslint-disable-next-line
    },[user])


    return (
        <div>
            <h1>Home</h1>

        </div>
    );
}

export default Home;