import React, {useContext, useEffect, useState} from 'react';
import { MENU_OPTIONS_BY_ROLE } from '../json/MENU_OPTIONS_BY_ROLE'
import {GlobalContext} from "./GlobalProvider";
import ProfileContainer from './ProfileContainer'
import ProfileContent from './ProfileContent'
import Menu from './Menu'
import useFetch from '../customHooks/useFetch';


function Account({registerType: usuario}) {
    const {user} = useContext(GlobalContext);
    const [userInfo, setUserInfo] = useState(null);
    const [menuOptions, setMenuOptions] = useState([]);

    const {data, isLoading, error} = useFetch({url: "/userInfo", method: "GET", params: {email: user.email}});

    useEffect(() => {
        if (data) {
            setUserInfo(data);
            console.log(data);
        }
    }, [data]);

    useEffect(() => {
        setMenuOptions(MENU_OPTIONS_BY_ROLE[user.role]);
    }, [user.role]);

    return (
    <>
        {userInfo && <ProfileContainer>
             <ProfileContent userInfo={userInfo}/>
            <Menu menuOptions={menuOptions} />
        </ProfileContainer> }
    </>
    )
}

export default Account;