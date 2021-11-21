import {
  GET_TEST_SESSION,
  SET_VIDEO_RATING
} from '../types';

export default (state, action) => {
  switch (action.type) {

    case SET_VIDEO_RATING:
      const newState = { ...state };
      const videoId = action.payload.videoId;
      
      newState.videos[videoId] = {
        ...newState.videos[videoId],
        rating: action.payload.rating
      };

      return {
        ...newState,
        currentVideoId: videoId + 1 // Update currentVideoId
      };

    case GET_TEST_SESSION:


    default:
      return state;
  }
};