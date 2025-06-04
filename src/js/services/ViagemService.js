import {api} from '../config/api';

export const ViagemService = {
  getTrechosViagem: (params = {}) => api.get('/api/trechos-viagem', { params }),
  getPortos: () => api.get('/api/filtros/portos'),
  getFiltros: (params = {}) => api.get('/api/filtros', { params }),
  getPassageiros: (params = {}) => api.get('api/filtros/get-passageiro', { params }),
};
