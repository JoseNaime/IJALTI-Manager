import React from 'react';

const style= {
    container: {
        position: 'absolute',
        backgroundColor: 'white',
        height: "400px",
        width: "80%",
        top: '-1px',
        left: '50%',
        transform: 'translate(-50%, -100%)',
        boxShadow: '0px -2px 10px rgba(0,0,0,0.10)',
    }
}

function OfferApplicationsContainer({offerApplications}) {
    return (
        <div style={style.container} className="rounded-t-xl">

        </div>
    );
}

export default OfferApplicationsContainer;