import * as types from './actionTypes';
import entityPropertyApi from '../../api/companies/entityPropertyApi';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';

export function loadEntityPropertiesSuccess(entityProperties) {
  return { type: types.LOAD_ENTITY_PROPERTIES_SUCCESS, entityProperties };
}
export function createEntityPropertySuccess(entityProperty) {
  return { type: types.CREATE_ENTITY_PROPERTY_SUCCESS, entityProperty };
}
export function updateEntityPropertySuccess(entityProperty) {
  return { type: types.UPDATE_ENTITY_PROPERTY_SUCCESS, entityProperty };
}
export function deleteEntityPropertySuccess(entityProperty) {
  return { type: types.DELETE_ENTITY_PROPERTY_SUCCESS, entityProperty };
}
export function loadEntityProperties(company_id, page) {
  return function(dispatch) {
    if(!page) {
      page = 1;
    }
    return entityPropertyApi.getAllEntityProperties(company_id, page).then(entityProperties => {
      dispatch(loadEntityPropertiesSuccess(entityProperties));
    }).catch(error => {
      throw(error);
    });
  };
}
export function saveEntityProperty(company_id, entityProperty) {
  return function(dispatch) {
    return entityPropertyApi.saveEntityProperty(company_id, entityProperty).then(savedProperty => {
      entityProperty._id ? dispatch(updateEntityPropertySuccess(savedProperty)) :
        dispatch(createEntityPropertySuccess(savedProperty));
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  };
}
export function deleteEntityProperty(company_id, entityProperty) {
  return function(dispatch) {
    return entityPropertyApi.deleteEntityProperty(company_id, entityProperty).then(() => {
      dispatch(deleteEntityPropertySuccess(entityProperty));
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  };
}
