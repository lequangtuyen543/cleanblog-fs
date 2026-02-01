import { DELETE, GET, PATCH, POST } from "../utils/request";

export const getListPosts = async () => {
  const result = await GET(`posts`);
  return result;
};

export const getDetailPost = async (id) => {
  const result = await GET(`posts/${id}`);
  return result;
};

export const createPost = async (data) => {
  const result = await POST(`posts`, data);
  return result;
};

export const editPost = async (id, data) => {
  const result = await PATCH(`posts/${id}`, data);
  return result;
};

export const deletePost = async (id) => {
  const result = await DELETE(`posts/${id}`);
  return result;
};