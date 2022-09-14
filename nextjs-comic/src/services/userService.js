import { makeRequest } from "~/utils/httpRequest";

export function login({ username, password }) {
  return makeRequest(`api/token/`, {
    method: "POST",
    data: { username, password },
  });
}

export function register({ username, password, password2 }) {
  return makeRequest(`api/register/`, {
    method: "POST",
    data: { username, password, password2 },
  });
}
