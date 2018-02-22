import { combineReducers } from 'redux';

import auth from './authReducer';
import allCustomSlotTypes from './allCustomSlotTypesReducer';
import companyUsers from './companyUserReducer';
import laboratoryProfiles from './laboratoryProfileReducer';
import repositoryGroups from './repositoryGroupsReducer';
import repositoryTypes from './repositoryTypesReducer';
import skillGroups from './skillGroupsReducer';
import ajaxCallsInProgress from './ajaxStatusReducer';
import system from './systemReducer';
import pageState from './pageStateReducer';

const rootReducer = combineReducers({
  ajaxCallsInProgress,
  allCustomSlotTypes,
  auth,
  companyUsers,
  laboratoryProfiles,
  skillGroups,
  repositoryGroups,
  repositoryTypes,
  system,
  pageState
});

export default rootReducer;
