import axios from "axios";

export default axios.create({
  baseURL: "https://cors-anywhere.herokuapp.com/https://srv1.ticketlog.com.br/ticketlog-servicos/ebs/",
  headers: {
    'Authorization': 'Basic W09wZXJhZG9yV2ViXWFwcDI5NDA2NDEwOToxbHA1dVpQag==',
    "Content-type": "application/json"
  }
});