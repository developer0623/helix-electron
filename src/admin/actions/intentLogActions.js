import * as types from './actionTypes';
import intentLogsApi from '../../api/applications/intentLogApi';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';

export function loadIntentLogsSuccess(intentLogs) {
  return { type: types.LOAD_INTENT_LOGS_SUCCESS, intentLogs };
}
export function loadIntentLogs(application_id, page) {
  return function(dispatch) {
    if(!page) {
      page = 1;
    }
    dispatch(beginAjaxCall);
    return intentLogsApi.getAllIntentLogs(application_id, page).then(intentLogs => {
      dispatch(loadIntentLogsSuccess(intentLogs));
    }).catch(error => {
      throw(error);
    });
  };
}
