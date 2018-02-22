import * as types from '../actions/actionTypes';
import initialState from './initialState';

function actionTypeEndsInSuccess(type) {
  return type.substring(type.length - 8) == '_SUCCESS';
}

export default function ajaxStatusReducer(state = initialState, action) {
  if (action.type == types.BEGIN_AJAX_CALL) {
    return Object.assign({}, state, { ajaxCallsInProgress: state.ajaxCallsInProgress + 1 });
  } else if (action.type == types.AJAX_CALL_ERROR || actionTypeEndsInSuccess(action.type)) {
    return Object.assign({}, state, { ajaxCallsInProgress: state.ajaxCallsInProgress - 1 });
  }

  if(action.type == types.NETWORK_ERROR) {
    return Object.assign({}, state, { networkError: true });
  }

  return state;
}
