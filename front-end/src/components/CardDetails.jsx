import React from 'react'
import SkillsContainer from './SkillsContainer'

const CardDetails = ({icon,title,description,status,date,socialMedia}) => {
  
    const style = {
        h1: {
            fontWeight: "bold",
            fontSize: "2rem"
        },

        details: {
            fontWeight: "400",
            fontSize: "0.8rem",
            opacity: "0.5"
        }
    }
  
    return (
    <>
        <div className='mt-3 flex flex-row gap-x-5'>
            <div>
                
            </div>

            <div className='flex flex-row justify-between w-full'>
                <div className='flex flex-col text-left'>
                    <div>
                        <h1 style={style.h1}>Título de la Oferta</h1>
                    </div>

                    <div style={style.details} className='flex flex-row'>
                        <p>Compañía |</p>
                        <p>| Guadalajara, Jalisco |</p>
                        <p>| 20/01/2021</p>
                    </div>
                </div>

                <div>
                    <p>Activo</p>
                </div>
            </div>
        </div>

        <hr className='mt-10 mb-5'/>

        <SkillsContainer/>

        <div className='mt-5 flex flex-col gap-4 text-left'>
            <h3>Descripción</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel minus voluptates velit nihil, reprehenderit mollitia quidem quibusdam sint recusandae vitae aliquam adipisci dicta numquam est quis ullam temporibus quam. Suscipit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni reiciendis commodi unde officiis voluptates cumque veniam exercitationem inventore, velit cupiditate, saepe accusantium perspiciatis! Nesciunt aspernatur architecto excepturi quo ab provident?</p>
        </div>

    </>
  )
}

export default CardDetails