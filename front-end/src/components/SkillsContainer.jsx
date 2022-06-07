import React from 'react'

const SkillsContainer = ({skills}) => {

    const style = {
        h2: {
            fontWeight: "bold",
            fontSize: "16px"
        }
    }

    const skillCards = skills.map((skill,i) => {
        return (<div>
                    <p>{skill}</p>
                </div>)
    })

  return (
    <>
        <h2 style={style.h2} className='text-left'>Habilidades</h2>
        <div className='flex flex-row gap-2'>
            {skillCards}
        </div>
    </>
  )
}

export default SkillsContainer