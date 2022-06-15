import React from 'react'

function SearchBar() {

    const style = {
        containerhidden: {
            backgroundColor: '#4E4E4E',
            boxShadow: '0 0 10px 0 rgba(0,0,0,0.1)',
            padding: "1.5rem 10px",
            position: 'absolute',
            width: '13.4rem',
            top: '0',
            transform: 'TranslateX(167%) TranslateY(-25%)',
            color: '#FFFFFF',
            transition: 'left 1s'
        },
        container: {
            backgroundColor: '#4E4E4E',
            boxShadow: '0 0 10px 0 rgba(0,0,0,0.1)',
            padding: "1.5rem 10px",
            position: 'absolute',
            width: '13.4rem',
            top: '0',
            //left: '19rem',
            transform: 'TranslateX(70%) TranslateY(-25%)',
            //transition: 'left 1s'
            color: '#FFFFFF',
        },
        bottom: {
            position: 'absolute',
            bottom: '10',
            transform: 'TranslateY(-33%) TranslateX(7%)',                 
        }
    }

    return (
        <div style={/*toggle ? style.containerhidden : */style.container} className="rounded-[12px] font-semibold">
            <div style={style.bottom}>Realizar una búsqueda</div>
        </div>
    )
}

export default SearchBar
