import * as types from './actionTypes';
import systemApi from '../../api/systems/systemApi';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';

export function loadSystemSuccess(system) {
  return { type: types.LOAD_SYSTEM_SUCCESS, system };
}
export function saveAttributeSuccess(attribute) {
  return { type: types.SAVE_ATTRIBUTE_SUCCESS, attribute };
}
export function loadSystem() {
  return function(dispatch) {
    return systemApi.getSystem().then(system => {
      dispatch(loadSystemSuccess(system));
    }).catch(error => {
      throw(error);
    });
  };
}
export function saveAttribute(attribute_name, attribute_value) {
  return function(dispatch) {
    return systemApi.saveAttribute(attribute_name, attribute_value).then(savedAttribute => {
      dispatch(saveAttributeSuccess(savedAttribute));
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  };
}
