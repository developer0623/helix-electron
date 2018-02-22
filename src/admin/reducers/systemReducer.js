import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function systemReducer(state = initialState.system, action) {
  switch(action.type) {
    case types.LOAD_SYSTEM_SUCCESS:
      return action.system;
    case types.SAVE_ATTRIBUTE_SUCCESS:
      return action.attributes;
    default:
      return state;
  }
}
