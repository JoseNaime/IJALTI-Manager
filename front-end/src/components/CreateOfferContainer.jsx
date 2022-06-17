import React from 'react'
import CreateOfferForm from './Forms/CreateOfferForm'

const style = {
    container: {
        position: "absolute",
        padding: '30px',
        boxShadow: '0px 4px 20px 0px rgba(0,0,0,0.2)',
        backgroundColor: '#FFFFFF',
        borderRadius: '35px',
        width: "920px",
        height: "670px",
        transform: 'TranslateY(8.2%) TranslateX(4.3%)',
        //justifyContent: "center"
    },
    blur: {
        position: "absolute",
        height: "100%",
        width: "69%",
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        backdropFilter: "blur(5px)",
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

function CreateOfferContainer() {
  return (
    <>
        <div style={style.blur}></div>
        <div style={style.container}>
            {/* <button className="primary-squared" style={style.btn}>Crear</button> */}
            <CreateOfferForm />
        </div>
    </>
  )
}

export default CreateOfferContainer