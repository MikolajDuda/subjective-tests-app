import React, { useReducer } from 'react';
import axios from 'axios';
import TestSessionContext from './TestSessionContext';
import TestSessionReducer from './TestSessionReducer';
import {
  GET_TEST_SESSION,
  SET_TEST_SESSION,
  TEST_SESSION_ERROR,
  SET_VIDEO_RATING,
  CLEAR_TEST_SESSION,
  SET_DATASET_NAME,
  MARK_INSTRUCTION_PLAYED,
  ADD_SUBJECT_TO_TEST_SESSION
} from '../types';
import { PROXY } from '../../App';

const TestSessionState = props => {
  const initialState = {
    dataset_name: null,
    instructional_video_path: '',
    pvs: [],
    subject: {},
    current_pvs_array_id: 0,
    instruction_played: false
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

  const addSubjectToTestSession = async (subjectData) => {
    try {
      console.log(subjectData);
      dispatch({
        type: ADD_SUBJECT_TO_TEST_SESSION,
        payload: { subjectData }
      });
    } catch (err) {
      dispatch({
        type: TEST_SESSION_ERROR,
        payload: err.response.msg
      });
    }
  }

  const clearTestSession = () => {
    dispatch({
      type: CLEAR_TEST_SESSION
    });
  };

  const markInstructionAsPlayed = () => {
    dispatch({
      type: MARK_INSTRUCTION_PLAYED
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
        clearTestSession,
        markInstructionAsPlayed,
        addSubjectToTestSession
      }}
    >
      {props.children}
    </TestSessionContext.Provider>
  );
};

export default TestSessionState;
