import axios from "axios";

const api = axios.create({
  baseURL: "https://api.tu-servidor.com", // Reemplaza con tu URL real
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Puedes agregar interceptores aquí si necesitas enviar tokens de sesión
export default api;
