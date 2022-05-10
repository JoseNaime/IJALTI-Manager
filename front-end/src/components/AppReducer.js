export const AppReducer = (state, action) => {
  switch (action.type) {
      case 'LOGIN':

          localStorage.setItem('user', JSON.stringify(action.payload));
        return {
          ...state,
            user: action.payload,
        }
      case 'LOGOUT':
          localStorage.removeItem('user');
        return {
          ...state,
            user: null,
        }
      default:
        return state;
  }
}