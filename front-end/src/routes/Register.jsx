import React from 'react';
import RegisterType from "../components/RegisterType";
import Logo from "../components/Logo";
import RegisterEmployee from "../components/Forms/RegisterEmployee";
import RegisterCompany from "../components/Forms/RegisterCompany";

const style = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: '#f6f6f6',
        boxShadow: '0 0 50px 0 rgba(0,0,0,0.2)',
        padding: "100px 80px",

    },
    content: {
        margin: "0 auto",
        display: 'flex',
        flexDirection: 'column',
    }
}

function Register() {
    const [registerType, setRegisterType] = React.useState(null);

    const ActiveRegisterComponent = () => {
        switch (registerType) {
            case null:
                return <RegisterType setRegisterType={setRegisterType}/>
            case 'usuario':
                return <RegisterEmployee registerType={registerType}/>
            case 'empresa':
                return <RegisterCompany registerType={registerType}/>
            default:
                return <div>Loading...</div>
        }
    }

    return (
        <div className="w-full h-full bg-primary">
            <div style={style.container} className={"container h-full bg-slate-50"}>
                <div style={style.content} className={"h-full w-full text-center"}>
                    <Logo />
                    <ActiveRegisterComponent />
                </div>
            </div>
        </div>
    );
}

export default Register;