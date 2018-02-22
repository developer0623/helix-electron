import * as types from './actionTypes';

export function setPageState(status) {
  return { type: types.SET_PAGE_STATE, status };
}
