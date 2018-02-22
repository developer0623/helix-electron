import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function marketingSignUpReducer(state = initialState.marketingSignUp, action) {
  switch(action.type) {
    case types.ADD_MARKETING_SIGNUP_SUCCESS:
      return action.intents;
    default:
      return state;
  }
}
