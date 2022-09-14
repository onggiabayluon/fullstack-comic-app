import axios from "axios";
import dayjs from "dayjs";
import jwt_decode from "jwt-decode";
import { useContext } from "react";
import UserContext from "~/contexts/UserContext";

function useAxios() {
  const { authTokens, setUser, setAuthTokens } = useContext(UserContext);

  const axiosInstance = axios.create({
    baseURL,
    headers: { Authorization: `Bearer ${authTokens?.access}` },
  });

  axiosInstance.interceptors.request.use(async (req) => {
    const user = jwt_decode(authTokens.access);
    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

    if (!isExpired) return req;

    const response = await axios.post(`${baseURL}/token/refresh/`, {
      refresh: authTokens.refresh,
    });

    setAuthTokens(JSON.stringify(response.data));
    // localStorage.setItem("authTokens", JSON.stringify(response.data)); ❌ check here

    // setAuthTokens(response.data);
    setUser(jwt_decode(response.data.access));

    req.headers.Authorization = `Bearer ${response.data.access}`;
    return req;
  });

  function makeRequest(url, options) {
    return axiosInstance(url, options)
      .then((res) => res.data)
      .catch((error) =>
        Promise.reject(error?.response?.data?.message ?? "Error")
      );
  }

  return { axiosInstance, makeRequest };
}

export default useAxios;
