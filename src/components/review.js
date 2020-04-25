import React, { Component } from "react";
import { connect } from "react-redux";
import { ListGroup, Col, Button, Card, Form } from "react-bootstrap";
import { submitReview } from "../actions/movieActions";
import { AiFillStar } from "react-icons/ai";

class Review extends Component {
  constructor(props) {
    super(props);
    this.updateDetails = this.updateDetails.bind(this);
    this.submitReview = this.submitReview.bind(this);

    this.state = {
      details: {
        movie_id: "",
        body: "",
        user: "",
        rating: 1,
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

  submitReview() {
    const { dispatch } = this.props;
    this.state.details.user = this.props.user;
    this.state.details.movie_id = this.props.selectedMovie._id;
    dispatch(submitReview(this.state.details));
  }

  render() {
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
          <Form.Label>
            <AiFillStar /> Rating
          </Form.Label>
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
            <Button onClick={this.submitReview}>Submit</Button>
          </Col>
        </Form.Group>
      </Form>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    selectedMovie: state.movie.selectedMovie,
    user: state.auth.username,
  };
};

export default connect(mapStateToProps)(Review);
