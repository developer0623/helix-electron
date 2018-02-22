import _ from 'lodash';
import * as types from './actionTypes';
import authApi from '../../api/authApi';
import companyApi from '../../api/systems/companyApi';
import applicationsApi from '../../api/companies/applicationsApi';
import companyLabApi from '../../api/companies/labApi';
import companyRepositoryApi from '../../api/companies/repositoryApi';
import labApi from '../../api/labs/labApi';
import labRepositoryApi from '../../api/labs/repositoryApi';
import cookie from 'react-cookie';
import { beginAjaxCall, ajaxCallError, networkError } from './ajaxStatusActions';
import { loadRepositoryGroups, loadLaboratoryProfiles, loadSkillGroups, loadUsers } from './companyActions';

export function authenticateUserSuccess(token) {
  return { type: types.AUTH_SET_TOKEN, token };
}
export function getMeSuccess(user) {
  return { type: types.AUTH_SET_USER, user };
}
export function updateMeSuccess(user) {
  return { type: types.AUTH_UPDATE_USER, user };
}
export function updatePasswordSuccess() {
  return { type: types.AUTH_UPDATE_USER_PASSWORD };
}
export function loadAllCompaniesSuccess(companies) {
  return { type: types.AUTH_SET_COMPANIES, companies };
}
export function loadCompanySuccess(company) {
  return { type: types.AUTH_SET_COMPANY, company };
}
export function loadLabSuccess(lab) {
  return { type: types.AUTH_SET_LAB, lab };
}
export function loadApplicationsSuccess(applications) {
  return { type: types.AUTH_SET_APPLICATIONS, applications };
}
export function loadLabsSuccess(labs) {
  return { type: types.AUTH_SET_LABS, labs };
}
export function loadRepositorySuccess(repository) {
  return { type: types.AUTH_SET_REPOSITORY, repository };
}
export function loadRepositoriesSuccess(repositories) {
  return { type: types.AUTH_SET_REPOSITORIES, repositories };
}
export function loadCompanyOrdersSuccess(orders) {
  return { type: types.LOAD_COMPANY_ORDERS, orders };
}
export function loadApplicationSuccess(application) {
  return { type: types.AUTH_SET_SELECTED_APPLICATION, application };
}
export function forgotPasswordSuccess() {
  return { type: types.FORGOT_PASSWORD_LINK_SENT };
}
export function resetPasswordSuccess() {
  return { type: types.RESET_PASSWORD_SUCCESS };
}
export function userLogoutSuccess() {
  cookie.remove('token', { path: '/' });
  cookie.remove('user', { path: '/' });

  return { type: types.AUTH_DISCARD_TOKEN };
}
export function setSelectedCompany(company) {
  return { type: types.AUTH_SET_SELECTED_COMPANY, company };
}
export function authenticateUser(credentials) {
  return function(dispatch, getState) {
    const creds = {
      "client_id": "LabMateWeb",
      "client_secret": "LabMate424#",
      "grant_type": "password"
    };
    _.extend(creds, credentials);
    let authenticationToken;
    return authApi.loginUser(creds).then(token => {
      authenticationToken = token;

      cookie.save('token', token.access_token.access_token, { path: '/' });
      cookie.save('user', token.access_token.user, { path: '/' });

      return Promise.all([
        dispatch(loadMe())
      ]);
    })
    .then(() => {
      dispatch(authenticateUserSuccess(authenticationToken));
    }).catch(error => {

      if(error.crossDomain) {
        dispatch(networkError());
        return Promise.reject();

      } else {
        dispatch(ajaxCallError(error));
        return Promise.reject();
      }

    });
  };
}
export function registerUser(user) {
  return function(dispatch) {
    return new Promise((resolve, reject) => {
      const creds = {
        "client_id": "LabMateWeb",
        "client_secret": "LabMate424#",
        "grant_type": "password"
      };
      _.extend(creds, user);

      let authenticationToken;

      authApi.registerUser(creds)
      .then(token => {
        authenticationToken = token;

        cookie.save('token', token.access_token.access_token, { path: '/' });
        cookie.save('user', token.access_token.user, { path: '/' });

        return Promise.all([
          dispatch(loadMe())
        ]);
      })
      .then(() => {
        dispatch(authenticateUserSuccess(authenticationToken));

        resolve();
      })
      .catch(error => {
        dispatch(ajaxCallError(error));
        reject(error);
      });
    });
  };
}
export function forgotPassword(email_address) {
  return function(dispatch) {
    return authApi.forgotPassword(email_address)
    .then(() => {
      dispatch(forgotPasswordSuccess());
    }).catch(error => {
      throw(error);
    });
  };
}
export function resetPassword(link_id, password) {
  return function(dispatch) {
    return authApi.resetPassword(link_id, password)
    .then(() => {
      dispatch(resetPasswordSuccess());
    }).catch(error => {
      throw(error);
    });
  };
}
export function loadMe() {
  return function(dispatch) {
    return new Promise((resolve, reject) => {
      let me;

      authApi.me()
      .then((result) => {
        me = result;

        let companyId = sessionStorage.getItem('companyId');

        switch(me.user_type) {
          case "Administrator": {
            if(!companyId) {
              companyId = me.company;
              sessionStorage.setItem('companyId', companyId);
            }

            return Promise.all([
              dispatch(loadCompany(companyId)),
              dispatch(loadAllCompanies())
            ]);
          }
          case "Organization": {
            let companyId = sessionStorage.getItem('companyId');
            if(!companyId) {
              companyId = me.company;
              sessionStorage.setItem('companyId', companyId);
            }

            return Promise.all([
              dispatch(loadCompany(companyId))
            ]);
          }
          default: {
            sessionStorage.removeItem('companyId');

            const labId = me.lab;

            if(labId) {
              sessionStorage.setItem('labId', labId);

              return Promise.all([
                dispatch(loadLab(labId))
              ]);
            } else {
              return Promise.resolve();
            }
          }
        }

      })
      .then((results) => {
        dispatch(getMeSuccess(me));

        resolve();
      })
      .catch(error => {
        if(error.crossDomain) {
          dispatch(networkError())
          //debugger;
          reject(error);
        } else {
          dispatch(ajaxCallError(error));
          reject(error);
        }


      });
    });
  };
}
export function loadAllCompanies() {
  return function(dispatch) {
    return new Promise((resolve, reject) => {
      return companyApi.getAllCompanies().then(companies => {
        dispatch(loadAllCompaniesSuccess(companies));

        resolve();
      }).catch(error => {
        reject(error);
      });
    });
  };
}
export function loadCompany(companyId) {
  return function(dispatch) {
    return new Promise((resolve, reject) => {
      let company;
      return companyApi.getCompany(companyId)
      .then((results) => {
        company = results;

        return Promise.all([
          dispatch(loadLaboratoryProfiles(companyId)),
          dispatch(loadSkillGroups(companyId)),
          dispatch(loadApplications(companyId)),
          dispatch(loadLabs(companyId)),
          dispatch(loadRepositoryGroups()),
          dispatch(loadRepositories(companyId)),
          dispatch(loadCompanyOrders(companyId)),
          dispatch(loadUsers(companyId))
        ]);
      })
      .then((results) => {
        dispatch(loadCompanySuccess(company));

        resolve();
      })
      .catch(error => {
        dispatch(ajaxCallError(error));

        reject(error);
      });
    });
  };
}
export function loadApplications(company_id) {
  return function(dispatch) {
    return new Promise((resolve, reject) => {
      return applicationsApi.getAllApplications(company_id).then(applications => {
        dispatch(loadApplicationsSuccess(applications));

        resolve();
      }).catch(error => {
        reject(error);
      });
    });
  };
}
export function loadLabs(companyId) {
  return function(dispatch) {
    return new Promise((resolve, reject) => {
      return companyLabApi.getAllLabs(companyId)
      .then((labs) => {
        dispatch(loadLabsSuccess(labs));

        resolve();
      })
      .catch(error => {
        dispatch(ajaxCallError(error));

        reject(error);
      });
    });
  };
}
export function loadRepositories(companyId) {
  return function(dispatch) {
    return new Promise((resolve, reject) => {
      return companyRepositoryApi.getAllRepositories(companyId)
      .then((labs) => {
        dispatch(loadRepositoriesSuccess(labs));

        resolve();
      })
      .catch(error => {
        dispatch(ajaxCallError(error));

        reject(error);
      });
    });
  };
}
export function loadCompanyOrders(company_id) {
  return function(dispatch) {
    return new Promise((resolve, reject) => {
      return companyRepositoryApi.getAllRepositoriesByType(company_id, "Orders")
      .then(orders => {
        dispatch(loadCompanyOrdersSuccess(orders));

        resolve();
      }).catch(error => {
        reject(error);
      });
    });
  };
}
export function loadLab(labId) {
  return function(dispatch) {
    return new Promise((resolve, reject) => {
      let lab;
      return labApi.getLab(labId)
      .then((results) => {
        lab = results;

        return Promise.all([
          dispatch(loadNotes(labId)),
          dispatch(loadLabOrders(labId)),
          dispatch(loadLabMembers(labId))
        ]);
      })
      .then((results) => {
        lab.notes = results[0];
        lab.orders = results[1];
        lab.lab_members = results[2];

        dispatch(loadLabSuccess(lab));

        resolve();
      })
      .catch(error => {
        dispatch(ajaxCallError(error));

        reject(error);
      });
    });
  };
}
export function loadLabOrders(lab_id, page, name) {
  return function(dispatch) {
    return new Promise((resolve, reject) => {
      if(!page) {
        page = 1;
      }
      return labRepositoryApi.getAllRepositoriesByType(lab_id, "Orders")
      .then(orders => {
        resolve(orders);
      }).catch(error => {
        reject(error);
      });
    });
  };
}
export function loadNotes(lab_id, page, name) {
  return function(dispatch) {
    return new Promise((resolve, reject) => {
      if(!page) {
        page = 1;
      }
      return labRepositoryApi.getAllRepositoriesByType(lab_id, "Notes")
      .then(notes => {
        resolve(notes);
      }).catch(error => {
        reject(error);
      });
    });
  };
}
export function loadLabMembers(lab_id) {
  return function(dispatch) {
    return new Promise((resolve, reject) => {
      return labRepositoryApi.getAllRepositoriesByType(lab_id, "LabMembers").then(lab_members => {
        resolve(lab_members);
      }).catch(error => {
        reject(error);
      });
    });
  };
}
export function changeSelectedCompany(company, user) {
  return function(dispatch) {
    return new Promise((resolve, reject) => {

      let companyId = company._id;
      sessionStorage.setItem('companyId', companyId);

      Promise.all([
        dispatch(loadCompany(companyId)),
        dispatch(loadAllCompanies())
      ])
      .then(() => {
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
    });
  };
}
export function changeSelectedApplication(application) {
  return function(dispatch) {
    return new Promise((resolve, reject) => {
      dispatch(loadApplicationSuccess(application));

      resolve();
    });
  };
}
export function changeSelectedLab(lab) {
  return function(dispatch) {
    return new Promise((resolve, reject) => {
      dispatch(loadLabSuccess(lab));

      resolve();
    });
  };
}
export function changeSelectedRepository(repository) {
  return function(dispatch) {
    return new Promise((resolve, reject) => {
      dispatch(loadRepositorySuccess(repository));

      resolve();
    });
  };
}
export function saveUser(user) {
  return function(dispatch) {
    return authApi.updateUser(user).then(savedUser => {
      dispatch(updateMeSuccess(savedUser));
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  };
}
export function changePassword(current_password, new_password) {
  return function(dispatch) {
    return authApi.changePassword(current_password, new_password)
    .then(() => {
      dispatch(updatePasswordSuccess());
    })
    .catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  };
}
export function logoutUser() {
  return function(dispatch) {
    sessionStorage.clear();

    dispatch(userLogoutSuccess());
  };
}
