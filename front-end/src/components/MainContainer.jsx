import React from 'react';
import PatronFondo from "../assets/images/patron_fondo.png";

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

function MainContainer({children}) {
    return (
        <div style={style.background} className="w-full h-full bg-gray">
            <div style={style.container} className={"w-full h-full bg-slate-50"}>
                <div style={style.content} className={"h-full w-full text-center"}>
                    <hr style={style.splitLine} />
                    {children}
                </div>
            </div>
        </div>
    );
}

export default MainContainer;