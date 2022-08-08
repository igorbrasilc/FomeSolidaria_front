import axios from 'axios';
import Categories from '../types/categoryTypes';

const baseAPI = axios.create({
  baseURL: 'http://localhost:4000',
});

interface AdminData {
    username: string;
    password: string;
  }

function getConfig(token: string) {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
}

async function signIn(signInData: AdminData) {
  return baseAPI.post<{ token: string }>('/sign-in', signInData);
}

async function getCategoryCount(category: Categories, token: string) {
  const config = getConfig(token);
  return baseAPI.get<{ categoryCount: number }>(`/categories/${category}`, config);
}

async function searchInput(input: string, token: string) {
  const config = getConfig(token);
  return baseAPI.get(`/search?input=${input}`, config);
}

const api = {
  signIn, getConfig, getCategoryCount, searchInput,
};

export default api;
