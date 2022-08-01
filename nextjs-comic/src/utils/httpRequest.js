import axios from "axios";
const httpRequest = axios.create({
  baseURL: process.env.NEXT_PUBLIC_REACT_APP_BASE_URL,
});

export const get = async (path, options = {}) => {
  const response = await httpRequest.get(path, options);
  return response.data;
};

export default httpRequest;
