import axiosInstance from '../../api/axios';

const BASE_URL = '/AssetCategories';

export const fetchCategories = async () => {
  const res = await axiosInstance.get(BASE_URL);
  return res.data;
};

export const addCategory = async (payload) => {
  const res = await axiosInstance.post(BASE_URL, payload);
  return res.data;
};

export const updateCategory = async (id, payload) => {
  const res = await axiosInstance.put(`${BASE_URL}/${id}`, payload);
  return res.data;
};

export const deleteCategory = async (id) => {
  const res = await axiosInstance.delete(`${BASE_URL}/${id}`);
  return res.data;
};