import React, {useContext, useEffect} from 'react'
import {GlobalContext} from "./components/GlobalProvider";

import {useNavigate} from 'react-router-dom';

function App() {
    const {user} = useContext(GlobalContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/login', {replace: true})
        }
    });

    return (
        <>
        </>
    );
}

export default App;
