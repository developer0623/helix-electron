import * as types from '../actions/actionTypes';
import initialState from './initialState';
import _ from 'lodash';

export default function repositoryGroupsReducer(state = initialState.repository_groups, action) {
  switch(action.type) {
    case types.LOAD_COMPANY_REPOSITORY_GROUPS_SUCCESS:  {
      return _.sortBy(action.repositoryGroups, "name");
    }
    default:
      return state;
  }
}
