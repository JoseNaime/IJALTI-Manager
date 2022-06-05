import React from 'react';

function Card({icon, title, description, optional}) {

    const style={
        container: {
            position: 'relative',
            display: 'flex',
            flexDirection: 'row',
            height: '85px',
            borderBottom: '1px solid rgba(0,0,0,0.25)',
        },
        icon: {
            height: '55px',
            width: '55px',
        },
        mainContent: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
        },
        optionals: {
            position: 'absolute',
            width: '100%',
            height: '100%',
        },
        topRight: {
            position: 'absolute',
            top: '0',
            right: '0',
        },
        bottomRight: {
            position: 'absolute',
            bottom: '0',
            right: '0',
        }
    }

    return (
        <div style={style.container}>
            <div style={style.mainContent}>
                <img style={style.icon} src={icon} alt={title+"_icon"}/>
                <div className="text-left">
                    <h3>{title}</h3>
                    <p className="w-72">{description}</p>
                </div>
            </div>
            <div style={style.optionals}>
                <div style={style.topRight}>
                    TopRight
                </div>
                <div style={style.bottomRight}>
                    BottomRight
                </div>
            </div>
        </div>
    );
}

export default Card;