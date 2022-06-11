export const AppReducer = (state, action) => {
  switch (action.type) {
      case 'SET_USER':
        return {
            ...state,
            user: action.user
        }

      case 'LOGIN':
          localStorage.setItem('user', JSON.stringify(action.payload));
        return {
          ...state,
            user: action.payload,
        }
      case 'LOGOUT':
          document.location.reload();
          localStorage.removeItem('user');
        return {
          ...state,
            user: null,
        }
      default:
        return state;
  }
}