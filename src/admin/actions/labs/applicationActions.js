import * as types from '../actionTypes';
import applicationApi from '../../../api/labs/applicationsApi';
import {beginAjaxCall, ajaxCallError} from '../ajaxStatusActions';

export function loadApplicationsSuccess(applications) {
  return { type: types.LOAD_LAB_APPLICATIONS_SUCCESS, applications };
}
export function createApplicationSuccess(application) {
  return { type: types.CREATE_LAB_APPLICATION_SUCCESS, application };
}
export function updateApplicationSuccess(application) {
  return { type: types.UPDATE_LAB_APPLICATION_SUCCESS, application };
}
export function deleteApplicationSuccess(application) {
  return { type: types.DELETE_LAB_APPLICATION_SUCCESS, application };
}
export function submitApplicationSuccess(application) {
  return { type: types.SUBMIT_LAB_APPLICATION_SUCCESS, application };
}
export function loadApplications(lab_id, page) {
  return function(dispatch) {
    return new Promise((resolve, reject) => {
      dispatch(beginAjaxCall);

      applicationApi.getApplications(lab_id, page).then(applications => {
        resolve(applications);
      }).catch(error => {
        dispatch(ajaxCallError(error));

        throw(error);
      });
    });
  };
}
export function loadAllApplications(lab_id) {
  return function(dispatch) {
    return new Promise((resolve, reject) => {
      return applicationApi.getAllApplications(lab_id).then(applications => {
        dispatch(loadApplicationsSuccess(applications));

        resolve();
      }).catch(error => {
        throw(error);
      });
    });
  };
}
export function saveApplication(lab_id, application) {
  return function(dispatch) {
    return applicationApi.saveApplication(lab_id, application).then(savedApplication => {
      application._id ? dispatch(updateApplicationSuccess(savedApplication)) :
        dispatch(createApplicationSuccess(savedApplication));
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  };
}
export function deleteApplication(lab_id, application) {
  return function(dispatch) {
    return applicationApi.deleteApplication(lab_id, application).then(() => {
      dispatch(deleteApplicationSuccess(application));
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  };
}
export function submitApplication(lab_id, application) {
  return function(dispatch) {
    return applicationApi.submitApplication(lab_id, application).then(() => {
      dispatch(submitApplicationSuccess(application));
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  };
}
