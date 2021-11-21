import React, { useReducer } from 'react';
import axios from 'axios';
import TestSessionContext from './TestSessionContext';
import TestSessionReducer from './TestSessionReducer';
import {
  GET_TEST_SESSION,
  SET_VIDEO_RATING
} from '../types';

const TestSessionState = props => {
  const initialState = {
    experimentName: 'test',
    path: 'data/video/',
    videos: [
      {
        path: 'sample_1.mp4',
        rating: null
      },
      {
        path: 'sample_2.mp4',
        rating: null
      },
      {
        path: 'sample_3.mp4',
        rating: null
      },
      {
        path: 'sample_4.mp4',
        rating: null
      }
    ],
    currentVideoId: 0
  };

  const [ state, dispatch ] = useReducer(TestSessionReducer, initialState); // dokumentacja: https://reactjs.org/docs/hooks-reference.html#usereducer

  // Get TestSession

  // Set video rating
  const setVideoRating = (rating, videoId) => {
    dispatch({ type: SET_VIDEO_RATING, payload: {rating, videoId} });
  };

  return (
    <TestSessionContext.Provider
      value={{
        ...state,
        setVideoRating
      }}
    >
      {props.children}
    </TestSessionContext.Provider>
  );
};

export default TestSessionState;
