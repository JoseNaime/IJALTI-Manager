import React from 'react';
import SkillsContainer from './SkillsContainer';
import ProfilePicture from "../assets/images/employee_profileIcon.png";
import Status from './Status';

const ProfileContent = ({userInfo}) => {

    // console.log(data);

    const style = {
        h1: {
            fontWeight: "bold",
            fontSize: "24px"
        },
        details: {
            fontWeight: "400",
            fontSize: "0.8rem",
            opacity: "0.5"
        },
        icon: {
            width: '115px',
            borderRadius: '50%'
        },
        rightContainer: {
            marginRight: '-650px',
            marginTop: '-307px',
            //width: '28%',
            //backgroundColor: "#5AFFF8"
        },
        leftContainer: {
            // marginRight: '10px', // 24
            marginLeft: '40px', // 2
            marginTop: '25px', // 3
            width: '60%',
            //backgroundColor: "#5AFFB8"
        },
        counterText: {
            fontWeight: 500,
            fontSize: '13px'
        },
        horizontalLine: {
            opacity: "0.15"
        },
        verticalLine: {
            transform: 'rotate(90deg)',
            marginLeft: '100px'
        },
        line: {
            //backgroundColor: "#6AFFF8",
            height: '1000px',
            width: '20px'
        }
    }

    return (
        <>
            <div id='header' className='mt-8 mb-8 ml-8 flex flex-row gap-x-5'>
                <img style={style.icon} className={""} src={ProfilePicture} alt= "_icon" />
                <div className='flex flex-col justify-center text-left'>
                    <h1 style={style.h1}>John Doe</h1>
                    <h2 className="font-medium opacity-40">{userInfo.rolactual}</h2>
                </div>
                {/* <ContactsContainer /> */}
            </div>
            <hr style={style.horizontalLine} />

            <div id='bottomContent' >
                <div id='desc' className='flex flex-col text-left gap-10' style={style.leftContainer}>
                    <div>
                        <h2 className="font-medium text-xl opacity-60">Sobre mí:</h2>
                        <p>Lorem ipsum dolor sit amet, dolores interesset cu sea, eum et eruditi sententiae. Assum scripta mandamus cu quo, dicant maiestatis consetetur sea no, eum aperiam molestiae eu. Cu sea error congue partem. Ipsum postulant dissentias ad pro. Doming adipisci partiendo per te, eos id quem noluisse patrioque, mei congue tation ne. Te his falli tibique iracundia, adversarium vituperatoribus ei pri, ne vel falli nostrud. At ius falli quando imperdiet, agam tibique vituperata quo id. </p>
                    </div>
                    <div>
                        <h2 className="font-medium text-xl opacity-60">Experiencia:</h2>
                    </div>
                    <div>
                        <h2 className="font-medium text-xl opacity-60">Educación:</h2>
                    </div>
                </div>

                <div id='skills' style={style.rightContainer}>
                    <h2 className="font-medium text-xl opacity-60">Habilidades (Años):</h2> 
                    <SkillsContainer skills={userInfo.habilidades}/> 
                </div>
            </div>
        </>
    )
}

export default ProfileContent;