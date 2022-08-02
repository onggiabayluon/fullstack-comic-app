import axios from "axios";
const httpRequest = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API_ENDPOINT,
});

export const get = async (path, options = {}) => {
  const response = await httpRequest.get(path, options);
  return response.data;
};

export default httpRequest;
