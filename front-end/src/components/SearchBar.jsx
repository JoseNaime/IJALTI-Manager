import React, {useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSearch} from '@fortawesome/free-solid-svg-icons';
import FilterForm from './Forms/FilterForm';
import AddSkillContainer from './AddSkillContainer';

function SearchBar() {

    const [toggle, setToggle] = useState(false);
    const toggleSearch = () => setToggle(!toggle);

    const style = {
        container: {
            backgroundColor: '#4E4E4E',
            boxShadow: '0 0 10px 0 rgba(0,0,0,0.1)',
            padding: "0px 30px",
            position: 'absolute',
            width: '350px',
            top: '0',
            transform: 'TranslateX(70%)',
            color: '#FFFFFF',
            transition: 'top 1s',
            borderRadius: '6px',
            display: 'inline-block'
        },
        containerHidden: {
            backgroundColor: '#4E4E4E',
            boxShadow: '0 0 10px 0 rgba(0,0,0,0.1)',
            padding: "0px 30px",
            position: 'absolute',
            width: '350px',
            top: '-176px',
            transform: 'TranslateX(70%)',
            color: '#FFFFFF',
            transition: 'top 1s',
            borderRadius: '6px'
        },
        tab: {
            backgroundColor: '#4E4E4E',
            padding: "24px 12px",
            position: 'absolute',
            width: '214px',
            top: '0',
            transform: 'TranslateX(18%) TranslateY(340%)',
            color: '#FFFFFF',
        },
        divtext: {
            position: 'absolute',
            bottom: '10',
            transform: 'TranslateY(-31%) TranslateX(1.3%)',                 
        },
        icon: {
            position: 'absolute',
            top: '34%',
            left: '84%',
            transform: 'Translate(-50% -50%)'
        },
        form: {
            position: 'relative',
            transform: 'TranslateY(4%)', 
        }
    }

    return (
        <>
        <div style={toggle ? style.container : style.containerHidden}>
            <div style={style.tab} className="rounded-[12px] font-extralight" onClick={toggleSearch}>
                <div style={style.divtext}>Realizar una búsqueda</div>
                <div style={style.icon}><FontAwesomeIcon icon={faSearch} /></div>
            </div>
            <div style={style.form}><FilterForm /></div>
        </div>
    </>
    )
}

export default SearchBar
