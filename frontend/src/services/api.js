import axios from "axios";

// Configuração base da API
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:7070';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para tratamento de erros
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Erro na API:", error);
    return Promise.reject(error);
  }
);

export const calcularMelhorRota = async (dados) => {
  try {
    console.log(dados);
    const response = await api.post("/calcular-rota", dados);
    return response.data;
  } catch (error) {
    throw new Error(
      "Não foi possível obter as recomendações do servidor",
      error
    );
  }
};
