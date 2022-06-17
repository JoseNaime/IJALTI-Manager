import React from 'react';
import SkillsContainer from './SkillsContainer';
import ProfilePicture from "../assets/images/employee_profileIcon.png";
import CardsContainer from "./CardsContainer";

const ProfileContent = ({userInfo}) => {

    const style = {
        icon: {
            width: "100px",
        },
        horizontalLine: {
            borderBottom: "1px solid #A6A6A6",
            color: "#A6A6A6",
            border: "solid 0.5px #000",
            opacity: "25%"
        },
        verticalLine: {
            border: "none",
            borderLeft: "1px solid #A6A6A6",
            width: "1px",
            opacity: "0.35",
            height: "100vh",
            position: "absolute",
            top: "-40px",
        },
    }

    return (<>
        <div id='header' className='mt-8 mb-8 ml-8 flex flex-row gap-x-5'>
            <img style={style.icon} className={"rounded-full"} src={ProfilePicture} alt="_icon" />
            <div className='flex flex-col justify-center text-left'>
                <h1 style={style.h1} className="text-4xl font-bold">{userInfo.nombre} {userInfo.apellido}</h1>
                <h2 className="font-medium opacity-40">{userInfo.rolactual}</h2>
            </div>
            {/* <ContactsContainer /> */}
        </div>
        <hr style={style.horizontalLine} />

        <div id='bottomContent' className="flex text-left p-10 gap-4">
            <div style={{flex: 2}} className='flex flex-col flex-2 gap-5'>
                {userInfo.biografia && <div>
                    <h2 className="font-medium text-xl opacity-60">Sobre mí:</h2>
                    <p>{userInfo.biografia}</p>
                </div>}
                {userInfo.experiencias.length > 0 && <div>
                    <h2 className="font-medium text-xl opacity-60">Experiencia:</h2>
                    <CardsContainer data={userInfo.experiencias}
                                    noTopPadding={true}
                                    canSelect={false}
                                    showFilters={false}
                    />
                </div>}
                {userInfo.educaciones.length > 0 && <div>
                    <h2 className="font-medium text-xl opacity-60">Educación:</h2>
                    <CardsContainer data={userInfo.educaciones}
                                    showFilters={false}
                                    canSelect={false}
                                    noTopPadding={true}
                                    fieldNames={{
                                        title: 'titulo',
                                        subTitle: 'escuela',
                                        description: 'tipoeducacion',
                                    }} />
                </div>}


            </div>
            <div className="relative h-full">
                <div style={style.verticalLine} />
            </div>
            <div className="flex-1">
                <SkillsContainer skills={userInfo.habilidades} />
            </div>
        </div>
    </>)
}

export default ProfileContent;