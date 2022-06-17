import React from 'react';
import Status from "./Status";

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
    description: {
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
    isSelected: {
        width: "100%",
        height: "100%",
        position: "absolute",
        top: "0",
        left: "0",
        backgroundColor: "rgba(0,128,255,0.2)",
    }
}

function Card({isActive = true, isSelected = false, data, handleCardClick}) {

    return (
        <div style={style.container}
             className={(!isActive ? "opacity-60" : " ")}
             onClick={(e) => handleCardClick(data.id)}>

            {isSelected &&
                <div style={style.isSelected} />
            }

            <div style={style.mainContent}>
                <img style={style.icon} className={"mx-4 rounded-full"} src={data.icon} alt={data.title + "_icon"} />
                <div style={style.info} className="text-left py-2 justify-around">
                    <h3 className="font-bold max-h-fit">{data.title}</h3>
                    <h4 className="font-medium opacity-40">{data.subTitle}</h4>
                    <p style={style.description}
                       className="w-80 opacity-50 leading-5 align-center">{data.description}</p>
                </div>
            </div>
            <div>
                <div style={style.topRight} className="flex flex-row">
                    {data.counter &&
                        <div className="font-medium text-white text-center opacity-30 px-2 text-xs">
                            <p>{data.counter.title}: {data.counter.count}</p>
                        </div>
                    }

                    {data.status &&
                        <Status status={data.status} fullForm={false} />
                    }
                </div>
                <div style={style.bottomRight}>
                    <div>
                        <p className="font-medium opacity-50 text-sm">{data.date}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Card;