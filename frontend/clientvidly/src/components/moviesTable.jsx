import React, { Component } from "react";
import { Link } from "react-router-dom";
import Table from "./common/table";
import Like from "./common/like";

class MoviesTable extends Component {
  columns = [
    {
      path: "title",
      label: "Title",
      content: (movie) => <Link to={`/movies/${movie.id}`}>{movie.title}</Link>,
    },
    { path: "genre.title", label: "Genre" },
    { path: "number_in_stock", label: "Stock" },
    { path: "daily_rental_rate", label: "Rate" },
    {
      key: "like",
      content: (movie) => (
        <Like liked={movie.liked} onClick={() => this.props.onLike(movie)} />
      ),
    },
    {
      key: "delete",
      content: this.props.user
        ? (movie) => (
            <button
              onClick={() => this.props.onDelete(movie)}
              className="btn btn-danger btn-sm"
            >
              Delete
            </button>
          )
        : "",
    },
  ];

  render() {
    const { movies, onSort, sortColumn } = this.props;

    return (
      <Table
        columns={this.columns}
        data={movies}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default MoviesTable;
