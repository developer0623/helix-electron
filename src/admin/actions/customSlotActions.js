import * as types from './actionTypes';
import customSlotsApi from '../../api/applications/customSlotApi';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';

export function loadCustomSlotsSuccess(customSlots) {
  return { type: types.LOAD_CUSTOM_SLOTS_SUCCESS, customSlots };
}
export function createCustomSlotSuccess(customSlot) {
  return { type: types.CREATE_CUSTOM_SLOT_SUCCESS, customSlot };
}
export function updateCustomSlotSuccess(customSlot) {
  return { type: types.UPDATE_CUSTOM_SLOT_SUCCESS, customSlot };
}
export function deleteCustomSlotSuccess(customSlot) {
  return { type: types.DELETE_CUSTOM_SLOT_SUCCESS, customSlot };
}
export function loadCustomSlots(application_id, page, name) {
  return function(dispatch) {
    if(!page) {
      page = 1;
    }
    return customSlotsApi.getAllCustomSlots(application_id, page, name).then(customSlots => {
      dispatch(loadCustomSlotsSuccess(customSlots));
    }).catch(error => {
      throw(error);
    });
  };
}
export function saveCustomSlot(application_id, customSlot) {
  return function(dispatch) {
    return customSlotsApi.saveCustomSlot(application_id, customSlot).then(savedCustomSlot => {
      customSlot._id ? dispatch(updateCustomSlotSuccess(savedCustomSlot)) :
        dispatch(createCustomSlotSuccess(savedCustomSlot));
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  };
}
export function deleteCustomSlot(application_id, customSlot) {
  return function(dispatch) {
    return customSlotsApi.deleteCustomSlot(application_id, customSlot).then(() => {
      dispatch(deleteCustomSlotSuccess(customSlot));
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  };
}
