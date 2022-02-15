import {
  GET_ALL_EXPERIMENT_RESULTS,
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_ALL_EXPERIMENT_RESULTS: {
      return {
        ...state,
        experiment_names: action.payload.map(experiment => experiment.dataset_name)
      }
    }

    default:
      return state;
  }
};