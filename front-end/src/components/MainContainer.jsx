import React, {useContext, useEffect, useState} from 'react';
import PatronFondo from "../assets/images/patron_fondo.png";
import Menu from "./Menu";
import ProfileIcon from "./ProfileIcon";
import {MENU_OPTIONS_BY_ROLE} from "../json/MENU_OPTIONS_BY_ROLE";
import {GlobalContext} from "./GlobalProvider";

const style = {
    background: {
        backgroundImage: `url(${PatronFondo})`,
    },
    container: {
        margin: 'auto',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
        boxShadow: '0 0 50px 0 rgba(0,0,0,0.2)',
        padding: "0px 0px",
        width: '1000px',
    },
    content: {
        margin: "0 auto",
        display: 'flex',
        flexDirection: 'row',
    },
    splitLine: {
        height: "100vh",
        border: "none",
        borderLeft: "1px solid #A6A6A6",
        width: "1px",
        position: "absolute",
        opacity: "0.35",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
    }
}

function MainContainer({children}) {
    const {user} = useContext(GlobalContext);
    const [menuOptions, setMenuOptions] = useState([]);

    useEffect(() => {
            console.log("Menu Options: " + JSON.stringify(MENU_OPTIONS_BY_ROLE[user.role]))
            setMenuOptions(MENU_OPTIONS_BY_ROLE[user.role]);
        }, [user.role]);

    return (
        <div style={style.background} className="w-full h-full bg-gray">
            <div style={style.container} className={"w-full h-full bg-slate-50"}>
                <div style={style.content} className={"h-full w-full text-center"}>
                    <hr style={style.splitLine} />
                    {children}
                    <Menu menuOptions={menuOptions} />
                    <ProfileIcon />
                </div>
            </div>
        </div>
    );
}

export default MainContainer;