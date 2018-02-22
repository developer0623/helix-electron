import * as types from './actionTypes';
import authApi from '../../api/authApi';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';

export function authenticateUserSuccess(code) {
  return { type: types.AUTH_USER_SUCCESS, code };
}
export function authenticateUser(credentials) {
  return function(dispatch) {
    return authApi.authenticate(credentials)
    .then((results) => {
      window.location = credentials.redirect_uri + "?code=" + results.code + "&state=" + credentials.state;
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  };
}
