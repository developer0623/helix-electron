import * as types from '../actionTypes';
import repositoriesApi from '../../../api/labs/repositoryApi';
import {beginAjaxCall, ajaxCallError} from '../ajaxStatusActions';
import {loadMe} from '../authActions';

export function loadRepositoriesSuccess(repositories) {
  return { type: types.LOAD_REPOSITORIES_SUCCESS, repositories };
}
export function createRepositorySuccess(repository) {
  return { type: types.CREATE_REPOSITORY_SUCCESS, repository };
}
export function updateRepositorySuccess(repository) {
  return { type: types.UPDATE_REPOSITORY_SUCCESS, repository };
}
export function deleteRepositorySuccess(repository) {
  return { type: types.DELETE_REPOSITORY_SUCCESS, repository };
}
export function loadRepositories(lab_id, page, name) {
  return function(dispatch) {
    if(!page) {
      page = 1;
    }
    return repositoriesApi.getRepositories(lab_id, page, name).then(repositories => {
      dispatch(loadRepositoriesSuccess(repositories));
    }).catch(error => {
      throw(error);
    });
  };
}
export function loadAllRepositories(lab_id) {
  return function(dispatch) {
    return repositoriesApi.getAllRepositories(lab_id).then(repositories => {
      dispatch(loadRepositoriesSuccess(repositories));
    }).catch(error => {
      throw(error);
    });
  };
}
export function saveRepository(lab_id, repository) {
  return function(dispatch) {
    return repositoriesApi.saveRepository(lab_id, repository).then(savedRepository => {
      repository._id ? dispatch(updateRepositorySuccess(savedRepository)) :
        dispatch(createRepositorySuccess(savedRepository));
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  };
}
export function deleteRepository(lab_id, repository) {
  return function(dispatch) {
    return repositoriesApi.deleteRepository(lab_id, repository)
    .then(() => {
      return Promise.all([
        dispatch(loadMe())
      ]);
    })
    .then((results) => {
      dispatch(deleteRepositorySuccess(repository));
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  };
}
