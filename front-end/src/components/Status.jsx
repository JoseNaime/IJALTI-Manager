import React from 'react'

const Status = ({status, fullForm=false}) => {
    const getStatusColor = (type) => {
        if (type==="div"){
            switch (status) {
                case "active":
                    return "rgba(39, 202, 64, 0.25)";
                case "pending":
                    return "rgba(255,193,48,0.25)";
                case "closed":
                    return "rgba(255,96,88,0.25)";
                default:
                    return "#e1e1e1";
            }
        } else {
            switch (status) {
                case "active":
                    return "#27CA40";
                case "pending":
                    return "#FFC130";
                case "closed":
                    return "#FF6058";
                default:
                    return "#e1e1e1";
            }
        }
    }

    const getStatusText = () => {
        switch (status) {
            case "active":
                return "Activo";
            case "pending":
                return "Pendiente";
            case "closed":
                return "Cerrado";
            default:
                return "#e1e1e1";
        }
    }

    const style = {
        status: {
            backgroundColor: getStatusColor("div"),
            
        },

        statusCircle: {
            backgroundColor: getStatusColor(),
            height: '10px',
            width: '10px',
            borderRadius: '50%',
            opacity: 1
        },

        statusText: {
            fontWeight: 400,
            fontSize: "0.7rem",
            opacity: 0.5
        }
    }
  
    return (
      <div>
          {fullForm ?
            <div style={style.status} className='p-1 rounded-full flex flex-row justify-center'>
                <p style={style.statusText}>
                    {fullForm ? getStatusText() : ''}
                </p>
                <div style={style.statusCircle} className='m-auto ml-2'></div>
            </div>
            :
            <div style={style.statusCircle} className='m-auto ml-2'></div>
            }
      </div>
  )
}

export default Status