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

}

function ProfileContainer({children}) {

    //console.log(profileInfo[0].username);

    return (
        <div style={style.background} className="w-full h-full bg-gray">
            <div style={style.container} className={"w-full h-full bg-slate-50"}>
                <div className={"h-full w-full text-left"}>
                    {children}
                </div>
            </div>
        </div>

    );
}

export default ProfileContainer;