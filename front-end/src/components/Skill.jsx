import React from 'react';
import CompanyIconTest from "../assets/images/icons/skills/js.png";

function Skill({icon= CompanyIconTest, name, color, canAddSkill = false}) {
    const style = {
        container: {
            display: 'flex',
            flexDirection: 'row',
            height: "28px",
        },
        icon: {
            width: "28px",
            height: "28px",
        },
        content: {
            display: 'flex',
            justifyContent: 'center',
            backgroundColor: color,
        }
    }

    return (
        <div style={style.container} className="w-full">
            {!canAddSkill ? (
                    <>
                        <img style={style.icon} src={icon} alt={name + "_icon"} />
                        <div style={style.content} className="px-3 flex items-center w-full">
                            <p className="h-fit text-xs opacity-50 font-bold">{name}</p>
                        </div>
                    </>
                )
                : (
                    <>
                        <div style={style.content} className="px-3 flex items-center w-full rounded-full">
                            <p className="h-fit text-xs opacity-70">Add Skill +</p>
                        </div>
                    </>
                )}

        </div>
    );
}

export default Skill;