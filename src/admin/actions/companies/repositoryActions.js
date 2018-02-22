import * as types from '../actionTypes';
import repositoriesApi from '../../../api/companies/repositoryApi';
import {beginAjaxCall, ajaxCallError} from '../ajaxStatusActions';
import {loadMe} from '../authActions';

export function loadRepositoriesSuccess(repositories) {
  return { type: types.LOAD_REPOSITORIES_SUCCESS, repositories };
}
export function createRepositorySuccess(repository) {
  return { type: types.CREATE_REPOSITORY_SUCCESS, repository };
}

export function uploadEntitiesSuccess(entities) {
  return { type: types.UPLOAD_ENTITIES_SUCCESS, entities };
}

export function updateRepositorySuccess(repository) {
  return { type: types.UPDATE_REPOSITORY_SUCCESS, repository };
}
export function deleteRepositorySuccess(repository) {
  return { type: types.DELETE_REPOSITORY_SUCCESS, repository };
}
export function loadRepositories(company_id, page, name) {
  return function(dispatch) {
    if(!page) {
      page = 1;
    }
    return repositoriesApi.getRepositories(company_id, page, name).then(repositories => {
      dispatch(loadRepositoriesSuccess(repositories));
    }).catch(error => {
      throw(error);
    });
  };
}
export function loadAllRepositories(company_id) {
  return function(dispatch) {
    return new Promise((resolve, reject) => {
      return repositoriesApi.getAllRepositories(company_id).then(repositories => {
        dispatch(loadRepositoriesSuccess(repositories));

        resolve();
      }).catch(error => {
        throw(error);
      });
    });
  };
}
export function saveRepository(company_id, repository) {
  return function(dispatch) {
    let savedRepository;

    return repositoriesApi.saveRepository(company_id, repository).then(savedRepository => {
      repository._id ? dispatch(updateRepositorySuccess(savedRepository)) :
        dispatch(createRepositorySuccess(savedRepository));
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  };
}
export function deleteRepository(company_id, repository) {
  return function(dispatch) {
    return repositoriesApi.deleteRepository(company_id, repository)
    .then(() => {
      dispatch(deleteRepositorySuccess(repository));
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  };
}

export function uploadEntities(company_id, repository_id, data) {
  return function(dispatch) {
    return repositoriesApi.uploadEntities(company_id, repository_id, data).then((entities) => {
      dispatch(uploadEntitiesSuccess(entities));
    }).catch(error => {
      throw(error);
    });
  };
}
