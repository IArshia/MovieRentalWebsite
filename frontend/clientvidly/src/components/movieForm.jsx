import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { getMovie, saveMovie } from "../services/movieService";
import { getGenres } from "../services/genreService";

class MovieForm extends Form {
  state = {
    data: {
      title: "",
      genre: "",
      number_in_stock: "",
      daily_rental_rate: "",
    },
    genres: [],
    errors: {},
  };

  schema = {
    id: Joi.number(),
    title: Joi.string().required().label("Title"),
    genre: Joi.string().required().label("Genre"),
    number_in_stock: Joi.number()
      .required()
      .min(0)
      .max(100)
      .label("Number in Stock"),
    daily_rental_rate: Joi.number()
      .required()
      .min(0)
      .max(10)
      .label("Daily Rental Rate"),
  };

  async componentDidMount() {
    const { data: genres } = await getGenres();
    this.setState({ genres });

    const movieId = this.props.params.id;
    if (movieId === "new") return;
    try {
      const { data: movie } = await getMovie(movieId);
      this.setState({ data: this.mapToViewModel(movie) });
    } catch (ex) {
      if (ex.response && ex.response.statuse === 404)
        this.props.navigate("/not-found");
    }
  }

  mapToViewModel(movie) {
    return {
      id: movie.id,
      title: movie.title,
      genre: movie.genre.id.toString(),
      number_in_stock: movie.number_in_stock.toString(),
      daily_rental_rate: movie.daily_rental_rate.toString(),
    };
  }

  doSubmit = async () => {
    await saveMovie(this.state.data);

    this.props.navigate("/movies/");
  };

  render() {
    console.log(this.schema);
    return (
      <div>
        <h1>Movie Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderSelect("genre", "Genre", this.state.genres)}
          {this.renderInput("number_in_stock", "Number in Stock", "number")}
          {this.renderInput("daily_rental_rate", "Rate")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default MovieForm;
