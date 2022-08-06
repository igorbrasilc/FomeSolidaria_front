import axios from 'axios';

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

const api = {
  signIn,
};

export default api;
