import React from 'react'
import SkillsContainer from './SkillsContainer'
import CompanyIconTest from "../assets/images/icons/company_icon_test.png"
import Status from './Status'

const CardDetails = ({icon,title,description,status,date,socialMedia}) => {
  
    const style = {
        h1: {
            fontWeight: "bold",
            fontSize: "24px"
        },

        h2: {
            fontWeight: "bold",
            fontSize: "16px"
        },

        details: {
            fontWeight: "400",
            fontSize: "0.8rem",
            opacity: "0.5"
        },

        icon: {
          width: '100px',  
        }
    }
  
    return (
    <div className='flex flex-col basis-1/2'>
        <div className='mt-3 flex flex-row gap-x-5'>
            <div>
                <img style={style.icon} className={"mx-4"} src={CompanyIconTest} alt={title + "_icon"} />
            </div>

            <div className='flex flex-row justify-between w-full'>
                <div className='flex flex-col justify-center text-left w-full'>
                    <div className='flex flex-row justify-between'>
                        <h1 style={style.h1}>Título de la Oferta</h1>
                        <div className='mt-auto mb-auto'>
                            <Status status={"active"} fullForm={true}/>
                        </div>
                    </div>

                    <div style={style.details} className='flex flex-row'>
                        <p>Compañía |</p>
                        <p>| Guadalajara, Jalisco |</p>
                        <p>| 20/01/2021</p>
                    </div>
                </div>

                
            </div>
        </div>

        <hr className='mt-10 mb-5'/>

        <SkillsContainer/>

        <div className='mt-5 flex flex-col gap-4 text-left'>
            <h2 style={style.h2}>Descripción</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel minus voluptates velit nihil, reprehenderit mollitia quidem quibusdam sint recusandae vitae aliquam adipisci dicta numquam est quis ullam temporibus quam. Suscipit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni reiciendis commodi unde officiis voluptates cumque veniam exercitationem inventore, velit cupiditate, saepe accusantium perspiciatis! Nesciunt aspernatur architecto excepturi quo ab provident?</p>
        </div>

    </div>
  )
}

export default CardDetails