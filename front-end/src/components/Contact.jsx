import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';

function Contact({icon, name}) {
    const style = {
        container: {
            display: 'flex',
            flexDirection: 'row',
        },
        icon: {
            width: "24px",
            height: "24px",
        },
        content: {
            display: 'flex',
            justifyContent: 'center',
        }
    }

    return (
        <div style={style.container}>
            <img style={style.icon} src={icon} alt={name + "_icon"} />
            <div style={style.content} className="px-3 flex items-center">
                <p className="h-fit text-xs opacity-70">{name}</p>
            </div>
        </div>
    );
}

export default Contact;