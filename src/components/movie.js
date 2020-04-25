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
    this.updateDetails = this.updateDetails.bind(this);
    this.makeReview = this.makeReview.bind(this);

    this.state = {
      details: {
        rating: 0,
        body: "",
      },
    };
  }

  updateDetails(event) {
    let updateDetails = Object.assign({}, this.state.details);

    updateDetails[event.target.id] = event.target.value;
    this.setState({
      details: updateDetails,
    });
  }

  makeReview() {
    const { dispatch } = this.props;
    let reviewData = this.state.details;
    reviewData.movie_id = this.props.movieId;
    reviewData.user = localStorage.getItem("username");
    dispatch(submitReview(reviewData));
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

    const ReviewInfo = ({ reviews }) => {
      return reviews.map((review, i) => (
        <p key={i}>
          <b>{review.user}</b> {review.review}
          <AiFillStar /> {review.rating}
        </p>
      ));
    };

    const ReviewStuff = () => {
      return (
        <Form horizontal>
          <Form.Group controlId="body">
            <Form.Label>Review</Form.Label>
            <Form.Control
              as="textarea"
              rows="5"
              onChange={this.updateDetails}
              value={this.state.details.body}
              placeholder="Share your thoughts on this movie..."
            />
          </Form.Group>

          <Form.Group controlId="rating">
            <Form.Label>Rating</Form.Label>
            <Form.Control
              as="select"
              onChange={this.updateDetails}
              value={this.state.details.rating}
            >
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </Form.Control>
          </Form.Group>

          <Form.Group>
            <Col smOffset={2} sm={10}>
              <Button onClick={this.makeReview}>Submit</Button>
            </Col>
          </Form.Group>
        </Form>
      );
    };

    const DetailInfo = ({ currentMovie }) => {
      if (!currentMovie) {
        //if not could still be fetching the movie
        return <div>Loading...</div>;
      }

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
          <DetailInfo currentMovie={this.props.selectedMovie} />;
          <ReviewStuff />
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
