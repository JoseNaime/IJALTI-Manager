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

function AddSkillContainer(props) {
    const {data, isLoading, error} = useFetch({url: "/habilidades", method: "GET"});

    const [skills, setSkills] = useState([]);
    const [allSkills, setAllSkills] = useState([]);
    const [isSkillSelectorOpen, setIsSkillSelectorOpen] = useState(false);

    const handleAddSkill = (skill) => {
        setSkills([...skills, skill]);
        setIsSkillSelectorOpen(false);
    }

    const handleDeleteSkill = (skill) => {
        setSkills(skills.filter(s => s.nombre !== skill.nombre));
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
        <div style={style.skillsGrid}>
            {skills && skills.map((skill, i) =>
                <div onClick={(e) => handleDeleteSkill(skill)}>
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