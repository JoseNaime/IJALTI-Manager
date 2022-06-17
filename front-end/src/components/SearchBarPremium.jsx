import React, {useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSearch} from '@fortawesome/free-solid-svg-icons';
import FilterForm from './Forms/FilterForm';
import AddSkillContainer from './AddSkillContainer';

function SearchBar() {

    const [toggle, setToggle] = useState(true);
    const toggleSearch = () => setToggle(!toggle);

    const style = {
        container: {
            backgroundColor: '#4E4E4E',
            boxShadow: '0 0 10px 0 rgba(0,0,0,0.1)',
            position: 'absolute',
            top: '-20%',
            left: '0',
            right: '0',
            marginLeft: 'auto',
            marginRight: 'auto',
            width: '95%',
            zIndex: '80',
            padding: '0 30px',
            color: '#FFFFFF',
            borderRadius: '0 0 20px 20px',
            transition: 'top 1s',
        },
        containerHidden: {
            backgroundColor: '#4E4E4E',
            boxShadow: '0 0 10px 0 rgba(0,0,0,0.1)',
            position: 'absolute',
            top: '0',
            left: '0',
            right: '0',
            marginLeft: 'auto',
            marginRight: 'auto',
            width: '95%',
            top: '-290px',
            zIndex: '80',
            padding: '0 30px',
            color: '#FFFFFF',
            borderRadius: '0 0 10px 10px',
            transition: 'top 1s',
        },
        // container: {
        //     backgroundColor: '#4E4E4E',
        //     boxShadow: '0 0 10px 0 rgba(0,0,0,0.1)',
        //     padding: "0px 30px",
        //     position: 'absolute',
        //     width: '350px',
        //     top: '0',
        //     transform: 'TranslateX(70%)',
        //     color: '#FFFFFF',
        //     transition: 'top 1s',
        //     borderRadius: '6px',
        //     display: 'inline-block',
        //     zIndex: '80'
        // },
        // containerHidden: {
        //     backgroundColor: '#4E4E4E',
        //     boxShadow: '0 0 10px 0 rgba(0,0,0,0.1)',
        //     padding: "0px 30px",
        //     position: 'absolute',
        //     width: '350px',
        //     top: '-176px',
        //     transform: 'TranslateX(70%)',
        //     color: '#FFFFFF',
        //     transition: 'top 1s',
        //     borderRadius: '6px',
        //     zIndex: '80'
        // },
        // tab: {
        //     backgroundColor: '#4E4E4E',
        //     padding: "24px 12px",
        //     position: 'absolute',
        //     width: '214px',
        //     top: '0',
        //     transform: 'TranslateX(50%) TranslateY(340%)',
        //     color: '#FFFFFF',
        // },
        // divtext: {
        //     position: 'absolute',
        //     bottom: '10',
        //     transform: 'TranslateY(-31%) TranslateX(1.3%)',                 
        // },
        // icon: {
        //     position: 'absolute',
        //     top: '34%',
        //     left: '84%',
        //     transform: 'Translate(-50% -50%)'
        // },
        // form: {
        //     position: 'relative',
        //     transform: 'TranslateY(4%)', 
        // }
    }

    return (
        <>
            <div style={toggle ? style.container : style.containerHidden}>
                <div><FilterForm /></div>
                <div className="rounded-[12px] font-extralight flex justify-center mb-2 mt-2" onClick={toggleSearch}>
                    <div className='mr-5'>Realizar una búsqueda</div>
                    <div><FontAwesomeIcon icon={faSearch} /></div>
                </div>
        </div>
        </>
    )
}

export default SearchBar
