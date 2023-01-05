import React, { useReducer } from 'react';
import axios from 'axios';
import ExperimentResultContext from './ExperimentResultContext';
import ExperimentResultReducer from './ExperimentResultReducer';
import {
  GET_ALL_EXPERIMENT_RESULTS,
  EXPERIMENT_RESULT_ERROR,
  ADD_SUBJECT_TO_EXPERIMENT_RESULT,
  ADD_CHARACTERISTIC_TO_SUBJECT_IN_EXPERIMENT_RESULT
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
      dispatch({
        type: ADD_SUBJECT_TO_EXPERIMENT_RESULT,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: EXPERIMENT_RESULT_ERROR,
        payload: err.response?.msg
      });
    }
  }

  const addCharacteristicToSubject = async (dataset_name, subject_id, characteristic) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const reqBody = {
      dataset_name,
      subject_id,
      characteristic
    };

    try {
      const res = await axios.put(`${PROXY}/api/experiment-results/subjects/`, reqBody, config);
      dispatch({
        type: ADD_CHARACTERISTIC_TO_SUBJECT_IN_EXPERIMENT_RESULT,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: EXPERIMENT_RESULT_ERROR,
        payload: err.response?.msg
      });
    }
  }


  return (
    <ExperimentResultContext.Provider
      value={{
        ...state,
        experiment_names: state.experiment_names,
        getAllExperimentResults,
        addSubjectToExperimentResult,
        addCharacteristicToSubject
      }}
    >
      {props.children}
    </ExperimentResultContext.Provider>
  );
};

export default ExperimentResultState;
