import { DELETE, GET, PATCH, POST } from "../utils/request";

export const rolesIndex = async () => {
  const result = await GET(`roles`);
  return result;
};

export const rolesCreate = async (data) => {
  const result = await POST(`roles/create`, data);
  return result;
};

export const rolesEdit = async (id, data) => {
  const result = await PATCH(`roles/edit/${id}`, data);
  return result;
};

export const rolesDelete = async (id) => {
  const result = await DELETE(`roles/delete/${id}`);
  return result;
};