import Cookies from 'js-cookie';

export const AppReducer = (state, action) => {
    switch (action.type) {
        case 'SET_CARDS_INFO':
            return {
                ...state,
                cardsInfo: action.payload
            }
        case 'CLEAR_CARDS_INFO':
            return {
                ...state,
                cardsInfo: []
            }

        case 'SET_USER':
            return {
                ...state,
                user: JSON.parse(action.payload)
            }
        case 'LOGIN':
            console.log(action.payload);
            Cookies.set('user', JSON.stringify(action.payload));
            return {
                ...state,
                user: action.payload,
            }
        case 'LOGOUT':
            Cookies.remove('user');
            return {
                ...state,
                user: null,
            }
        default:
            return state;
    }
}