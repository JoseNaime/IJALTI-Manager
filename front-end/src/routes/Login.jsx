import React, {useEffect} from 'react';
import LoginForm from "../components/Forms/LoginForm";


function Login(props) {

    useEffect(() => {
    })
    return (
        <div id="login" className="flex h-full">
            <div className="left basis-1/3 bg-light-gray">
                <div className="flex flex-col h-full items-center text-center justify-between py-16 px-20">
                    <div>
                        <h1 className="text-3xl font-bold text-center">Logo</h1>
                    </div>
                    <div className="w-full">
                        <h2 className="mb-10 text-4xl">LOGIN</h2>
                        <LoginForm/>
                    </div>
                    <div>
                        <p className="text-xl">Nuevo por aqui?</p>
                        <button className="primary-squared">Registrate</button>
                    </div>
                </div>
            </div>
            <div className="right basis-2/3">

            </div>
        </div>
    );
}

export default Login;