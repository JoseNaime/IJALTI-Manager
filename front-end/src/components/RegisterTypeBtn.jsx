import React from 'react';

const style = {
    container: {
        padding: '20px',
        boxShadow: '0px 4px 20px 0px rgba(0,0,0,0.05)',
        backgroundColor: '#FFFFFF',
        borderRadius: '35px',
        width: "250px",
        height: "185px",
    }
}

function RegisterTypeBtn({children, image, onClick}) {
    return (
        <div onClick={onClick} style={style.container} className="register-type-btn">
            <img className="m-auto" src={image} alt="" />
            <p>{children}</p>
        </div>
    );
}

export default RegisterTypeBtn;