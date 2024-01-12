import axios from "axios";
const API = "http://localhost:3000";
export class ServicioEntrada {
  constructor(condicion) {
    this.condicion = condicion;
    this.data = null;
  }
  getAll = async () => {
    if (this.condicion) {
      const response = await axios.get(`${API}/entradas`);
      if (response) {
        localStorage.setItem("entradas", JSON.stringify(response.data))
        return response.data;
      }
      return null;
    } else {
      return JSON.parse(localStorage.getItem("entradas"));
    }
  };
  getById = async (id) => {
    if (this.condicion) {
      const response = await axios.get(`${API}/entrada/${id}`);
      if (response) {
        return response.data;
      }
      return null;
    }else {
        const obj = JSON.parse(localStorage.getItem("entradas"));
        const res = obj.find(item => item.id === id)
        return res;
    }
  };
  crear = async (data) => {
    const response = await axios.post(`${API}/entradas`, data);
    if (response) {
      return response.data;
    }
    return null;
  };
  search = async (params) => {
    const response = await axios.get(`${API}/entradas/busqueda?${params}`);
    if (response) {
      return response.data;
    }
    return null;
  };
}
