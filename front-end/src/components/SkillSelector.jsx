import React from 'react';
import Skill from "./Skill";

const style = {
    mainContainer: {
        position: "absolute",
        top: "0",
        left: "100%",
        transform: "translate(10px, -25px)",
        width: "200px",
        height: "200px",
        backgroundColor: "#FFFFFF",
        boxShadow: "0 0 10px 0 rgba(0,0,0,0.1)",
        borderRadius: "15px",
        overflowY: "scroll",
    },
    content: {
        display: "flex",
        flexDirection: "column",
        padding: "25px",
        gap: "10px",
        overflow: "hidden",
    }
}

function SkillSelector({skills, handleSkillSelect}) {
    return (
        <div style={style.mainContainer}>
            <div style={style.content}>
                {skills.map((skill, index) => {
                    return (
                        <div key={index} onClick={(e) => handleSkillSelect(skill)}>
                            <Skill name={skill.nombre} color={skill.color} />
                        </div>
                    )
                })}
            </div>
        </div>
    );
}

export default SkillSelector;