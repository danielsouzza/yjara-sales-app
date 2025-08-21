import {api} from '../config/api';

export const PedidoService = {
  my: (params = {}) => api.get('api/pedidos', params),
  create: (params = {}) => api.post('api/pedidos', params),
  sync: (order_id) => api.patch(`api/pedidos/${order_id}/associar`),
  open: (params = {}) => api.get('api/pedidos/ultimo-aberto/dados', { params }),
  delete: (order_id, params = {}) => api.delete(`api/pedidos/${order_id}/remover-comodo`, { data: params }),
  confirm: (order_id, params = {}) => api.post(`api/pedidos/${order_id}/gerar-passagens`, params),
  sendPassenger: (order_id) => api.get(`api/pedidos/exportar-de-pedido/${order_id}/enviar-contato`),
  paymentPix: (params = {}) => api.post('api/pagamentos/pix', params),
  paymentCredito: (params = {}) => api.post('api/pagamentos/credito', params),
  paymentStatus: (order_id, params = {}) => api.get(`api/pedidos/${order_id}/status`,{params}),
};
