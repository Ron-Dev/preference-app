import axios from 'axios';

const apiService = axios.create({
  baseURL: '/api',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
});

export const login = (data) => {
  return apiService.post('/user/login', data);
};

export const updatePreferredColor = (data) => {
  return apiService.patch(`/user/preferredcolor`, data);
};

export const setAuthToken = (token) => {
  apiService.interceptors.request.use((request) => {
    if (token) {
      request.headers['token'] = token;
    }
    return request;
  });
};
