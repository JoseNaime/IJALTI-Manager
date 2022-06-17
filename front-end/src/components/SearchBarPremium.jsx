import React, {useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSearch} from '@fortawesome/free-solid-svg-icons';
import FilterForm from './Forms/FilterForm';

function SearchBar({setFilters}) {
    const [toggle, setToggle] = useState(false);
    const toggleSearch = () => setToggle(!toggle);


    const style = {
        container: {
            backgroundColor: '#4064AC',
            boxShadow: '0 0 10px 0 rgba(0,0,0,0.1)',
            position: 'absolute',
            top: "0",
            left: '50%',
            marginLeft: 'auto',
            marginRight: 'auto',
            transform: 'translate(-50%, 0%)',
            width: '95%',
            zIndex: '80',
            padding: '0 30px',
            color: '#FFFFFF',
            borderRadius: '0 0 20px 20px',
            transition: 'all 1s',
        },
        containerHidden: {
            backgroundColor: '#4E4E4E',
            boxShadow: '0 0 10px 0 rgba(0,0,0,0.1)',
            position: 'absolute',
            left: '50%',
            marginLeft: 'auto',
            marginRight: 'auto',
            width: '95%',
            top: '35px',
            transform: 'translate(-50%, -100%)',
            zIndex: '80',
            padding: '0 30px',
            color: '#FFFFFF',
            borderRadius: '0 0 10px 10px',
            transition: 'all 1s',
        },
    }

    return (
        <>
            <div style={toggle ? style.container : style.containerHidden}>
                <div><FilterForm
                    setFilters={setFilters}
                    toggleSearch={toggleSearch}
                    placeHolders={{
                        firstField: "titulo",
                        secondField: "empresa",
                    }} /></div>
                <div className="rounded-[12px] font-extralight flex justify-center mb-2 mt-2" onClick={toggleSearch}>
                    <div className='mr-5'>Realizar una búsqueda</div>
                    <div><FontAwesomeIcon icon={faSearch} /></div>
                </div>
            </div>
        </>
    )
}

export default SearchBar
