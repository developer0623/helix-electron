import * as types from '../actions/actionTypes';
import initialState from './initialState';
import _ from 'lodash';

export default function authReducer(state = initialState.auth, action) {
  switch(action.type) {
    case types.LOAD_COMPANY_ORDERS: {
      return {
        application: state.application,
        applications: state.applications,
        currentUser: state.currentUser,
        company: state.company,
        companies: state.companies,
        lab: state.lab,
        labs: state.labs,
        repository: state.repository,
        repositories: state.repositories,
        inventories: state.inventories,
        token: state.token,
        companyOrders: action.orders
      };
    }
    case types.AUTH_SET_TOKEN:
      return {
        application: state.application,
        applications: state.applications,
        currentUser: state.currentUser,
        company: state.company,
        companies: state.companies,
        lab: state.lab,
        labs: state.labs,
        repository: state.repository,
        repositories: state.repositories,
        inventories: state.inventories,
        token: action.token.access_token,
        companyOrders: state.companyOrders
      };
    case types.AUTH_SET_USER: {
      return {
        application: state.application,
        applications: state.applications,
        currentUser: action.user,
        company: state.company,
        companies: state.companies,
        lab: state.lab,
        labs: state.labs,
        repository: state.repository,
        repositories: state.repositories,
        inventories: state.inventories,
        token: state.token,
        companyOrders: state.companyOrders
      };
    }
    case types.AUTH_UPDATE_USER: {
      return {
        application: state.application,
        applications: state.applications,
        currentUser: action.user,
        company: state.company,
        companies: state.companies,
        lab: state.lab,
        labs: state.labs,
        repository: state.repository,
        repositories: state.repositories,
        inventories: state.inventories,
        token: state.token,
        companyOrders: state.companyOrders
      };
    }
    case types.AUTH_SET_COMPANIES: {
      return {
        application: state.application,
        applications: state.applications,
        currentUser: state.currentUser,
        company: state.company,
        companies: _.sortBy(action.companies, "name"),
        lab: state.lab,
        labs: state.labs,
        repository: state.repository,
        repositories: state.repositories,
        inventories: state.inventories,
        token: state.token,
        companyOrders: state.companyOrders
      };
    }
    case types.AUTH_SET_COMPANY: {
      return {
        application: state.application,
        applications: state.applications,
        currentUser: state.currentUser,
        company: action.company,
        companies: state.companies,
        lab: state.lab,
        labs: state.labs,
        repository: state.repository,
        repositories: state.repositories,
        inventories: state.inventories,
        token: state.token,
        companyOrders: state.companyOrders
      };
    }
    case types.UPDATE_COMPANY_SUCCESS: {
      return {
        application: state.application,
        applications: state.applications,
        currentUser: state.currentUser,
        company: Object.assign({}, action.company),
        companies: state.companies,
        lab: state.lab,
        labs: state.labs,
        repository: state.repository,
        repositories: state.repositories,
        inventories: state.inventories,
        token: state.token,
        companyOrders: state.companyOrders
      };
    }
    case types.CREATE_COMPANY_USER_SUCCESS: {
      const company = Object.assign({}, state.company);
      company.organization_users = _.sortBy([
        ...state.company.organization_users,
        Object.assign({}, action.user)
      ], "last_name");

      return {
        application: state.application,
        applications: state.applications,
        currentUser: state.currentUser,
        company: company,
        companies: state.companies,
        lab: state.lab,
        labs: state.labs,
        repository: state.repository,
        repositories: state.repositories,
        inventories: state.inventories,
        token: state.token,
        companyOrders: state.companyOrders
      };
    }
    case types.UPDATE_COMPANY_USER_SUCCESS: {
      const company = Object.assign({}, state.company);
      company.organization_users = _.sortBy([
        ...state.company.organization_users.filter(user => user._id !== action.user._id),
        Object.assign({}, action.user)
      ], "last_name");

      return {
        application: state.application,
        applications: state.applications,
        currentUser: state.currentUser,
        company: company,
        companies: state.companies,
        lab: state.lab,
        labs: state.labs,
        repository: state.repository,
        repositories: state.repositories,
        inventories: state.inventories,
        token: state.token,
        companyOrders: state.companyOrders
      };
    }
    case types.DELETE_COMPANY_USER_SUCCESS: {
      const company = Object.assign({}, state.company);
      company.organization_users = _.sortBy([
        ...state.company.organization_users.filter(user => user._id !== action.user._id)
      ], "last_name");

      return {
        application: state.application,
        applications: state.applications,
        currentUser: state.currentUser,
        company: company,
        companies: state.companies,
        lab: state.lab,
        labs: state.labs,
        repository: state.repository,
        repositories: state.repositories,
        inventories: state.inventories,
        token: state.token,
        companyOrders: state.companyOrders
      };
    }
    case types.AUTH_SET_APPLICATIONS:
      return {
        application: state.application,
        applications: action.applications,
        currentUser: state.currentUser,
        company: state.company,
        companies: state.companies,
        lab: state.lab,
        labs: state.labs,
        repository: state.repository,
        repositories: state.repositories,
        inventories: state.inventories,
        token: state.token,
        companyOrders: state.companyOrders
      };
    case types.CREATE_COMPANY_APPLICATION_SUCCESS:
      return {
        application: state.application,
        applications: [
          ...state.applications,
          Object.assign({}, action.application)
        ],
        currentUser: state.currentUser,
        company: state.company,
        companies: state.companies,
        lab: state.lab,
        labs: state.labs,
        repository: state.repository,
        repositories: state.repositories,
        inventories: state.inventories,
        token: state.token,
        companyOrders: state.companyOrders
      };
    case types.UPDATE_COMPANY_APPLICATION_SUCCESS:
      return {
        application: state.application,
        applications: [
          ...state.applications.filter(application => application._id !== action.application._id),
          Object.assign({}, action.application)
        ],
        currentUser: state.currentUser,
        company: state.company,
        companies: state.companies,
        lab: state.lab,
        labs: state.labs,
        repository: state.repository,
        repositories: state.repositories,
        inventories: state.inventories,
        token: state.token,
        companyOrders: state.companyOrders
      };
    case types.AUTH_SET_LAB:
      return {
        application: state.application,
        applications: state.applications,
        currentUser: state.currentUser,
        company: state.company,
        companies: state.companies,
        lab: action.lab,
        labs: state.labs,
        repository: state.repository,
        repositories: state.repositories,
        inventories: state.inventories,
        token: state.token,
        companyOrders: state.companyOrders
      };
    case types.AUTH_SET_LABS:
      return {
        application: state.application,
        applications: state.applications,
        currentUser: state.currentUser,
        company: state.company,
        companies: state.companies,
        lab: state.lab,
        labs: action.labs,
        repository: state.repository,
        repositories: state.repositories,
        inventories: state.inventories,
        token: state.token,
        companyOrders: state.companyOrders
      };
    case types.CREATE_LAB_SUCCESS: {
      return {
        application: state.application,
        applications: state.applications,
        currentUser: state.currentUser,
        company: state.company,
        companies: state.companies,
        lab: state.lab,
        labs: [
          ...state.labs,
          Object.assign({}, action.lab)
        ],
        repository: state.repository,
        repositories: state.repositories,
        inventories: state.inventories,
        token: state.token,
        companyOrders: state.companyOrders
      };
    }
    case types.UPDATE_LAB_SUCCESS: {
      return {
        application: state.application,
        applications: state.applications,
        currentUser: state.currentUser,
        company: state.company,
        companies: state.companies,
        lab: state.lab,
        labs: [
          ...state.labs.filter(lab => lab._id !== action.lab._id),
          Object.assign({}, action.lab)
        ],
        repository: state.repository,
        repositories: state.repositories,
        inventories: state.inventories,
        token: state.token,
        companyOrders: state.companyOrders
      };
    }
    case types.AUTH_SET_REPOSITORY:
      return {
        application: state.application,
        applications: state.applications,
        currentUser: state.currentUser,
        company: state.company,
        companies: state.companies,
        lab: state.lab,
        labs: state.labs,
        repository: action.repository,
        repositories: state.repositories,
        inventories: state.inventories,
        token: state.token,
        companyOrders: state.companyOrders
      };
    case types.AUTH_SET_REPOSITORIES: {
      const repositories = action.repositories;
      const inventories = _.filter(action.repositories, { repository_type: { type_name: 'Inventory'} });

      return {
        application: state.application,
        applications: state.applications,
        currentUser: state.currentUser,
        company: state.company,
        companies: state.companies,
        lab: state.lab,
        labs: state.labs,
        repository: state.repository,
        repositories: repositories,
        inventories: inventories,
        token: state.token,
        companyOrders: state.companyOrders
      };
    }
    case types.DELETE_REPOSITORY_SUCCESS: {
      return {
        application: state.application,
        applications: state.applications,
        currentUser: state.currentUser,
        company: state.company,
        companies: state.companies,
        lab: state.lab,
        labs: state.labs,
        repository: state.repository,
        repositories: [
          ...state.repositories.filter(repository => repository._id !== action.repository._id)
        ],
        inventories: state.inventories,
        token: state.token,
        companyOrders: state.companyOrders
      };
    }
    case types.UPDATE_REPOSITORY_SUCCESS: {
      return {
        application: state.application,
        applications: state.applications,
        currentUser: state.currentUser,
        company: state.company,
        companies: state.companies,
        lab: state.lab,
        labs: state.labs,
        repository: state.repository,
        repositories: [
          ...state.repositories.filter(repository => repository._id !== action.repository._id),
          Object.assign({}, action.repository)
        ],
        inventories: state.inventories,
        token: state.token,
        companyOrders: state.companyOrders
      };
    }
    case types.AUTH_SET_SELECTED_COMPANY:
      return {
        application: state.application,
        applications: state.applications,
        currentUser: state.currentUser,
        company: action.company,
        companies: state.companies,
        lab: state.lab,
        labs: state.labs,
        repository: state.repository,
        repositories: state.repositories,
        inventories: state.inventories,
        token: state.token,
        companyOrders: state.companyOrders
      };
    case types.AUTH_SET_SELECTED_APPLICATION:
      return {
        application: action.application,
        applications: state.applications,
        currentUser: state.currentUser,
        company: state.company,
        companies: state.companies,
        lab: state.lab,
        labs: state.labs,
        repository: state.repository,
        repositories: state.repositories,
        inventories: state.inventories,
        token: state.token,
        companyOrders: state.companyOrders
      };
    case types.AUTH_DISCARD_TOKEN:
      return Object.assign({}, initialState);
      // return {
      //   application: [],
      //   applications: {},
      //   currentUser: {},
      //   token: {},
      //   company: {},
      //   labs: [],
      //   companies: [],
      //   repository: {},
      //   repositories: [],
      //   inventories: [],
      //   lab: {},
      //   companyOrders: []
      // };
    default:
      return state;
  }
}
