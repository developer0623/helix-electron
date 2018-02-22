import * as types from './actionTypes';
import customsSlotTypesApi from '../../../api/systems/customSlotTypesApi';
import {beginAjaxCall, ajaxCallError} from '../ajaxStatusActions';

export function loadAllCustomSlotTypesSuccess(allCustomSlotTypes) {
  return { type: types.LOAD_ALL_CUSTOM_SLOT_TYPES_SUCCESS, allCustomSlotTypes };
}
export function loadCustomSlotTypesSuccess(custom_slot_types) {
  return { type: types.LOAD_CUSTOM_SLOT_TYPES_SUCCESS, custom_slot_types };
}
export function createCustomSlotTypeSuccess(custom_slot_type) {
  return { type: types.CREATE_CUSTOM_SLOT_TYPE_SUCCESS, custom_slot_type };
}
export function updateCustomSlotTypeSuccess(custom_slot_type) {
  return { type: types.UPDATE_CUSTOM_SLOT_TYPE_SUCCESS, custom_slot_type };
}
export function deleteCustomSlotTypeSuccess(custom_slot_type) {
  return { type: types.DELETE_CUSTOM_SLOT_TYPE_SUCCESS, custom_slot_type };
}
export function loadAllCustomSlotTypes() {
  return function(dispatch) {
    dispatch(beginAjaxCall);

    return customsSlotTypesApi.getAllCustomSlotTypes().then(custom_slot_types => {
      dispatch(loadAllCustomSlotTypesSuccess(custom_slot_types));
    }).catch(error => {
      throw(error);
    });
  };
}
export function loadCustomSlotTypes(page) {
  return function(dispatch) {
    if(!page) {
      page = 1;
    }
    dispatch(beginAjaxCall);

    return customsSlotTypesApi.getCustomSlotTypesPaged(page).then(custom_slot_types => {
      dispatch(loadCustomSlotTypesSuccess(custom_slot_types));
    }).catch(error => {
      throw(error);
    });
  };
}
export function saveCustomSlotType(custom_slot_type) {
  return function(dispatch) {
    return customsSlotTypesApi.saveCustomSlotType(custom_slot_type).then(savedCustomSlotType => {
      custom_slot_type._id ? dispatch(updateCustomSlotTypeSuccess(savedCustomSlotType)) :
        dispatch(createCustomSlotTypeSuccess(savedCustomSlotType));
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  };
}
export function deleteCustomSlotType(custom_slot_type) {
  return function(dispatch) {
    return customsSlotTypesApi.deleteCustomSlotType(custom_slot_type).then(() => {
      dispatch(deleteCustomSlotTypeSuccess(custom_slot_type));
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  };
}
