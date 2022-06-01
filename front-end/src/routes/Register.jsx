import React from 'react';

const style = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: '#FAFAFA',
        padding: "100px 80px",
    },
    content: {
        margin: "0 auto",
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    }
}

function Register() {
    const [registerType, setRegisterType] = React.useState(null);

    const ActiveComponent = () => {
        switch (registerType) {
            case null:
                return <div>Select Register Type</div>
            case 'employee':
                return <div>Employee</div>
            case 'company':
                return <div>Company</div>
            default:
                return <div>Loading...</div>
        }
    }

    return (
        <div className="w-full h-full bg-primary">
            <div style={style.container} className={"container h-full bg-slate-50"}>
                <div style={style.content} className={"h-full"}>
                    <h1>This is a test</h1>
                    <ActiveComponent />
                </div>
            </div>
        </div>
    );
}

export default Register;