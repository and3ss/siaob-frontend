import http from "./http-common";

class TicketLogDataService {

  getUsuarioCartaoLimite(numeroCartao, data) {
    return http.get(`/usuarioCartaoLimite/${numeroCartao}`, {params: data});
  }

  async getTransacaoVeiculo(params) {
    try {
      let response = await http.post(`/transacaoVeiculo/search`, params);
  
      return response;
    } catch (err) {
      console.error(err);
    }
  }

  async getRelatorioExtratoSimplificado(params) {
    try {
      let response = await http.post(`/relatorioExtratoSimplificado/search`, params);
  
      return response;
    } catch (err) {
      console.error(err);
    }
  }

  async putUsuarioCartaoLimite(params) {
    try {
      let response = await http.put(`/usuarioCartaoLimite`, params);
  
      return response;
    } catch (err) {
      console.error(err);
    }
  }
}

export default new TicketLogDataService();