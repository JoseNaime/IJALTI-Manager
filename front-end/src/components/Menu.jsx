import React, {useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons'

function Menu() {

    const [toggle, setToggle] = useState(false)

    const toggleMenu = () => setToggle(!toggle);

    const style = {
        containerhidden: {
            backgroundColor: '#FFFFFF',
            boxShadow: '0 0 30px 0 rgba(0,0,0,0.2)',
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
            boxShadow: '0 0 30px 0 rgba(0,0,0,0.2)',
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
            fontWeight: 310
        },
        current: {
            color: "#4064AC"
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
    return (
        <>
        <div style={toggle ? style.containerhidden : style.container} className="rounded-[12px]">
            <div style={style.content} className="flex flex-col gap-y-3">
                <p><a href="/aplicaciones">Mis aplicaciones</a></p>
                <p style={style.current} className="font-bold"><a href="/ofertas">Ofertas</a></p>
                <p><a href="/perfil">Mi perfil</a></p>
            </div>
            <p style={style.logout}><a href="/cerrar">Cerrar Sesión</a></p>
            <hr style={style.hr}></hr>
            <div style={style.click} className="rounded-[50%]" onClick={toggleMenu}>
                <div style={style.iconContainer}><FontAwesomeIcon icon={faAngleRight} style={style.arrow} className={toggle ? "arrow" : "rotate-180"}/></div>
            </div>
        </div>
        </>
    )
}

export default Menu