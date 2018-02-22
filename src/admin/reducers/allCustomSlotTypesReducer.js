import * as types from '../actions/systems/actionTypes';
import initialState from './initialState';

export default function allCustomSlotTypesReducer(state = initialState.allCustomSlotTypes, action) {
  switch(action.type) {
    case types.LOAD_ALL_CUSTOM_SLOT_TYPES_SUCCESS:
      return action.allCustomSlotTypes;
    default:
      return state;
  }
}
