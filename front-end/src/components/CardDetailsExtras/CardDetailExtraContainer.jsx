import React from 'react';

const style = {
    bottomContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '100px',
        width: '100%',
        position: 'absolute',
        bottom: 0,
        borderTop: 'solid 1px rgba(0,0,0,0.25)'
    },
    button: {
        backgroundColor: '#4064AC',
        color: 'white',
        fontSize: '10px'
    },
    counterText: {
        fontWeight: 500,
        fontSize: '13px'
    }
}

function CardDetailExtraContainer({counter ,buttonText, handleClick}) {
    return (
        <div style={style.bottomContainer}>
            {counter &&
                <div className='mb-5 m-2' style={style.counterText}>
                    <p className='text-sm opacity-50'>{counter.title}: {counter.count}</p>
                </div>
            }
            <button onClick={handleClick} className='mr-5 mb-4 p-2 pl-6 pr-6 rounded-full' style={style.button}>
                <p className="text-sm">{buttonText}</p>
            </button>
        </div>
    );
}

export default CardDetailExtraContainer;