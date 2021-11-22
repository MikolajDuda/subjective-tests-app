import {
  CLEAR_TEST_SESSION,
  GET_TEST_SESSION,
  SET_VIDEO_RATING
} from '../types';

export default (state, action) => {
  switch (action.type) {

    case SET_VIDEO_RATING: {
      const newState = { ...state };
      const id = action.payload.current_pvs_array_id;

      newState.pvs[id] = {
        ...newState.pvs[id],
        rating: action.payload.rating
      };

      return {
        ...newState,
        current_pvs_array_id: id + 1 // Update currentVideoId
      };
    }

    case GET_TEST_SESSION: {
      const newState = { ...state };
      console.log('action.payload:   ', JSON.stringify(action.payload));
      const id = 0;
      newState.pvs = action.payload.pvs.map(pvs => ({
        id: pvs.id,
        path: pvs.path,
        rating: 0
      }))
      return {
        ...newState,
        current_pvs_array_id: id,
        dataset_name: action.payload.dataset_name
      };
    }

    case CLEAR_TEST_SESSION: {
      return {
        ...state,
        dataset_name: null,
        pvs: [],
        current_pvs_array_id: 0
      }
    }

    default:
      return state;
  }
};