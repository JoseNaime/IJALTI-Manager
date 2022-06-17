import React, {useContext, useEffect, useState} from 'react';
import {MENU_OPTIONS_BY_ROLE} from '../json/MENU_OPTIONS_BY_ROLE'

import {GlobalContext} from "../components/GlobalProvider";
import useFetch from '../customHooks/useFetch';
import ProfileContainer from "../components/ProfileContainer";
import ProfileContent from "../components/ProfileContent";
import Menu from "../components/Menu";

function Account({apiUrl}) {
    const {user} = useContext(GlobalContext);
    const {data, isLoading} = useFetch({url: apiUrl, method: "GET", params: {email: user.email}});
    //const [userInfo, setUserInfo] = useState(null);
    const [menuOptions, setMenuOptions] = useState([]);

    const userInfo = data;


    useEffect(() => {
        if (user.role){
            setMenuOptions(MENU_OPTIONS_BY_ROLE[user.role]);
        }
    }, [user.role]);

    return (
        <>
            <ProfileContainer>
                {userInfo &&
                    <>
                        <ProfileContent userInfo={userInfo} />
                        <Menu menuOptions={menuOptions} />
                    </>
                }
                {isLoading && <div>Loading...</div>}
            </ProfileContainer>
        </>
    )
}

export default Account;