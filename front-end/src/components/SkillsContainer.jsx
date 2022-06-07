import React from 'react'

const SkillsContainer = () => {

    const style = {
        h2: {
            fontWeight: "bold",
            fontSize: "16px"
        }
    }

  return (
    <>
        <h2 style={style.h2} className='text-left'>Habilidades</h2>
        <div className='flex flex-row'>
            <p>JavaScript</p>
            <p>JavaScript</p>
            <p>JavaScript</p>
            <p>JavaScript</p>
            <p>JavaScript</p>
        </div>
    </>
  )
}

export default SkillsContainer