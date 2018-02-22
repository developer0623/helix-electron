import superagent from 'superagent';
import authenticatedSuperAgent from './authenticatedSuperAgent';

const API_URL = 'http://localhost:3000/api';

export function errorHandler(dispatch, error, type) {
  let errorMessage = '';

  if(error.data.error) {
    errorMessage = error.data.error;
  } else if(error.data) {
    errorMessage = error.data;
  } else {
    errorMessage = error;
  }

  if(error.status === 401) {
    dispatch({
      type: type,
      payload: 'You are not authorized to do this. Please login and try again.'
    });
    //logoutUser();
  } else {
    dispatch({
      type: type,
      payload: errorMessage
    });
  }
}
class AuthApi {
  static registerUser(user) {
    return new Promise((resolve, reject) => {
      superagent
      .post('/api/register')
      .set('Content-Type', 'application/json')
      .send(user)
      .end(function(err, res) {
        if(err) {
          return reject(err);
        }

        resolve(res.body);
      });
    });
  }
  static forgotPassword(email_address) {
    return new Promise((resolve, reject) => {
      superagent
      .post('/api/forgot_password')
      .set('Content-Type', 'application/json')
      .send({ email_address: email_address })
      .end(function(err, res) {
        if(err) {
          return reject(err);
        }

        resolve(res.body);
      });
    });
  }
  static resetPassword(link_id, password) {
    return new Promise((resolve, reject) => {
      superagent
      .post(`/api/reset_password/${link_id}`)
      .set('Content-Type', 'application/json')
      .send({ password: password })
      .end(function(err, res) {
        if(err) {
          return reject(err);
        }

        resolve(res.body);
      });
    });
  }
  static updateUser(user) {
    return new Promise((resolve, reject) => {
      delete user["context"];
      delete user["name"];

      authenticatedSuperAgent('PUT', '/api/me')
      .set('Content-Type', 'application/json')
      .send(user)
      .end(function(err, res) {
        if(err) {
          return reject(err);
        }

        resolve(res.body);
      });
    });
  }
  static changePassword(current_password, new_password) {
    return new Promise((resolve, reject) => {
      authenticatedSuperAgent('POST', '/api/me/change_password')
      .set('Content-Type', 'application/json')
      .send({
        current_password: current_password,
        new_password: new_password
      })
      .end(function(err, res) {
        if(err) {
          return reject(err);
        }

        resolve(res.body);
      });
    });
  }
  static loginUser(credentials) {
    return new Promise((resolve, reject) => {
      superagent
      .post('/api/oauth2/token')
      .set('Content-Type', 'application/json')
      .send(credentials)
      .end(function(err, res) {
        if(err) {
          return reject(err);
        }
        resolve(res.body);
      });
    });
  }
  static authenticate(credentials) {
    return new Promise((resolve, reject) => {
      superagent
      .post('/api/link/authorize')
      .set('Content-Type', 'application/json')
      .send(credentials)
      .end(function(err, res) {
        if(err) {
          return reject(err);
        }
        resolve(res.body);
      });
    });
  }
  static me() {
    return new Promise((resolve, reject) => {
      authenticatedSuperAgent('GET', '/api/me')
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

export default AuthApi;
