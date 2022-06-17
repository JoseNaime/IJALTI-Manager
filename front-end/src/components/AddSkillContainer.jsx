import React, {useEffect, useState} from 'react';
import Skill from "./Skill";

import useFetch from "../customHooks/useFetch";
import SkillSelector from "./SkillSelector";

const style = {
    h2: {
        fontWeight: "bold",
        fontSize: "16px"
    },
    skillsGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
        gap: "10px 20px",
    }
}

function AddSkillContainer({setSelectedSkills = (skills) => {}}) {
    const {data, error} = useFetch({url: "/habilidades", method: "GET"});

    const [skills, setSkills] = useState([]);
    const [allSkills, setAllSkills] = useState([]);
    const [isSkillSelectorOpen, setIsSkillSelectorOpen] = useState(false);

    const handleAddSkill = (skill) => {
        const newSkills = [...skills, skill];

        setSelectedSkills(newSkills);
        setSkills(newSkills);
        setIsSkillSelectorOpen(false);
    }

    const handleDeleteSkill = (skill) => {
        const newSkills = skills.filter(s => s.habilidadid !== skill.habilidadid);
        setSelectedSkills(newSkills);
        setSkills(newSkills);
    }

    const toggleSkillSelector = () => {
        setIsSkillSelectorOpen(!isSkillSelectorOpen);
    }

    useEffect(() => {
        if (data) {
            setAllSkills(data.filter(skill => !skills.includes(skill)));
        }
    }, [data, skills]);

    return (
        !error &&
        <div style={style.skillsGrid}>
            {skills && skills.map((skill, i) =>
                <div key={skill.habilidadid} onClick={(e) => handleDeleteSkill(skill)}>
                    <Skill name={skill.nombre} color={skill.color} />
                </div>
            )}

            <div onClick={toggleSkillSelector} className={"relative"}>
                <Skill canAddSkill={true} color={"#EAEAEA"} />
                {isSkillSelectorOpen && <SkillSelector skills={allSkills} handleSkillSelect={handleAddSkill} />}
            </div>

        </div>

    );
}

export default AddSkillContainer;