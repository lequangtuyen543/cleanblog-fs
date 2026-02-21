import { DELETE, GET, PATCH, POST } from "../utils/request";

export const rolesIndex = async () => {
  const result = await GET(`roles`);
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