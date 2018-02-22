import * as types from '../actionTypes';
import labApi from '../../../api/companies/labApi';
import {beginAjaxCall, ajaxCallError} from '../ajaxStatusActions';
import {loadMe} from '../authActions';

export function loadLabSuccess(labs) {
  return { type: types.LOAD_LAB_SUCCESS, labs };
}
export function createLabSuccess(lab) {
  return { type: types.CREATE_LAB_SUCCESS, lab };
}
export function updateLabSuccess(lab) {
  return { type: types.UPDATE_LAB_SUCCESS, lab };
}
export function deleteLabSuccess(lab) {
  return { type: types.DELETE_LAB_SUCCESS, lab };
}
export function createLabMemberSuccess(lab_member) {
  return { type: types.CREATE_LAB_MEMBER_SUCCESS, lab_member };
}
export function updateLabMemberSuccess(lab_member) {
  return { type: types.UPDATE_LAB_MEMBER_SUCCESS, lab_member };
}
export function deleteLabMemberSuccess(lab_member) {
  return { type: types.DELETE_LAB_MEMBER_SUCCESS, lab_member };
}

export function loadLabs(company_id, page) {
  return function(dispatch) {
    dispatch(beginAjaxCall);
    if(!page) {
      page = 1;
    }
    return labApi.getLabs(company_id, page).then(labs => {
      dispatch(loadLabSuccess(labs));
    }).catch(error => {
      throw(error);
    });
  };
}
export function loadAllLabs(company_id) {
  return function(dispatch) {
    //dispatch(beginAjaxCall);

    return labApi.getAllLabs(company_id).then(labs => {
      dispatch(loadLabSuccess(labs));
    }).catch(error => {
      throw(error);
    });
  };
}
export function saveLab(company_id, lab) {
  return function(dispatch) {
    return labApi.saveLab(company_id, lab).then(savedLab => {
      lab._id ? dispatch(updateLabSuccess(savedLab)) :
        dispatch(createLabSuccess(savedLab));
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  };
}
export function deleteLab(company_id, lab_id, lab) {
  return function(dispatch) {
    return labApi.deleteLab(company_id, lab_id, lab)
    .then(() => {
      dispatch(deleteLabSuccess(lab));
    }).catch(error => {
      dispatch(ajaxCallError(error));

      throw(error);
    });
  };
}
export function saveLabMember(company_id, lab_id, lab_member) {
  return function(dispatch) {
    return labApi.saveLabMember(company_id, lab_member).then(savedLabMember => {
      lab_member._id ? dispatch(updateLabMemberSuccess(savedLabMember)) :
        dispatch(createLabMemberSuccess(savedLabMember));
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  };
}
export function deleteLabMember(company_id, lab_id, lab_member) {
  return function(dispatch) {
    return labApi.deleteLabMember(company_id, lab_id, lab_member).then(() => {
      dispatch(deleteLabMemberSuccess(lab_member));
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  };
}
