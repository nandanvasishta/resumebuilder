import { LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_SUCCESS } from '../actions/authAction';
import { SIGNUP_SUCCESS, SIGNUP_FAILURE } from '../actions/authAction';
const initialState = {
  isAuthenticated: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP_SUCCESS:
        return {
          ...state,
          isAuthenticated: true,
        };
      case SIGNUP_FAILURE:
        return {
          ...state,
          isAuthenticated: false,
        };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
      };
    case LOGIN_FAILURE:
        return {
            ...state,
            isAuthenticated: false,
        }
    case LOGOUT_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};

export default authReducer;