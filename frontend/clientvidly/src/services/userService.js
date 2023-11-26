import http from "./httpService";

export function register(user) {
  return http.post("/auth/users/", {
    email: user.email,
    username: user.username,
    password: user.password,
  });
}
