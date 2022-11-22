import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://waiterapi-production.up.railway.app',
});
