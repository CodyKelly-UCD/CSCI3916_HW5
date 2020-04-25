import React, { Component } from "react";
import { connect } from "react-redux";
import { ListGroup, Col, Button, Card, Form } from "react-bootstrap";
import { Image } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import { fetchMovie, submitReview } from "../actions/movieActions";
import { AiFillStar } from "react-icons/ai";

//support routing by creating a new component

class Movie extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    if (this.props.selectedMovie == null) {
      dispatch(fetchMovie(this.props.movieId));
    }
  }

  render() {
    const ActorInfo = ({ actors }) => {
      return actors.map((actor, i) => (
        <p key={i}>
          <b>{actor.name}</b> {actor.character_name}
        </p>
      ));
    };

    const DetailInfo = ({ currentMovie }) => {
      if (!currentMovie) {
        //if not could still be fetching the movie
        return <div>Loading...</div>;
      }

      const ReviewInfo = ({ reviews }) => {
        return reviews.map((review, i) => (
          <p key={i}>
            <b>{review.user}</b>
            <AiFillStar /> {review.rating}
            <body>"{review.body}"</body>
          </p>
        ));
      };

      return (
        <Card>
          <Card.Header>Movie Detail</Card.Header>
          <Card.Body>
            <Image className="image" src={currentMovie.image_url} thumbnail />
          </Card.Body>
          <ListGroup>
            <ListGroup.Item>{currentMovie.title}</ListGroup.Item>
            <ListGroup.Item>
              <ActorInfo actors={currentMovie.actors} />
            </ListGroup.Item>
            <ListGroup.Item>{currentMovie.avg_rating}</ListGroup.Item>
          </ListGroup>
          <Card.Body>
            <ReviewInfo reviews={currentMovie.review_list} />
          </Card.Body>
        </Card>
      );
    };

    const MoviePage = () => {
      return (
        <div>
          <DetailInfo currentMovie={this.props.selectedMovie} />
        </div>
      );
    };

    return <MoviePage />;
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    selectedMovie: state.movie.selectedMovie,
    movieId: ownProps.match.params.movieId,
  };
};

export default withRouter(connect(mapStateToProps)(Movie));
