import React, { useReducer } from 'react';
import axios from 'axios';
import ExperimentResultContext from './ExperimentResultContext';
import ExperimentResultReducer from './ExperimentResultReducer';
import {
  GET_ALL_EXPERIMENT_RESULTS,
  EXPERIMENT_RESULT_ERROR
} from '../types';
import { PROXY } from '../../App';

const ExperimentResultState = props => {
  const initialState = {
    experiment_names: []
  };

  const [ state, dispatch ] = useReducer(ExperimentResultReducer, initialState); // dokumentacja: https://reactjs.org/docs/hooks-reference.html#usereducer

  // Get TestSession
  const getAllExperimentResults = async () => {
    try {
      const res = await axios.get(`${PROXY}/api/experiment-results/`);
      dispatch({
        type: GET_ALL_EXPERIMENT_RESULTS,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: EXPERIMENT_RESULT_ERROR,
        payload: err.response?.msg
      });
    }
  };

  const addSubjectToExperimentResult = async (dataset_name, subjectData) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const reqBody = {
      dataset_name,
      subject: subjectData
    };

    try {
      const res = await axios.post(`${PROXY}/api/experiment-results/subjects/`, reqBody, config);
    } catch (err) {
      dispatch({
        type: EXPERIMENT_RESULT_ERROR,
        payload: err.response.msg
      });
    }
  }

  /*
  const clearTestSession = () => {
    dispatch({
      type: CLEAR_TEST_SESSION
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
    }

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
  */

  return (
    <ExperimentResultContext.Provider
      value={{
        ...state,
        experiment_names: state.experiment_names,
        getAllExperimentResults,
        addSubjectToExperimentResult
      }}
    >
      {props.children}
    </ExperimentResultContext.Provider>
  );
};

export default ExperimentResultState;
