import * as types from './actionTypes';
import companyApi from '../../api/companies/companyApi';
import laboratoryProfileApi from '../../api/companies/laboratoryProfileApi';
import skillGroupsApi from '../../api/companies/skillGroupsApi';
import repositoryGroupApi from '../../api/systems/repositoryGroupApi';
import userApi from '../../api/companies/userApi';

import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';

export function loadAllCompaniesSuccess(allCompanies) {
  return { type: types.LOAD_ALL_COMPANIES_SUCCESS, allCompanies };
}
export function loadCompaniesSuccess(companies) {
  return { type: types.LOAD_COMPANIES_SUCCESS, companies };
}
export function createCompanySuccess(company) {
  return { type: types.CREATE_COMPANY_SUCCESS, company };
}
export function updateCompanySuccess(company) {
  return { type: types.UPDATE_COMPANY_SUCCESS, company };
}
export function deleteCompanySuccess(company) {
  return { type: types.DELETE_COMPANY_SUCCESS, company };
}
export function loadLaboratoryProfilesSuccess(laboratoryProfiles) {
  return { type: types.LOAD_LABORATORY_PROFILE_SUCCESS, laboratoryProfiles};
}
export function createLaboratoryProfileSuccess(laboratoryProfile) {
  return { type: types.CREATE_LABORATORY_PROFILE_SUCCESS, laboratoryProfile};
}
export function updateLaboratoryProfileSuccess(laboratoryProfile) {
  return { type: types.UPDATE_LABORATORY_PROFILE_SUCCESS, laboratoryProfile};
}
export function deleteLaboratoryProfileSuccess(laboratoryProfile) {
  return { type: types.DELETE_LABORATORY_PROFILE_SUCCESS, laboratoryProfile};
}
export function loadSkillGroupsSuccess(skillGroups) {
  return { type: types.LOAD_SKILL_GROUPS_SUCCESS, skillGroups };
}
export function createSkillGroupSuccess(skillGroup) {
  return { type: types.CREATE_SKILL_GROUP_SUCCESS, skillGroup };
}
export function updateSkillGroupSuccess(skillGroup) {
  return { type: types.UPDATE_SKILL_GROUP_SUCCESS, skillGroup };
}
export function deleteSkillGroupSuccess(skillGroup) {
  return { type: types.DELETE_SKILL_GROUP_SUCCESS, skillGroup };
}
export function loadUsersSuccess(users) {
  return { type: types.LOAD_COMPANY_USERS_SUCCESS, users };
}
export function createUserSuccess(user) {
  return { type: types.CREATE_COMPANY_USER_SUCCESS, user};
}
export function updateUserSuccess(user) {
  return { type: types.UPDATE_COMPANY_USER_SUCCESS, user};
}
export function deleteUserSuccess(user) {
  return { type: types.DELETE_COMPANY_USER_SUCCESS, user };
}
export function loadRepositoryGroupsSuccess(repositoryGroups) {
  return { type: types.LOAD_COMPANY_REPOSITORY_GROUPS_SUCCESS, repositoryGroups };
}
export function loadAllCompanies(page, companyName) {
  return function(dispatch) {
    return companyApi.getAllCompanies().then(companies => {
      dispatch(loadAllCompaniesSuccess(companies));
    }).catch(error => {
      throw(error);
    });
  };
}
export function loadCompanies(page, companyName) {
  return function(dispatch) {
    if(!page) {
      page = 1;
    }
    return companyApi.getCompaniesPaged(page, companyName).then(companies => {
      dispatch(loadCompaniesSuccess(companies));
    }).catch(error => {
      throw(error);
    });
  };
}
export function saveCompany(company) {
  return function(dispatch) {
    return companyApi.saveCompany(company).then(savedCompany => {
      company._id ? dispatch(updateCompanySuccess(savedCompany)) :
        dispatch(createCompanySuccess(savedCompany));
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  };
}
export function deleteCompany(company) {
  return function(dispatch) {
    return companyApi.deleteCompany(company).then(() => {
      dispatch(deleteCompanySuccess(company));
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  };
}
export function loadLaboratoryProfiles(companyId) {
  return function(dispatch) {
    return laboratoryProfileApi.getAllLaboratoryProfiles(companyId).then(laboratoryProfiles => {
      dispatch(loadLaboratoryProfilesSuccess(laboratoryProfiles));
    }).catch(error => {
      throw(error);
    });
  };
}
export function saveLaboratoryProfile(companyId, laboratoryProfile) {
  return function(dispatch) {
    return laboratoryProfileApi.saveLaboratoryProfile(companyId, laboratoryProfile).then(savedLaboratoryProfile => {
      laboratoryProfile._id ? dispatch(updateLaboratoryProfileSuccess(savedLaboratoryProfile)) :
        dispatch(createLaboratoryProfileSuccess(savedLaboratoryProfile));
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  };
}
export function deleteLaboratoryProfile(companyId, laboratoryProfile) {
  return function(dispatch) {
    return laboratoryProfileApi.deleteLaboratoryProfile(companyId, laboratoryProfile).then(() => {
      dispatch(deleteLaboratoryProfileSuccess(laboratoryProfile));
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  };
}
export function loadSkillGroups(companyId) {
  return function(dispatch) {
    return skillGroupsApi.getAllSkillGroups(companyId).then(skillGroups => {
      dispatch(loadSkillGroupsSuccess(skillGroups));
    }).catch(error => {
      throw(error);
    });
  };
}
export function saveSkillGroup(companyId, skillGroup) {
  return function(dispatch) {
    return skillGroupsApi.saveSkillGroup(companyId, skillGroup).then(savedSkillGroup => {
      skillGroup._id ? dispatch(updateSkillGroupSuccess(savedSkillGroup)) :
        dispatch(createSkillGroupSuccess(savedSkillGroup));
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  };
}
export function deleteSkillGroup(companyId, skillGroup) {
  return function(dispatch) {
    return skillGroupsApi.deleteSkillGroup(companyId, skillGroup).then(() => {
      dispatch(deleteSkillGroupSuccess(skillGroup));
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  };
}
export function loadUsers(companyId) {
  return function(dispatch) {
    return userApi.getAllUsers(companyId).then(users => {
      dispatch(loadUsersSuccess(users));
    }).catch(error => {
      throw(error);
    });
  };
}
export function saveUser(companyId, user) {
  return function(dispatch) {
    return userApi.saveUser(companyId, user).then(savedUser => {
      user._id ? dispatch(updateUserSuccess(savedUser)) :
        dispatch(createUserSuccess(savedUser));
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  };
}
export function deleteUser(companyId, user) {
  return function(dispatch) {
    return companyApi.deleteOrganizationUser(companyId, user).then(() => {
      dispatch(deleteUserSuccess(user));
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  };
}
export function loadRepositoryGroups() {
  return function(dispatch) {
    return repositoryGroupApi.getAllRepositoryGroups().then(repositoryGroups => {
      dispatch(loadRepositoryGroupsSuccess(repositoryGroups));
    }).catch(error => {
      throw(error);
    });
  };
}
