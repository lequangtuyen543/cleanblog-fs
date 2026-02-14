import { DELETE, GET, PATCH, POST } from "../utils/request";

export const posts = async () => {
  const result = await GET(`posts`);
  return result;
};

export const postsDetail = async (id) => {
  const result = await GET(`posts/detail/${id}`);
  return result;
};

export const postsCreate = async (data) => {
  const result = await POST(`posts/create`, data);
  return result;
};

export const editPost = async (id, data) => {
  const result = await PATCH(`posts/edit/${id}`, data);
  return result;
};

export const deletePost = async (id) => {
  const result = await DELETE(`posts/${id}`);
  return result;
};