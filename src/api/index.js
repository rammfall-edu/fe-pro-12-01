import axios from 'axios';

export const httpClient = axios.create({
  baseURL: 'http://localhost:3000/api/v1',
});

export const registerUser = async (body) => {
  return await httpClient.post('/user', body);
};

export const loginUser = async (body) => {
  return await httpClient.post('/user/session/start', body);
};

export const getProjects = async () => {
  console.log(httpClient.defaults.headers);
  return await httpClient.get('/project/');
};

export const createProject = async (body) => {
  return await httpClient.post('/project/', body);
};

export const deleteProject = async (id) => {
  return await httpClient.delete(`/project/${id}`);
};

export const updateProject = async (id, body) => {
  return await httpClient.put(`/project/${id}`, body);
};
