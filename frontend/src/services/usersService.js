import { DELETE, GET, PATCH, POST } from "../utils/request";

export const checkExist = async (key, value) => {
  const result = await GET(`users?${key}=${value}`);
  return result;
};

export const createUser = async (data) => {
  const result = await POST(`users/register`, data);
  return result;
};

export const loginUser = async (username, password) => {
  const result = await GET(`users?username=${username}&password=${password}`);
  return result;
};

export const getDetailUser = async (id) => {
  const result = await GET(`users/${id}`);
  return result;
};

export const editUser = async (id, data) => {
  const result = await PATCH(`users/${id}`, data);
  return result;
};

export const getListUsers = async () => {
  const result = await GET(`users`);
  return result;
};

export const deleteUser = async (id) => {
  const result = await DELETE(`users/${id}`);
  return result;
};