import { DELETE, GET, PATCH, POST } from "../utils/request";

export const checkExist = async (key, value) => {
  const result = await GET(`users?${key}=${value}`);
  return result;
};

export const usersRegister = async (data) => {
  const result = await POST(`users/register`, data);
  return result;
};

export const usersLogin = async (data) => {
  const result = await POST(`users/login`, data);
  return result;
};

export const usersInfo = async () => {
  const result = await GET(`users/info`);
  return result;
};

export const usersCreate = async (data) => {
  const result = await POST(`users/create`, data);
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

export const usersIndex = async () => {
  const result = await GET(`users`);
  return result;
};

export const deleteUser = async (id) => {
  const result = await DELETE(`users/${id}`);
  return result;
};