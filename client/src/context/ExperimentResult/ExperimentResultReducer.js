import {
  GET_ALL_EXPERIMENT_RESULTS,
  // GET_EXPERIMENT_RESULT, potencjalnie niepotrzebne
  ADD_EXPERIMENT_RESULT,
  UPDATE_EXPERIMENT_RESULT,
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

    // TODO: Dodać ADD_EXPERIMENT_RESULT/UPDATE_EXPERIMENT_RESULT, w którym administrator będzie mógł dodać nowy exp_result
    // case ADD_EXPERIMENT_RESULT: {
    //   return ;
    // }

    // TODO: UPDATE_EXPERIMENT_RESULT, w którym administrator będzie mógł zmieniać istniejące exp_result

    // TODO: Dodać EXPERIMENT_RESULT_ERROR, w którym będzie wyświetlany błąd jak coś się nie uda


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