import {api} from '../config/api';

export const ViagemService = {
  getTrechosViagem: (params = {}) => api.get('/api/trechos-viagem', { params }),
};
