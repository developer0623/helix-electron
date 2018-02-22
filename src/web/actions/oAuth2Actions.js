import * as types from './actionTypes';
import oAuth2Api from '../../api/oAuth2Api';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';

export function oAuth2GrantSuccess(intents) {
  return { type: types.OAUTH2_GRANT_SUCCESS, intents };
}
export function grant(credentials) {
  return function(dispatch) {
    return oAuth2Api.grantCode(credentials)
    .then((grant) => {
      dispatch(oAuth2GrantSuccess(grant));
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  };
}
