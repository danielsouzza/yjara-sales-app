import {api} from '../config/api';

export const CustomizeService = {
  getCustomize: (params = {}) => api.get('api/empresa/tema', { params }),
};