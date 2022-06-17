import React from 'react'
import CreateOfferForm from "./Forms/CreateOfferForm";

const style = {
    container: {
        position: "absolute",
        padding: '30px',
        boxShadow: '0px 4px 20px 0px rgba(0,0,0,0.2)',
        backgroundColor: '#FFFFFF',
        borderRadius: '35px',
        width: "920px",
        height: "auto",
        left: "50%",
        top: "50%",
        transform: 'Translate(-50%, -50%)',
        zIndex: "30",
    },
    blur: {
        position: "absolute",
        height: "100%",
        width: "100%",
        top: 0,
        left: 0,
        backgroundColor: 'rgba(0,0,0,0.25)',
        backdropFilter: "blur(3px)",
        zIndex: "20"
    },
    btn: {
        position: "relative",
        backgroundColor: "var(--primary)",
        width: "15%",
        color: "white",
        fontWeight: "lighter",
        height: "30px",
        borderRadius: "5px",
        transform: 'TranslateY(2000%) TranslateX(-10%)',

    }
}

function CreateOfferContainer({isOpen = false, handleClose}) {
    return (
        <>
            {isOpen &&
                <>
                    <div style={style.blur}></div>
                    <div style={style.container}>
                        <button onClick={handleClose}>X</button>
                        <CreateOfferForm />
                    </div>
                </>
            }
        </>
    )
}

export default CreateOfferContainer