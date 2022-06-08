import React from 'react'
import Skill from "./Skill";
import CompanyIconTest from "../assets/images/icons/skills/js.png";

const SkillsContainer = ({skills}) => {

    const style = {
        h2: {
            fontWeight: "bold",
            fontSize: "16px"
        },
        skillsGrid: {
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
            gap: "10px 0",
        }

    }

    const skillCards = skills.map((skill,i) => {
        return (<Skill icon={CompanyIconTest}
                       name={skill}
                       color={"#FFF8BE"}
        />)
    })

  return (
    <div>
        <h2 className='text-left mb-3 text-xl'>Habilidades</h2>
        <div style={style.skillsGrid} className='w-full'>
            {skillCards}
        </div>
    </div>
  )
}

export default SkillsContainer