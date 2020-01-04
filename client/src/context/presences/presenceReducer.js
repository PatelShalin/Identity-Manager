import {
  ADD_PRESENCE,
  DELETE_PRESENCE,
  UPDATE_PRESENCE,
  FILTER_PRESENCES,
  SET_CURRENT,
  CLEAR_CURRENT,
  CLEAR_FILTER,
  PRESENCE_ERROR,
  GET_PRESENCES,
  CLEAR_PRESENCES
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_PRESENCES:
      return {
        ...state,
        presences: action.payload,
        loading: false
      };
    case CLEAR_PRESENCES:
      return {
        ...state,
        presences: null,
        filtered: null,
        error: null,
        current: null
      };
    case ADD_PRESENCE:
      return {
        ...state,
        presences: [action.payload, ...state.presences],
        loading: false
      };
    case DELETE_PRESENCE:
      return {
        ...state,
        presences: state.presences.filter(
          presence => presence._id !== action.payload
        ),
        loading: false
      };
    case PRESENCE_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null
      };
    case UPDATE_PRESENCE:
      return {
        ...state,
        presences: state.presences.map(presence =>
          presence._id === action.payload._id ? action.payload : presence
        ),
        loading: false,
        current: null
      };
    case FILTER_PRESENCES:
      return {
        ...state,
        filtered: state.presences.filter(presence => {
          const regex = new RegExp(`${action.payload}`, 'gi');
          return presence.username.match(regex) || presence.email.match(regex);
        })
      };
    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null
      };
    default:
      return state;
  }
};
