import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8001/api/user',
});

export const signup = (data) => API.post('/add', data);
export const login = (data) => API.post('/login', data);
export const getUsers = () => API.get('/list?page=1');
export const deleteUser = (userId) => API.delete(`/delete?userId=${userId}`);
// export const updateUser = (userId, data) =>API.patch(`/update?userId=${userId}`, data);
export const updateUser = (id, payload) => {
  return axios.patch(`http://localhost:8001/api/user/update?userId=${id}`, payload);
};