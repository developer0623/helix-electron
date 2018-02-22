import * as types from '../actions/actionTypes';
import initialState from './initialState';
import _ from 'lodash';

export default function companyUserReducer(state = initialState.companyUsers, action) {
  switch(action.type) {
    case types.LOAD_COMPANY_USERS_SUCCESS:  {
      return _.sortBy(action.users, "last_name");
    }
    case types.CREATE_COMPANY_USER_SUCCESS: {
      return  _.sortBy([
        ...state,
        Object.assign({}, action.user)
      ], "last_name");
    }
    case types.UPDATE_COMPANY_USER_SUCCESS: {
      return _.sortBy([
        ...state.filter(user => user._id !== action.user._id),
        Object.assign({}, action.user)
      ], "last_name");
    }
    case types.DELETE_COMPANY_USER_SUCCESS: {
      return _.sortBy([
        ...state.filter(user => user._id !== action.user._id)
      ], "last_name");
    }
    default:
      return state;
  }
}
