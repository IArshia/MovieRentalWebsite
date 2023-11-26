import http from "./httpService";
import { jwtDecode } from "jwt-decode";

export async function login(username, password) {
  const { data: jwt } = await http.post("/auth/jwt/create/", {
    username: username,
    password: password,
  });
  localStorage.setItem("access token", jwt.access);
}
export function logout() {
  localStorage.removeItem("access token");
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem("access token");
    return [jwtDecode(jwt), jwt];
  } catch (ex) {
    return null;
  }
}

export default {
  login,
  logout,
  getCurrentUser,
};
