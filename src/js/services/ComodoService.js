import {api} from '../config/api';

export const ComodoService = {
  getPoltronas: (params = {}) => api.get('api/comodos/poltronas', { params }),
  getCamarotes: (params = {}) => api.get('api/comodos/camarotes', { params }),
  getComodosLivres: (params = {}) => api.get('api/comodos/livres-por-tipo', { params }),
  iniciarVenda: (params = {}) => api.post('api/reservas/comecar-venda', params),
  reservarComodo: (params = {}) => api.post('api/reservas/comodo', params),
  deletarReserva: (params = {}) => api.delete('api/reservas/comodo', {data: params})
}; 