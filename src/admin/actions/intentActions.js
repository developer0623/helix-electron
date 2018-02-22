import * as types from './actionTypes';
import intentsApi from '../../api/systems/intentApi';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';

export function loadIntentsSuccess(intents) {
  return { type: types.LOAD_INTENTS_SUCCESS, intents };
}
export function createIntentSuccess(intent) {
  return { type: types.CREATE_INTENT_SUCCESS, intent };
}
export function updateIntentSuccess(intent) {
  return { type: types.UPDATE_INTENT_SUCCESS, intent };
}
export function deleteIntentSuccess(intent) {
  return { type: types.DELETE_INTENT_SUCCESS, intent };
}
export function loadAllIntents() {
  return function(dispatch) {
    return new Promise((resolve, reject) => {
      dispatch(beginAjaxCall);

      intentsApi.getAllIntents().then(intents => {
        resolve(intents);
      }).catch(error => {
        dispatch(ajaxCallError(error));
        reject(error);
      });
    });
  };
}
export function loadIntents(page) {
  return function(dispatch) {
    if(!page) {
      page = 1;
    }
    dispatch(beginAjaxCall);
    return intentsApi.getIntents(page).then(intents => {
      dispatch(loadIntentsSuccess(intents));
    }).catch(error => {
      throw(error);
    });
  };
}
export function saveIntent(intent) {
  return function(dispatch) {
    return intentsApi.saveIntent(intent).then(savedIntent => {
      intent._id ? dispatch(updateIntentSuccess(savedIntent)) :
        dispatch(createIntentSuccess(savedIntent));
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  };
}
export function deleteIntent(intent) {
  return function(dispatch) {
    return intentsApi.deleteIntent(intent).then(() => {
      dispatch(deleteIntentSuccess(intent));
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  };
}
