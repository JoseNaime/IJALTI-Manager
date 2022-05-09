import React from 'react';
import LoginForm from "../components/Forms/LoginForm";
import LoginImg from "../assets/images/login.jpg";
import Logo from "../assets/images/logo.png";

function Login(props) {
    return (
        <div id="login" className="flex flex-row-reverse h-full">

            <img className="right basis-2/3 h-full object-cover" alt="Login" src={LoginImg} />

            <div className="left basis-1/3 bg-light-gray">
                <div className="flex flex-col h-full items-center text-center justify-between py-16 px-20">
                    <div>
                        <img src={Logo} alt="Logo"/>
                    </div>
                    <div className="w-full">
                        <LoginForm/>
                    </div>
                    <div>
                        <p className="text-xl">Nuevo por aqui?</p>
                        <button className="primary-squared">Registrate</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;