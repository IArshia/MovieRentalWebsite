import http from "./httpService";

export function getMovies() {
  return http.get("/movies/");
}
export function getMovie(movieId) {
  return http.get("/movies/" + movieId);
}
export function saveMovie(movie) {
  if (movie.id) {
    const body = { ...movie };
    delete body.id;
    return http.put("/movies/" + movie.id + "/", body);
  }
  return http.post("/movies/", movie);
}

export function deleteMovie(movieId) {
  return http.delete("/movies/" + movieId);
}
