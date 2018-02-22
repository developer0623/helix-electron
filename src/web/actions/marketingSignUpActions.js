import * as types from './actionTypes';
import marketingLeadsApi from '../../api/marketingLeadsApi';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';

export function addMarketingSignUpSuccess(intents) {
  return { type: types.ADD_MARKETING_SIGNUP_SUCCESS, intents };
}
export function addMarketingSignUp(marketingLead) {
  return function(dispatch) {
    return marketingLeadsApi.saveMarketingLead(marketingLead)
    .then(savedMarketingLead => {
      dispatch(addMarketingSignUpSuccess(savedMarketingLead));
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  };
}
