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
        },
        bottomContainer: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '100px',
            width: '100%',
            position: 'absolute',
            bottom: 0,
            borderTop: 'solid 1px rgba(0,0,0,0.25)'
        },
        botonFondo: {
            backgroundColor: '#4064AC',
            color: 'white',
            fontSize: '10px'
        },
        counterText: {
            fontWeight: 500,
            fontSize: '13px'
        }
    }
  
    return (
    <div className='flex flex-col basis-1/2'>
        <div className='w-auto h-full mx-5 relative'>
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
                                    <Status status={optional.status} fullForm={true}/>
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
            {optional.buttonText &&
                <div style={style.bottomContainer}>
                    {optional.counter &&
                        <div className='mb-5 m-2' style={style.counterText}>
                            <p>Solicitudes: {optional.counter}</p>
                        </div>
                    }
                    <div className='mr-5 mb-4 p-2 pl-6 pr-6 rounded-full' style={style.botonFondo}>
                        <p>{optional.buttonText}</p>
                    </div>
                </div>
            }
        </div>
    </div>
  )
}

export default CardDetails