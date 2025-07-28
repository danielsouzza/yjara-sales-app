import axios from 'axios';

const api = axios.create({
  baseURL: process.env.API_BASE_URL || 'https://app.homologacao.yjaraviagens.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

api.interceptors.request.use(config => {
  const subdomain = sessionStorage.getItem('subdomain');
  if (subdomain && subdomain !== 'null') {
    if (config.method === 'get') {
      config.params.subdomain = subdomain
    } else {
      config.data.subdomain = subdomain
    }
  } 
  return config;
});

export { api };