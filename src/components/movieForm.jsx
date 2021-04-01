import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { getGenres } from "../services/genreService";
import { getMovie, saveMovie } from "../services/movieService";

class MovieForm extends Form {
  state = {
    data: { title: "", genreId: "", numberInStock: "", dailyRentalRate: "" },
    errors: {},
    genres: [],
  };

  schema = {
    title: Joi.string().required().label("Title"),
    genreId: Joi.string().required().label("Genre"),
    numberInStock: Joi.number()
      .min(0)
      .max(100)
      .required()
      .label("Number in Stock"),
    dailyRentalRate: Joi.number().min(0).max(10).required().label("Rate"),
    _id: Joi.string(),
  };

  async componentDidMount() {
    this.setState({
      genres: await this.getGenreOptions(),
      data: await this.getExistingMovieOrRedirect(),
    });
  }

  async getGenreOptions() {
    const { data: genres } = await getGenres();
    return [
      { value: "", text: "select genre" },
      ...genres.map((genre) => ({ value: genre._id, text: genre.name })),
    ];
  }

  async getExistingMovieOrRedirect() {
    const { id } = this.props.match.params;

    if (!id) {
      return { ...this.state.data };
    }
    try {
      const { data: movie } = await getMovie(id);
      return {
        title: movie.title,
        genreId: movie.genre._id,
        numberInStock: movie.numberInStock,
        dailyRentalRate: movie.dailyRentalRate,
        _id: movie._id,
      };
    } catch (error) {
      if (error.response && error.response.status === 404)
        this.props.history.replace("/not-found");
    }
  }

  doSubmit = async () => {
    await saveMovie(this.state.data);
    this.props.history.push("/movies");
  };

  render() {
    const { genres } = this.state;

    return (
      <div>
        <h1>Movie Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderSelect("genreId", "Genre", genres)}
          {this.renderInput("numberInStock", "Number in Stock")}
          {this.renderInput("dailyRentalRate", "Rate")}

          <button className="btn btn-primary" disabled={this.validate()}>
            Save
          </button>
        </form>
      </div>
    );
  }
}

export default MovieForm;
