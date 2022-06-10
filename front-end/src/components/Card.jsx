import React, {useState} from 'react';
import Status from "./Status";

function Card({isActive = true, id, icon, title, description, optional, handleCardClick}) {
    const style = {
        container: {
            position: 'relative',
            width: "100%",
            display: 'flex',
            flexDirection: 'row',
            height: '85px',
            borderBottom: '1px solid rgba(0,0,0,0.25)',
        },
        icon: {
            height: '55px',
            width: '55px',
        },
        mainContent: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
        },
        description:{
            textOverflow: "ellipsis",
            wordWrap: "break-word",
            width: "80%",
            overflow: "hidden",
            display: "block"
        },
        info: {
            height: '100%',
            display: 'flex',
            flexDirection: 'column',

        },
        optionals: {
            position: 'absolute',
            width: '100%',
            height: '100%',
        },
        topRight: {
            position: 'absolute',
            top: '8px',
            right: '15px',
            alignItems: 'center',
        },
        bottomRight: {
            position: 'absolute',
            bottom: '5px',
            right: '15px',
        },
    }

    return (
        <div style={style.container} className={!isActive ? "opacity-60" : ""} onClick={(e) => handleCardClick(id)}>
            <div style={style.mainContent}>
                <img style={style.icon} className={"mx-4"} src={icon} alt={title + "_icon"} />
                <div style={style.info} className="text-left py-2 justify-around">
                    <h3 className="font-bold max-h-fit">{title}</h3>
                    <p style={style.description} className="w-80 opacity-50 leading-5 align-center">{description}</p>
                </div>
            </div>
            <div>
                <div style={style.topRight} className="flex flex-row">
                    <div className="font-medium text-white text-center opacity-30 px-2 text-xs">
                        <p>{optional.counter.title}: {optional.counter.count}</p>
                    </div>

                    {optional.status &&
                        <Status status={optional.status} fullForm={false} />
                    }
                </div>
                <div style={style.bottomRight}>
                    <div>
                        <p className="font-medium opacity-50 text-sm">{optional.date}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Card;