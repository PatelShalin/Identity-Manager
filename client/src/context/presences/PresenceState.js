import React, { useReducer } from 'react';
import PresenceContext from './presenceContext';
import PresenceReducer from './presenceReducer';
import axios from 'axios';

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

const PresenceState = props => {
  const initialState = {
    presences: null,
    current: null,
    filtered: null,
    error: null,
    loading: null
  };

  const [state, dispatch] = useReducer(PresenceReducer, initialState);

  const getPresences = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/presences');
      dispatch({ type: GET_PRESENCES, payload: res.data });
    } catch (error) {
      dispatch({ type: PRESENCE_ERROR, payload: error.response.msg });
    }
  };

  const clearPresences = () => {
    dispatch({
      type: CLEAR_PRESENCES
    });
  };

  const addPresence = async presence => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    try {
      const res = await axios.post(
        'http://localhost:5000/api/presences',
        presence,
        config
      );
      dispatch({ type: ADD_PRESENCE, payload: res.data });
    } catch (error) {
      dispatch({ type: PRESENCE_ERROR, payload: error.response.msg });
    }
  };

  const deletePresence = async id => {
    try {
      // eslint-disable-next-line
      const res = await axios.delete(
        `http://localhost:5000/api/presences/${id}`
      );
      dispatch({ type: DELETE_PRESENCE, payload: id });
    } catch (error) {
      dispatch({ type: PRESENCE_ERROR, payload: error.response.msg });
    }
  };

  const updatePresence = async presence => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    try {
      console.log('HELLO');
      const res = await axios.put(
        `http://localhost:5000/api/presences/${presence._id}`,
        presence,
        config
      );
      dispatch({ type: UPDATE_PRESENCE, payload: res.data });
    } catch (error) {
      dispatch({ type: PRESENCE_ERROR, payload: error.response.msg });
    }
  };

  const setCurrent = presence => {
    dispatch({ type: SET_CURRENT, payload: presence });
  };

  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  const filterPresences = text => {
    dispatch({ type: FILTER_PRESENCES, payload: text });
  };

  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };

  return (
    <PresenceContext.Provider
      value={{
        presences: state.presences,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        loading: state.loading,
        addPresence,
        deletePresence,
        setCurrent,
        clearCurrent,
        updatePresence,
        filterPresences,
        clearFilter,
        getPresences,
        clearPresences
      }}
    >
      {props.children}
    </PresenceContext.Provider>
  );
};

export default PresenceState;
