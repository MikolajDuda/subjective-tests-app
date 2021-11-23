import React, { useReducer } from 'react';
import axios from 'axios';
import TestSessionContext from './TestSessionContext';
import TestSessionReducer from './TestSessionReducer';
import {
  GET_TEST_SESSION,
  TEST_SESSION_ERROR,
  SET_VIDEO_RATING,
  CLEAR_TEST_SESSION,
  SET_DATASET_NAME
} from '../types';
import { PROXY } from '../../App';

const TestSessionState = props => {
  const initialState = {
    dataset_name: null,
    pvs: [],
    current_pvs_array_id: 0
  };

  const [ state, dispatch ] = useReducer(TestSessionReducer, initialState); // dokumentacja: https://reactjs.org/docs/hooks-reference.html#usereducer

  // Get TestSession
  const getTestSession = async () => {
    const dataset_name = state.dataset_name;
    try {
      if (!state.pvs.length) {
        const res = await axios.get(`${PROXY}/api/test-sessions/${dataset_name}`);
        console.log('res.data: ', JSON.stringify(res.data));
        dispatch({
          type: GET_TEST_SESSION,
          payload: res.data
        });
      }
    } catch (err) {
      dispatch({
        type: TEST_SESSION_ERROR,
        payload: err.response.msg
      });
    }
  };

  const clearTestSession = () => {
    dispatch({
      type: CLEAR_TEST_SESSION
    });
  };

  const setDatasetName = (dataset_name) => {
    console.log('testSessionState: ', dataset_name);
    dispatch({
      type: SET_DATASET_NAME,
      payload: { dataset_name }
    });
  };

  // Set video rating api/experiment-results/rate/
  const setVideoRating = async (dataset_name, rating, current_pvs_array_id, pvs) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const reqBody = {
      dataset_name,
      rating,
      id: pvs[current_pvs_array_id].id
    };

    try {
      const res = await axios.post(`${PROXY}/api/experiment-results/rate/`, reqBody, config);
      dispatch({
        type: SET_VIDEO_RATING,
        payload: { dataset_name, rating, current_pvs_array_id, pvs }
      });
    } catch (err) {
      dispatch({
        type: TEST_SESSION_ERROR,
        payload: err.response.msg
      });
    }
  };

  return (
    <TestSessionContext.Provider
      value={{
        ...state,
        setVideoRating,
        setDatasetName,
        getTestSession,
        clearTestSession
      }}
    >
      {props.children}
    </TestSessionContext.Provider>
  );
};

export default TestSessionState;
