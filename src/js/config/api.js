import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.API_BASE_URL || 'https://app.homologacao.yjaraviagens.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

