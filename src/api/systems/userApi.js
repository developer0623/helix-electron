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
  static getUser(user_id) {
    return new Promise((resolve, reject) => {
      authenticatedSuperAgent('GET', `/api/users/${user_id}`)
      .set('Content-Type', 'application/json')
      .end(function(err, res) {
        if(err) {
          return reject(err);
        }
        resolve(res.body);
      });
    });
  }
  static getAllUsers(page, firstName, lastName) {
    return new Promise((resolve, reject) => {
      let url = '/api/users';
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
  static saveUser(user) {
    const isValid = _validateUser(user);

    if (user._id) {
      return new Promise((resolve, reject) => {
        if (!isValid) {
          reject(isValid.message);
        }
        authenticatedSuperAgent('PUT', '/api/users/' + user._id)
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
        authenticatedSuperAgent('POST', '/api/users')
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
  static deleteUser(user) {
    return new Promise((resolve, reject) => {
      authenticatedSuperAgent('DELETE', '/api/users/' + user._id)
      .set('Content-Type', 'application/json')
      .end(function(err, res) {
        if(err) {
          return reject(err);
        }
        resolve(res.body);
      });
    });
  }
  static changeSelectedApplication(user) {
    return new Promise((resolve, reject) => {
      resolve();
    });
  }
}

export default UserApi;
