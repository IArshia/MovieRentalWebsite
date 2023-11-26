import React, { useEffect } from "react";
import MovieForm from "./movieForm";
import { useParams, useNavigate, useLocation } from "react-router-dom";

function MovieFormFunc() {
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  return <MovieForm params={params} navigate={navigate} />;
}

export default MovieFormFunc;
