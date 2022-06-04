import React from 'react';
import LogoImg from "../assets/images/logo.png";

function Logo() {
    return (
        <div >
            <img className="m-auto py-5 px-3" src={LogoImg} alt="Logo"/>
        </div>
    );
}

export default Logo;