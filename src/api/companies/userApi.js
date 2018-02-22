import superagent from 'superagent';
import authenticatedSuperAgent from '../authenticatedSuperAgent';

const _validateUser = function(user) {
  const minEmailAddressLength = 5;
  const minPasswordLength = 5;

  if (user.email_address.length < minEmailAddressLength) {
    return {
      isValid: false,
      message: `Email Address must be at least ${minEmailAddressLength} characters.`
    };
  }
  // if (user.password.length < minPasswordLength) {
  //   return {
  //     isValid: false,
  //     message: `Password must be at least ${minPasswordLength} characters.`
  //   };
  // }
  return {
    isValid: true,
    message: null
  };
};
class UserApi {
  static getUser(company_id, user_id) {
    return new Promise((resolve, reject) => {
      authenticatedSuperAgent('GET', `/api/companies/${company_id}/users/${user_id}`)
      .set('Content-Type', 'application/json')
      .end(function(err, res) {
        if(err) {
          return reject(err);
        }
        resolve(res.body);
      });
    });
  }
  static getAllUsers(company_id, page, firstName, lastName) {
    return new Promise((resolve, reject) => {
      let url = `/api/companies/${company_id}/users`;
      if(page) {
        url = `${url}?page=${page}`;
      } else {
        url = `${url}?page=1`;
      }
      if(firstName) {
        url = `${url}&first_name=${firstName}`;
      }
      if(lastName) {
        url = `${url}&last_name=${lastName}`;
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
  static saveUser(company_id, user) {
    const isValid = _validateUser(user);

    if (user._id) {
      return new Promise((resolve, reject) => {
        if (!isValid) {
          reject(isValid.message);
        }
        authenticatedSuperAgent('PUT', `/api/companies/${company_id}/users/${user._id}`)
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
          reject(isValid.message);
        }
        authenticatedSuperAgent('POST', `/api/companies/${company_id}/users`)
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
  static deleteUser(company_id, user) {
    return new Promise((resolve, reject) => {
      authenticatedSuperAgent('DELETE', `/api/companies/${company_id}/users/${user._id}`)
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

export default UserApi;
