import React from 'react'
import SkillsContainer from './SkillsContainer'
import CompanyIconTest from "../assets/images/icons/company_icon_test.png"
import Status from './Status'

const CardDetails = ({id,icon,title,location,description,optional}) => {
  
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
          width: '100px',  
        }
    }
  
    return (
    <div className='flex flex-col basis-1/2'>
        <div className='w-full h-full pl-5'>
            <div className='mt-3 flex flex-row gap-x-5'>
                <div>
                    <img style={style.icon} className={""} src={CompanyIconTest} alt={title + "_icon"} />
                </div>

                <div className='flex flex-row justify-between w-full'>
                    <div className='flex flex-col justify-center text-left w-full'>
                        <div className='flex flex-row justify-between'>
                            <h1 style={style.h1}>{title}</h1>
                            {optional.status &&
                                <div className='mt-auto mb-auto'>
                                    <Status status={"active"} fullForm={true}/>
                                </div>
                            }
                        </div>

                        <div style={style.details} className='flex flex-row gap-2'>
                            <p>Compañía |</p>
                            <p>{location} |</p>
                            <p>{optional.date} </p>
                        </div>
                    </div>


                </div>
            </div>

            <hr className='mb-8 opacity-25' />

            <div className="flex flex-col gap-5">
                <SkillsContainer
                    skills={['JavaScript', 'Python', 'C++', 'R', 'Ensamblador', "Golang"]}
                />
                <div className='mt-3 flex flex-col gap-4 text-left'>
                    <h2 className="text-xl">Descripción</h2>
                    <p>{description}</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CardDetails