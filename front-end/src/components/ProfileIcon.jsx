import React from 'react'
import ProfilePicture from "../assets/images/employee_profileIcon.png";

function ProfileIcon() {

    const style = {
        img: {
            position: 'absolute',
            boxShadow: '0 0 10px 0 rgba(0,0,0,0.1)',
            top: '15px',
            right: '15px',
            width: '4.5rem',
            height: '4.5rem',
            background: '#FFFFFF',
            borderRadius: '50%'
        }
    }
    return (
        <div><img src={ProfilePicture} alt='Profile Icon' style={style.img}></img></div>
    )
}

export default ProfileIcon