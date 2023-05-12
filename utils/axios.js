import axios from 'axios';

const defaultOptions = {
  baseURL: 'http://192.168.8.81:8090/api/',
  // baseURL: 'http://172.20.10.8:8090/api/',
  timeout: 5000
}

let http = axios.create(defaultOptions);

http.interceptors.request.use(function (config) {
//   const token = localStorage.getItem('token');
  config.headers['x-token'] = 'mJnEHL2E9LSKkzdTyeUC_eD2ameSgDXWVwC9Zkdkv'
  return config;
});

const API = {
  getLanguageUrl: 'language/',
  signInUrl: 'signin'
}

export {
  API,
}

export default http;