import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:3000/',
  withCredentials: true,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

async function makeRequest(endpoint: string, method: string, payload?: object) {
  try {
    return await api.request({ url: endpoint, method, data: payload, withCredentials: true });
  } catch (error) {
    return error;
  }
}

export async function signIn(username: string, password: string) {
  return await makeRequest('login', 'POST', { username, password });
}

export async function getUser() {
  return await makeRequest('me', 'get');
}
