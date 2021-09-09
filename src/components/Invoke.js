import axios from 'axios';

class Invoke {
  constructor(token, isHttpsOnly = false) {
    this.axios = axios.create();
    this.accessToken = token;
    this.isHttpsOnly = isHttpsOnly;
    this.cancelToken = axios.CancelToken;
    this.cancelTokens = [];
    this.lastRequest = null;
    this.staticHeaders = {
      'Content-Type': 'application/json',
      // Authorization: `Bearer ${token}`,
    };
  }

  setInterceptor(funcOnError) {
    this.axios.interceptors.response.use(null, funcOnError);
  }

  setToken(token) {
    this.accessToken = token;
  }

  setHttpsOnly(_true) {
    this.isHttpsOnly = _true;
  }

  retryRequest(newToken) {
    if (newToken != null) {
      this.staticHeaders.Authorization = `Bearer ${newToken}`;
      this.lastRequest.config.headers = {
        ...this.lastRequest.config.headers,
        ...this.staticHeaders.Authorization
      };
    }
    switch (this.lastRequest.method) {
      default:
        return this.axios.get(this.lastRequest.url, this.lastRequest.config);
      case 'POST':
        return this.axios.post(
          this.lastRequest.url,
          this.lastRequest.data,
          this.lastRequest.config,
        );
      case 'PUT':
        return this.axios.put(
          this.lastRequest.url,
          this.lastRequest.data,
          this.lastRequest.config,
        );
      case 'DELETE':
        return this.axios.delete(this.lastRequest.url, this.lastRequest.config);
    }
  }

  get(url, headers, options) {
    const token = this.cancelToken.source();
    this.cancelTokens.push(token);
    // if (this.isHttpsOnly && url.indexOf('https') < 0) {
    //   return Promise.reject('Must be a HTTPS Protocol');
    // }
    this.lastRequest = {
      method: 'GET',
      url,
      config: {
        ...options,
        headers: { ...this.staticHeaders, ...headers },
        cancelToken: token.token,
        data: null
      }
    };
    return this.axios.get(this.lastRequest.url, this.lastRequest.config);
  }

  post(url, data, headers, options) {
    const token = this.cancelToken.source();
    this.cancelTokens.push(token);
    // if (this.isHttpsOnly && url.indexOf('https') < 0) {
    //   return Promise.reject('Must be a HTTPS Protocol')
    // }
    this.lastRequest = {
      method: 'POST',
      url,
      data,
      config: {
        ...options,
        headers: { ...this.staticHeaders, ...headers },
        cancelToken: token.token
      }
    };
    return this.axios.post(url, data, this.lastRequest.config);
  }

  put(url, data, headers, options) {
    const token = this.cancelToken.source();
    this.cancelTokens.push(token);
    // if (this.isHttpsOnly && url.indexOf('https') < 0) {
    //   return Promise.reject('Must be a HTTPS Protocol')
    // }
    this.lastRequest = {
      method: 'PUT',
      url,
      data,
      config: {
        ...options,
        headers: { ...this.staticHeaders, ...headers },
        cancelToken: token.token
      }
    };
    return this.axios.put(url, data, this.lastRequest.config);
  }

  delete(url, options) {
    const token = this.cancelToken.source();
    this.cancelTokens.push(token);
    // if (this.isHttpsOnly && url.indexOf('https') < 0) {
    //   return Promise.reject('Must be a HTTPS Protocol')
    // }
    this.lastRequest = {
      method: 'DELETE',
      url,
      data: null,
      config: {
        ...options,
        headers: { ...this.staticHeaders },
        cancelToken: token.token
      }
    };
    return this.axios.delete(url, this.lastRequest.config);
  }

  cancelAll(reason = 'Request Canceled') {
    this.cancelTokens.forEach(token => token.cancel(reason));
  }
}
export default Invoke;
