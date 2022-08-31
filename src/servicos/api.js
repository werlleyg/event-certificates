import axios from 'axios';

export default axios.create({
  baseURL: `https://api.alanaraujo.eng.br/`,
  // baseURL: `https://testeproducao.alanaraujo.eng.br/`,
  // responseType: "json"
});
