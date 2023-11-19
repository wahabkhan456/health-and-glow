import {create} from 'apisauce';

const api = create({
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

class ApiSauce {
  async post(url, payload) {
    const Header = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await api.post(url, payload, {headers: Header});

    return new Promise((resolve, reject) => {
      this.handlePromise(resolve, reject, response);
    });
  }

  async postWithToken(url, payload, token) {
    const Header = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await api.post(url, payload, Header);

    return new Promise((resolve, reject) => {
      this.handlePromise(resolve, reject, response);
    });
  }

  async get(url) {
    

    const response = await api.get(url);
    return new Promise((resolve, reject) => {
      this.handlePromise(resolve, reject, response);
    });
  }

  handlePromise = (resolve, reject, response) => {
    if (response.ok && response.data && response.originalError === null) {
      resolve(response.data);
    } else {
      if (
        response.status === 404 &&
        !response.ok &&
        response.originalError !== null
      ) {
        reject(response.problem);
      }
    }
  };
}

export default new ApiSauce();
