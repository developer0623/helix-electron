import * as types from '../actions/systems/actionTypes';
import initialState from './initialState';

function createNewState(state, results) {
  return {
    current_page: state.current_page,
    max_pages: state.max_pages,
    results: results
  };
}
export default function repositoryTypeReducer(state = initialState.repository_types, action) {
  switch(action.type) {
    case types.LOAD_REPOSITORY_TYPES_SUCCESS:
      return action.repository_types;
    case types.CREATE_REPOSITORY_TYPE_SUCCESS:
      return createNewState(state, [
        ...state.results,
        Object.assign({}, action.repository_type)
      ]);
    case types.UPDATE_REPOSITORY_TYPE_SUCCESS:
      return createNewState(state, [
        ...state.results.filter(repository_type => repository_type._id !== action.repository_type._id),
        Object.assign({}, action.repository_type)
      ]);
    case types.DELETE_REPOSITORY_TYPE_SUCCESS:
      return createNewState(state, [
        ...state.results.filter(repository_type => repository_type._id !== action.repository_type._id)
      ]);
    default:
      return state;
  }
}
