import * as types from './actionTypes';
import repositoryTypesApi from '../../../api/systems/repositoryTypesApi';
import {beginAjaxCall, ajaxCallError} from '../ajaxStatusActions';
import _ from 'lodash';

export function loadRepositoryTypesSuccess(repository_types) {
  return { type: types.LOAD_REPOSITORY_TYPES_SUCCESS, repository_types };
}
export function createRepositoryTypeSuccess(repository_type) {
  return { type: types.CREATE_REPOSITORY_TYPE_SUCCESS, repository_type };
}
export function updateRepositoryTypeSuccess(repository_type) {
  return { type: types.UPDATE_REPOSITORY_TYPE_SUCCESS, repository_type };
}
export function deleteRepositoryTypeSuccess(repository_type) {
  return { type: types.DELETE_REPOSITORY_TYPE_SUCCESS, repository_type };
}
export function loadAllRepositoryTypes() {
  return function(dispatch) {
    return new Promise((resolve, reject) => {
      dispatch(beginAjaxCall);

      repositoryTypesApi.getAllRepositoryTypes().then(repository_types => {
        dispatch(loadRepositoryTypesSuccess(repository_types));
      }).catch(error => {
        dispatch(ajaxCallError(error));
        reject(error);
      });
    });
  };
}
export function loadRepositoryTypes(page) {
  return function(dispatch) {
    if(!page) {
      page = 1;
    }
    dispatch(beginAjaxCall);
    return repositoryTypesApi.getRepositoryTypesPaged(page).then(repository_types => {
      dispatch(loadRepositoryTypesSuccess(repository_types));
    }).catch(error => {
      throw(error);
    });
  };
}
export function saveRepositoryType(repository_type) {
  return function(dispatch) {
    return repositoryTypesApi.saveRepositoryType(repository_type).then(savedRepositoryType => {
      repository_type._id ? dispatch(updateRepositoryTypeSuccess(savedRepositoryType)) :
        dispatch(createRepositoryTypeSuccess(savedRepositoryType));
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  };
}
export function deleteRepositoryType(repository_type) {
  return function(dispatch) {
    return repositoryTypesApi.deleteRepositoryType(repository_type).then(() => {
      dispatch(deleteRepositoryTypeSuccess(repository_type));
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  };
}
