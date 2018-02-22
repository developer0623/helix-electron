import * as types from '../actions/actionTypes';
import initialState from './initialState';
import _ from 'lodash';

export default function skillGroupsReducer(state = initialState.skill_groups, action) {
  switch(action.type) {
    case types.LOAD_SKILL_GROUPS_SUCCESS:  {
      return action.skillGroups;
    }
    case types.CREATE_SKILL_GROUP_SUCCESS: {
      return  _.sortBy([
        ...state,
        Object.assign({}, action.skillGroup)
      ], "skill_group_name");
    }
    case types.UPDATE_SKILL_GROUP_SUCCESS: {
      return _.sortBy([
        ...state.filter(skillGroup => skillGroup._id !== action.skillGroup._id),
        Object.assign({}, action.skillGroup)
      ], "skill_group_name");
    }
    case types.DELETE_SKILL_GROUP_SUCCESS: {
      return _.sortBy([
        ...state.filter(skillGroup => skillGroup._id !== action.skillGroup._id)
      ], "skill_group_name");
    }
    default:
      return state;
  }
}
