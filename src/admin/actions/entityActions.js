import * as types from './actionTypes';
import entitiesApi from '../../api/companies/entityApi';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';

export function loadEntitiesSuccess(entities) {
  return { type: types.LOAD_ENTITIES_SUCCESS, entities };
}
export function createEntitySuccess(entity) {
  return { type: types.CREATE_ENTITY_SUCCESS, entity };
}
export function updateEntitySuccess(entity) {
  return { type: types.UPDATE_ENTITY_SUCCESS, entity };
}
export function deleteEntitySuccess(entity) {
  return { type: types.DELETE_ENTITY_SUCCESS, entity };
}
export function createEntityPropertySuccess(repository) {
  return { type: types.UPDATE_REPOSITORY_SUCCESS, repository };
}
export function updateEntityPropertySuccess(repository) {
  return { type: types.UPDATE_REPOSITORY_SUCCESS, repository };
}
export function deleteEntityPropertySuccess(repository) {
  return { type: types.UPDATE_REPOSITORY_SUCCESS, repository };
}
export function loadEntities(company_id, repository_id, type, page, name) {
  return function(dispatch) {
    if(!page) {
      page = 1;
    }
    return entitiesApi.getAllEntities(company_id, repository_id, type, page, name).then(entities => {
      dispatch(loadEntitiesSuccess(entities));
    }).catch(error => {
      throw(error);
    });
  };
}
export function saveEntity(company_id, repository_id, entity) {
  return function(dispatch) {
    return entitiesApi.saveEntity(company_id, repository_id, entity).then(savedEntity => {
      entity._id ? dispatch(updateEntitySuccess(savedEntity)) :
        dispatch(createEntitySuccess(savedEntity));
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  };
}
export function saveEntityProperty(company_id, repository, property) {
  return function(dispatch) {
    return entitiesApi.saveEntityProperty(company_id, repository._id, property).then(savedEntityProperty => {
      if(property._id) {
        repository.attributes.properties = [
          ...repository.attributes.properties.filter(entityProperty => entityProperty._id !== property._id),
          Object.assign({}, savedEntityProperty)
        ];
        dispatch(updateEntityPropertySuccess(repository));
      } else {
        repository.attributes.properties = [
          ...repository.attributes.properties,
          Object.assign({}, savedEntityProperty)
        ];
        dispatch(createEntityPropertySuccess(repository));
      }
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  };
}
export function deleteEntity(company_id, repository_id, entity) {
  return function(dispatch) {
    return entitiesApi.deleteEntity(company_id, repository_id, entity).then(() => {
      dispatch(deleteEntitySuccess(entity));
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  };
}
export function deleteEntityProperty(company_id, repository, property) {
  return function(dispatch) {
    return entitiesApi.deleteEntityProperty(company_id, repository._id, property).then(() => {
      repository.attributes.properties = [
        ...repository.attributes.properties.filter(entityProperty => entityProperty._id !== property._id)
      ];
      dispatch(deleteEntityPropertySuccess(repository));
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  };
}
