import superagent from 'superagent';
import cookie from 'react-cookie';

function request(method, url) {
  const token = cookie.load('token');

  if (token) {
    return superagent(method, url)
      .set('AUTHORIZATION', 'Bearer ' + token);
  } else {
    return superagent(method, url);
  }
}

export default request;
