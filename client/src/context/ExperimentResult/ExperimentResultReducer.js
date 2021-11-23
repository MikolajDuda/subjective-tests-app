import {
  GET_ALL_EXPERIMENT_RESULTS,
  GET_EXPERIMENT_RESULT,
  ADD_EXPERIMENT_RESULT,
  EXPERIMENT_RESULT_ERROR
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_ALL_EXPERIMENT_RESULTS: {
      console.log(action.payload.map(experiment => experiment.dataset_name));
      return {
        ...state,
        experiment_names: action.payload.map(experiment => experiment.dataset_name)
      }
    }

    /*
    case CLEAR_TEST_SESSION: {
      return {
        ...state,
        dataset_name: null,
        pvs: [],
        current_pvs_array_id: 0
      }
    }
     */

    default:
      return state;
  }
};