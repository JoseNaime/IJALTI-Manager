import React from 'react'
import SkillsContainer from './SkillsContainer'
import CompanyIconTest from "../assets/images/icons/company_icon_test.png"
import Status from './Status'
import ApplyToOffer from "./CardDetailsExtras/ApplyToOffer";
import SeeOfferApplications from "./CardDetailsExtras/SeeOfferApplications";

const style = {
    h1: {
        fontWeight: "bold", fontSize: "24px"
    }, details: {
        fontWeight: "400", fontSize: "0.8rem", opacity: "0.5"
    }, icon: {
        width: '100px',
    }
}

const CardDetails = ({cardInfo, fieldNames = {}, extraComponents}) => {

    return (<div className='flex flex-col basis-1/2'>
        <div className='w-auto h-full mx-5 relative'>
            <div className='mt-10 mb-5 flex flex-row gap-x-5'>
                <div>
                    <img style={style.icon}
                         className={""}
                         src={CompanyIconTest}
                         alt={cardInfo[fieldNames.title] + "_icon"} />
                </div>

                <div className='flex flex-row justify-between w-full'>
                    <div className='flex flex-col justify-center text-left w-full'>
                        <div className='flex flex-row justify-between'>
                            <h1 style={style.h1}>{cardInfo[fieldNames.title]}</h1>
                            {cardInfo[fieldNames.status] && <div className='mt-auto mb-auto'>
                                <Status status={cardInfo[fieldNames.status]} fullForm={true} />
                            </div>}
                        </div>
                        <h2 className="font-medium opacity-40">{cardInfo[fieldNames.subTitle]}</h2>

                        {(cardInfo[fieldNames.firstSpace] || cardInfo[fieldNames.secondSpace] || cardInfo[fieldNames.date]) &&
                            <div style={style.details} className='flex flex-row gap-2'>
                                {!!cardInfo[fieldNames.firstSpace] && <p>{cardInfo[fieldNames.firstSpace]}</p>}
                                {!!cardInfo[fieldNames.secondSpace] && <p> | {cardInfo[fieldNames.secondSpace]}</p>}
                                {!!fieldNames.date &&
                                    <p>{new Date(cardInfo[fieldNames.date]).toLocaleDateString()} </p>}

                            </div>}
                    </div>


                </div>
            </div>

            <hr className='mb-2 opacity-25' />

            <div className="flex flex-col gap-5">
                {cardInfo[fieldNames.skills].length > 0 && <SkillsContainer
                    skills={cardInfo[fieldNames.skills]}
                />}
                {cardInfo[fieldNames.description] && <div className='mt-3 flex flex-col gap-2 text-left'>
                    <h2 className="font-medium text-xl">Descripción</h2>
                    <p className="opacity-60">{cardInfo[fieldNames.description]}</p>
                </div>}
            </div>

            {extraComponents.cardDetail_ApplyToOffer &&
                <ApplyToOffer cardInfo={cardInfo} />
            }
            {extraComponents.cardDetail_SeeOfferApplications &&
                <SeeOfferApplications cardInfo={cardInfo} />
            }

        </div>
    </div>)
}

export default CardDetails