import React, { useReducer } from 'react';
import TestSessionContext from './testSessionContext';
import testSessionReducer from './testSessionReducer';

const TestSessionState = props => {
  const initialState = {
    videos: [
      {
        path: './data/video/sample_1.mp4',
        rating: null
      },
      {
        path: './data/video/sample_2.mp4',
        rating: null
      },
      {
        path: './data/video/sample_3.mp4',
        rating: null
      },
      {
        path: './data/video/sample_4.mp4',
        rating: null
      }
    ],
    currentVideoId: 0
  };

  const [ state, dispatch ] = useReducer(testSessionReducer, initialState); // dokumentacja: https://reactjs.org/docs/hooks-reference.html#usereducer

  // Set videos rating
};
