import * as types from '../actionTypes';
import inventoryApi from '../../../api/labs/inventoryApi';
import {beginAjaxCall, ajaxCallError} from '../ajaxStatusActions';
import {loadMe} from '../authActions';

export function loadInventorySuccess(inventory) {
  return { type: types.LOAD_LAB_INVENTORY_SUCCESS, inventory };
}
export function createInventorySuccess(inventory) {
  return { type: types.LOAD_LAB_INVENTORY_SUCCESS, inventory };
}
export function updateInventorySuccess(inventory) {
  return { type: types.LOAD_LAB_INVENTORY_SUCCESS, inventory };
}
export function deleteInventorySuccess(inventory) {
  return { type: types.LOAD_LAB_INVENTORY_SUCCESS, inventory };
}
export function uploadInventorySuccess() {
  // When there is a notifications / flash messages framework
  // this should flash a message saying upload was complete / successful
  return { type: types.UPLOAD_INVENTORY_SUCCESS };
}

export function loadInventory(lab_id, page) {
  return function(dispatch) {
    dispatch(beginAjaxCall);
    if(!page) {
      page = 1;
    }
    return inventoryApi.getInventory(page).then(inventory => {
      dispatch(loadInventorySuccess(inventory));
    }).catch(error => {
      throw(error);
    });
  };
}

export function uploadInventory(lab_id, repository_id, data) {
  return function(dispatch) {
    dispatch(beginAjaxCall);
    return inventoryApi.uploadInventory(lab_id, repository_id, data).then(() => {
      dispatch(uploadInventorySuccess());
    }).catch(error => {
      throw(error);
    });
  };
}
export function saveInventory(company_id, repository) {
  return function(dispatch) {
    return new Promise((resolve, reject) => {
      let inventory;

      inventoryApi.saveInventory(company_id, repository)
      .then(saveRepository => {
        inventory = saveRepository;

        return Promise.all([
          dispatch(loadMe())
        ]);
      })
      .then((results) => {
        dispatch(createInventorySuccess(inventory));

        resolve(inventory);
      })
      .catch(error => {
        dispatch(ajaxCallError(error));

        throw(error);
      });
    });
  };
}
export function deleteInventory(company_id, repository) {
  return function(dispatch) {
    return inventoryApi.deleteInventory(company_id, repository)
    .then(() => {
      return Promise.all([
        dispatch(loadMe())
      ]);
    })
    .then((results) => {
      dispatch(deleteInventorySuccess(repository));
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  };
}
