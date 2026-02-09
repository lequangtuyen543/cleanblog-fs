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

export const usersList = async () => {
  const result = await GET(`users/list`);
  return result;
};

export const usersCreate = async (data) => {
  const result = await POST(`users/create`, data);
  return result;
};

export const usersDetail = async (id) => {
  const result = await GET(`users/detail/${id}`);
  return result;
};

export const usersEdit = async (id, data) => {
  const result = await PATCH(`users/edit/${id}`, data);
  return result;
};

export const usersDelete = async (id) => {
  const result = await DELETE(`users/delete/${id}`);
  return result;
};