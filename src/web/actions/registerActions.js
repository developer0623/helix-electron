import _ from 'lodash';
import * as types from './actionTypes';
import authApi from '../../api/authApi';
import userApi from '../../api/systems/userApi';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';

export function registerUserSuccess(code) {
  return { type: types.REGISTER_USER_SUCCESS, code };
}
export function registerUser(user, oauth_credentials) {
  return function(dispatch) {
    return userApi.saveUser(user)
    .then((results) => {
      const credentials = {
        email_address: user.email_address,
        password: user.password
      };
      _.extend(credentials, oauth_credentials);

      authApi.authenticate(credentials)
      .then((results) => {
        window.location = credentials.redirect_uri + "?code=" + results.code + "&state=" + credentials.state;
      }).catch(error => {
        dispatch(ajaxCallError(error));
        throw(error);
      });
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  };
}
