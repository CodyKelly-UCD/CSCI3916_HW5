import React, { Component } from "react";
import { fetchMovies } from "../actions/movieActions";
import { setMovie } from "../actions/movieActions";
import { connect } from "react-redux";
import { Image } from "react-bootstrap";
import { Carousel } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { AiFillStar } from "react-icons/ai";

class MovieList extends Component {
  constructor(props) {
    super(props);
    this.handleSelect = this.handleSelect.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchMovies());
  }

  handleSelect(selectedIndex, e) {
    const { dispatch } = this.props;
    dispatch(setMovie(this.props.movies[selectedIndex]));
  }

  handleClick = (movie) => {
    const { dispatch } = this.props;
    dispatch(setMovie(movie));
  };

  render() {
    const MovieListCarousel = ({ movieList }) => {
      if (!movieList) {
        // evaluates to true if currentMovie is null
        return <div>Loading...</div>;
      }

      return (
        <Carousel onSelect={this.handleSelect}>
          {movieList.map((movie) => (
            <Carousel.Item key={movie._id}>
              <div>
                <LinkContainer
                  to={"/movie/" + movie._id}
                  onClick={() => this.handleClick(movie)}
                >
                  <Image
                    className="image"
                    height={500}
                    src={
                      movie.image_url
                        ? movie.image_url
                        : "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Question_mark.svg/220px-Question_mark.svg.png"
                    }
                    thumbnail
                  />
                </LinkContainer>
              </div>
              <Carousel.Caption>
                <h3>{movie.title}</h3>
                <AiFillStar /> &nbsp;&nbsp; {movie.year_released}
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      );
    };

    return <MovieListCarousel movieList={this.props.movies} />;
  }
}

const mapStateToProps = (state) => {
  return {
    movies: state.movie.movies,
  };
};

export default connect(mapStateToProps)(MovieList);
