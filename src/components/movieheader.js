import React, { Component } from "react";
import { Navbar, NavItem, Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { logoutUser } from "../actions/authActions";

class MovieHeader extends Component {
  logout() {
    this.props.dispatch(logoutUser());
  }

  render() {
    return (
      <div>
        <Nav>
          <Navbar.Brand>
            <a href="/">Movie App</a>
          </Navbar.Brand>
          <Nav>
            <LinkContainer to="/movielist">
              <Nav.Item eventkey={1} disabled={!this.props.loggedIn}>
                Movie List{" "}
              </Nav.Item>
            </LinkContainer>
            <LinkContainer
              to={
                "/movie/" +
                (this.props.selectedMovie ? this.props.selectedMovie._id : "")
              }
            >
              <Nav.Item eventkey={2} disabled={!this.props.loggedIn}>
                Movie Detail
              </Nav.Item>
            </LinkContainer>
            <LinkContainer to="/signin">
              <Nav.Item eventkey={3}>
                {this.props.loggedIn ? (
                  <button onClick={this.logout.bind(this)}>Logout</button>
                ) : (
                  "Login"
                )}
              </Nav.Item>
            </LinkContainer>
          </Nav>
        </Nav>
        <header className="App-header">
          <h1 className="App-title">
            {this.props.selectedMovie ? this.props.selectedMovie.title : ""}
          </h1>
        </header>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loggedIn: state.auth.loggedIn,
    user: state.auth.username,
    selectedMovie: "", //state.movie.selectedMovie,
  };
};

export default withRouter(connect(mapStateToProps)(MovieHeader));
