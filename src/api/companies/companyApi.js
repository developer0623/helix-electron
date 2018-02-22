import superagent from 'superagent';
import authenticatedSuperAgent from '../authenticatedSuperAgent';

const _validateCompany = function(company) {
  const minCompanyNameLength = 3;

  if (company.name.length < minCompanyNameLength) {
    return {
      isValid: false,
      message: `Company Name must be at least ${minCompanyNameLength} characters.`
    };
  }
  return {
    isValid: true,
    message: null
  };
};
const _validateOrganizationUser = function(user) {
  return {
    isValid: true,
    message: null
  };
};
class CompanyApi {
  static getCompany(company_id) {
    return new Promise((resolve, reject) => {
      let url = `/api/companies/${company_id}`;

      authenticatedSuperAgent('GET', url)
        .end(function(err, res) {
          if(err) {
            return reject(err);
          }
          resolve(res.body);
        });
    });
  }
  static getAllCompanies() {
    return new Promise((resolve, reject) => {
      let url = '/api/companies'
      ;
      authenticatedSuperAgent('GET', url)
        .end(function(err, res) {
          if(err) {
            return reject(err);
          }
          resolve(res.body);
        });
    });
  }
  static getCompaniesPaged(page, companyName) {
    return new Promise((resolve, reject) => {
      let url = '/api/companies/paged';
      if(page) {
        url = `${url}?page=${page}`;
      } else {
        url = `${url}?page=1`;
      }
      if(companyName) {
        url = `${url}&company_name=${companyName}`;
      }
      authenticatedSuperAgent('GET', url)
        .end(function(err, res) {
          if(err) {
            return reject(err);
          }
          resolve(res.body);
        });
    });
  }
  static saveCompany(company) {
    const isValid = _validateCompany(company);

    if (company._id) {
      return new Promise((resolve, reject) => {
        if (!isValid) {
          return reject(isValid.message);
        }
        authenticatedSuperAgent('PUT', '/api/companies/' + company._id)
        .send(company)
        .set('Content-Type', 'application/json')
        .end(function(err, res) {
          if(err) {
            return reject(err);
          }
          resolve(res.body);
        });
      });
    } else {
      return new Promise((resolve, reject) => {
        if (!isValid) {
          return reject(isValid.message);
        }
        authenticatedSuperAgent('POST', '/api/companies')
        .send(company)
        .set('Content-Type', 'application/json')
        .end(function(err, res) {
          if(err) {
            return reject(err);
          }
          resolve(res.body);
        });
      });
    }
  }
  static deleteCompany(company) {
    return new Promise((resolve, reject) => {
      authenticatedSuperAgent('DELETE', '/api/companies/' + company._id)
      .set('Content-Type', 'application/json')
      .end(function(err, res) {
        if(err) {
          return reject(err);
        }
        resolve(res.body);
      });
    });
  }
  static saveOrganizationUser(company, user) {
    const isValid = _validateOrganizationUser(user);

    if (user._id) {
      return new Promise((resolve, reject) => {
        if (!isValid) {
          return reject(isValid.message);
        }
        authenticatedSuperAgent('PUT', `/api/companies/${company._id}/users/${user._id}`)
        .send(user)
        .set('Content-Type', 'application/json')
        .end(function(err, res) {
          if(err) {
            return reject(err);
          }
          resolve(res.body);
        });
      });
    } else {
      return new Promise((resolve, reject) => {
        if (!isValid) {
          return reject(isValid.message);
        }
        authenticatedSuperAgent('POST', `/api/companies/${company._id}/users`)
        .send(user)
        .set('Content-Type', 'application/json')
        .end(function(err, res) {
          if(err) {
            return reject(err);
          }
          resolve(res.body);
        });
      });
    }
  }
  static deleteOrganizationUser(company, user) {
    return new Promise((resolve, reject) => {
      authenticatedSuperAgent('DELETE', `/api/companies/${company._id}/users/${user._id}`)
      .set('Content-Type', 'application/json')
      .end(function(err, res) {
        if(err) {
          return reject(err);
        }
        resolve(res.body);
      });
    });
  }
}

export default CompanyApi;
