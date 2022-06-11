import React, {useContext, useEffect} from 'react';
import LoginForm from "../components/Forms/LoginForm";
import LoginImg from "../assets/images/login.jpg";
import Logo from "../components/Logo";
import {useNavigate} from "react-router-dom";
import {GlobalContext} from "../components/GlobalProvider";

function Login(props) {
    const navigate = useNavigate();
    const {getUser} = useContext(GlobalContext);

    useEffect(() => {
        //console.log(getUser());
        if (getUser() !== null) navigate('/')

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div id="login" className="flex flex-row-reverse h-full">

            <img className="right basis-2/3 h-full object-cover" alt="Login" src={LoginImg} />

            <div className="left basis-1/3 bg-light-gray">
                <div className="flex flex-col h-full items-center text-center justify-between py-16 px-20">
                    <Logo />
                    <div className="w-full">
                        <LoginForm/>
                    </div>
                    <div>
                        <p className="text-xl">Nuevo por aqui?</p>
                        <button onClick={() => navigate("/register")} className="primary-squared">Registrate</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;