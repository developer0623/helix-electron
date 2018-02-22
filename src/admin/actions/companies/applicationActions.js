import * as types from '../actionTypes';
import applicationApi from '../../../api/companies/applicationsApi';
import {beginAjaxCall, ajaxCallError} from '../ajaxStatusActions';

export function loadApplicationsSuccess(applications) {
  return { type: types.LOAD_COMPANY_APPLICATIONS_SUCCESS, applications };
}
export function createApplicationSuccess(application) {
  return { type: types.CREATE_COMPANY_APPLICATION_SUCCESS, application };
}
export function updateApplicationSuccess(application) {
  return { type: types.UPDATE_COMPANY_APPLICATION_SUCCESS, application };
}
export function deleteApplicationSuccess(application) {
  return { type: types.DELETE_COMPANY_APPLICATION_SUCCESS, application };
}
export function loadApplications(company_id, page) {
  return function(dispatch) {
    return new Promise((resolve, reject) => {
      dispatch(beginAjaxCall);

      applicationApi.getApplications(company_id, page).then(applications => {
        resolve(applications);
      }).catch(error => {
        dispatch(ajaxCallError(error));

        throw(error);
      });
    });
  };
}
export function loadAllApplications(company_id) {
  return function(dispatch) {
    return new Promise((resolve, reject) => {
      return applicationApi.getAllApplications(company_id).then(applications => {
        dispatch(loadApplicationsSuccess(applications));

        resolve();
      }).catch(error => {
        throw(error);
      });
    });
  };
}
export function saveApplication(company_id, application) {
  return function(dispatch) {
    return applicationApi.saveApplication(company_id, application).then(savedApplication => {
      application._id ? dispatch(updateApplicationSuccess(savedApplication)) :
        dispatch(createApplicationSuccess(savedApplication));
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  };
}
export function deleteApplication(company_id, application) {
  return function(dispatch) {
    return applicationApi.deleteApplication(company_id, application).then(() => {
      dispatch(deleteApplicationSuccess(application));
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  };
}
