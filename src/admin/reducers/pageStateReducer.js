import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function pageStateReducer(state = initialState.page_state, action) {
  switch(action.type) {
    case types.SET_PAGE_STATE:
      state = action.status;
      return state;
    default:
      return state;
  }
}
