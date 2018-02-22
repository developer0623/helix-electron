import * as types from '../actions/actionTypes';
import initialState from './initialState';
import _ from 'lodash';

export default function repositoryTypeReducer(state = initialState.laboratory_profiles, action) {
  switch(action.type) {
    case types.LOAD_LABORATORY_PROFILE_SUCCESS:  {
      return action.laboratoryProfiles;
    }
    case types.CREATE_LABORATORY_PROFILE_SUCCESS: {
      return  _.sortBy([
        ...state,
        Object.assign({}, action.laboratoryProfile)
      ], "profile_name");
    }
    case types.UPDATE_LABORATORY_PROFILE_SUCCESS: {
      return _.sortBy([
        ...state.filter(laboratoryProfile => laboratoryProfile._id !== action.laboratoryProfile._id),
        Object.assign({}, action.laboratoryProfile)
      ], "profile_name");
    }
    case types.DELETE_LABORATORY_PROFILE_SUCCESS: {
      return _.sortBy([
        ...state.filter(laboratoryProfile => laboratoryProfile._id !== action.laboratoryProfile._id)
      ], "profile_name");
    }
    default:
      return state;
  }
}
