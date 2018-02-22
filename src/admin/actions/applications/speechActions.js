import * as types from '../actionTypes';
import speechApi from '../../../api/applications/speechApi';
import {beginAjaxCall, ajaxCallError} from '../ajaxStatusActions';

export function convertTextToSpeech(applicationId, repositoryId, textToConvert) {
  return new Promise((resolve, reject) => {
    speechApi.convertTextToSpeech(applicationId, repositoryId, textToConvert).then(result => {
      resolve(result);
    }).catch(error => {
      reject(error);
    });
  });
}
