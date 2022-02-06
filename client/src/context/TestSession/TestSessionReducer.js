import {
  CLEAR_TEST_SESSION,
  GET_TEST_SESSION,
  SET_TEST_SESSION,
  SET_DATASET_NAME,
  SET_VIDEO_RATING,
  MARK_INSTRUCTION_PLAYED,
  ADD_SUBJECT_TO_TEST_SESSION
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
        current_pvs_array_id: id + 1 // Update current_pvs_array_id
      };
    }

    case GET_TEST_SESSION: {
      const newState = { ...state };
      console.log('action.payload:   ', JSON.stringify(action.payload));
      newState.pvs = action.payload.pvs.map(pvs => ({
        id: pvs.id,
        path: pvs.path,
        rating: 0
      }));
      return {
        ...newState,
        current_pvs_array_id: 0,
        dataset_name: action.payload.dataset_name,
        instructional_video_path: action.payload.instructional_video_path
      };
    }

    // TODO: Dodać ADD_TEST_SESSION/MODIFY_TEST_SESSION, które będzie służyć do tworzenia/edytowania sesji testowej przez administratora
    // case SET_TEST_SESSION: {
    //   return;
    // }

    case MARK_INSTRUCTION_PLAYED: {
      return {
        ...state,
        instruction_played: true
      };
    }

    case ADD_SUBJECT_TO_TEST_SESSION: {
      console.log('ADD_SUBJECT_TO_TEST_SESSION reducer', {
        ...state,
        subject: action.payload.subjectData
      })
      return {
        ...state,
        subject: action.payload.subjectData
      }
    }

    case SET_DATASET_NAME: {
      console.log(action.payload);
      return {
        ...state,
        dataset_name: action.payload.dataset_name
      }
    }

    case CLEAR_TEST_SESSION: {
      return {
        ...state,
        dataset_name: null,
        instructional_video_path: '',
        pvs: [],
        subject: {},
        current_pvs_array_id: 0,
        instruction_played: false
      };
    }

    default:
      return state;
  }
};