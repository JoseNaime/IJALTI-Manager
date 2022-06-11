import React, {useContext, useState} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faAngleRight} from '@fortawesome/free-solid-svg-icons'
import {GlobalContext} from "./GlobalProvider";

const style = {
    containerHidden: {
        backgroundColor: '#FFFFFF',
        boxShadow: '0 0 10px 0 rgba(0,0,0,0.1)',
        padding: "10rem 10px",
        position: 'absolute',
        width: '10.5rem',
        top: '50%',
        left: '-10.4rem',
        transform: 'TranslateY(-50%)',
        transition: 'left 1s'
    },
    container: {
        backgroundColor: '#FFFFFF',
        boxShadow: '0 0 10px 0 rgba(0,0,0,0.1)',
        padding: "10rem 10px",
        position: 'absolute',
        width: '10.5rem',
        top: '50%',
        left: '0',
        transform: 'TranslateY(-50%)',
        transition: 'left 1s'
    },
    content: {
        position: 'relative',
        bottom: '8.3rem',
        left: '0.5rem',
    },
    current: {
        color: "#4064AC",
        fontWeight: 700
    },
    black: {
        fontWeight: 310
    },
    logout: {
        color: "#C35A5A",
        position: 'relative',
        top: '8.6rem',
        left: '1.3rem'
    },
    hr: {
        color: '#DBDBDB',
        position: 'relative',
        width: '7.6rem',
        top: '6.4rem',
        left: '0.7rem'
    },
    click: {
        position: 'absolute',
        top: '50%',
        left: '79%',
        transform: 'TranslateY(-50%)',
        width: '60px',
        height: '60px',
        background: '#FFFFFF'
    },
    iconContainer: {
        width: '100%',
        height: '100%',
        position: 'relative'
    },
    arrow: {
        position: 'absolute',
        top: '36%',
        left: '67%',
        transform: 'Translate(-50% -50%)'
    }
}

function Menu({menuOptions, onClick}) {
    const [toggle, setToggle] = useState(false)
    const {logout} = useContext(GlobalContext)

    const toggleMenu = () => setToggle(!toggle);

    return (
        <>
            <div style={toggle ? style.containerHidden : style.container} className="rounded-r-[12px] text-left">
                <div style={style.content} className="flex flex-col gap-y-3">
                    {menuOptions && menuOptions.map((option, index) => {
                        return (
                            <p onClick={() => console.log(option.url)}>{option.name}</p>
                        )
                    })}

                    {/*<p style={sampleLocation.pathname === "/aplicaciones" ? style.current : style.black}><a href="/aplicaciones">Mis aplicaciones</a></p>
                <p style={sampleLocation.pathname === "/" ? style.current : style.black}><a href="/ofertas">Ofertas</a></p>
                <p style={sampleLocation.pathname === "/perfil" ? style.current : style.black}><a href="/perfil">Mi perfil</a></p>*/}
                </div>
                <p style={style.logout} onClick={() => logout()}>Cerrar Sesión</p>
                <hr style={style.hr}></hr>
                <div style={style.click} className="rounded-[50%]" onClick={toggleMenu}>
                    <div style={style.iconContainer}><FontAwesomeIcon icon={faAngleRight} style={style.arrow} className={toggle ? "arrow" : "rotate-180"}/></div>
                </div>
            </div>
        </>
    )
}

export default Menu