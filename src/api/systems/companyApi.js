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
class CompanyApi {
  static getCompany(company_id) {
    return new Promise((resolve, reject) => {
      let url = `/api/systems/companies/${company_id}`;

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
      let url = '/api/systems/companies'
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
      let url = '/api/systems/companies/paged';
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
        authenticatedSuperAgent('PUT', '/api/systems/companies/' + company._id)
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
        authenticatedSuperAgent('POST', '/api/systems/companies')
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
      authenticatedSuperAgent('DELETE', '/api/systems/companies/' + company._id)
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
