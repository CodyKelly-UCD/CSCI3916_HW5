import React, { Component } from "react";
import { submitLogin } from "../actions/authActions";
import { connect } from "react-redux";
import { Col, Form, Button } from "react-bootstrap";

class Login extends Component {
  constructor(props) {
    super(props);
    this.updateDetails = this.updateDetails.bind(this);
    this.login = this.login.bind(this);

    this.state = {
      details: {
        username: "",
        password: "",
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

  login() {
    const { dispatch } = this.props;
    dispatch(submitLogin(this.state.details));
  }

  render() {
    return (
      <Form horizontal>
        <Form.Group controlId="username">
          <Col sm={2}>
            <Form.Label>Email</Form.Label>
          </Col>
          <Col sm={10}>
            <Form.Control
              onChange={this.updateDetails}
              value={this.state.details.username}
              type="email"
              placeholder="Email"
            />
          </Col>
        </Form.Group>

        <Form.Group controlId="password">
          <Col sm={2}>
            <Form.Label>Password</Form.Label>
          </Col>
          <Col sm={10}>
            <Form.Control
              onChange={this.updateDetails}
              value={this.state.details.password}
              type="password"
              placeholder="Password"
            />
          </Col>
        </Form.Group>

        <Form.Group>
          <Col smOffset={2} sm={10}>
            <Button onClick={this.login}>Sign in</Button>
          </Col>
        </Form.Group>
      </Form>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps)(Login);
