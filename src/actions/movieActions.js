import actionTypes from "../constants/actionTypes";
import runtimeEnv from "@mars/heroku-js-runtime-env";

export function submitReview(data) {
  const env = runtimeEnv();
  return (dispatch) => {
    return fetch(`${env.REACT_APP_API_URL}/reviews`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify(data),
      mode: "cors",
    })
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then((res) => {
        dispatch(fetchMovie(data.movie));
      })
      .catch((e) => console.log(e));
  };
}

function moviesFetched(movies) {
  return {
    type: actionTypes.FETCH_MOVIES,
    movies: movies,
  };
}

function movieFetched(movie) {
  return {
    type: actionTypes.FETCH_MOVIE,
    selectedMovie: movie,
  };
}

function movieSet(movie) {
  return {
    type: actionTypes.SET_MOVIE,
    selectedMovie: movie,
  };
}

export function setMovie(movie) {
  return (dispatch) => {
    dispatch(movieSet(movie));
  };
}

export function fetchMovies() {
  const env = runtimeEnv();
  return (dispatch) => {
    return fetch(`${env.REACT_APP_API_URL}/movies?reviews=true`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
      mode: "cors",
    })
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then((res) => {
        dispatch(moviesFetched(res));
      })
      .catch((e) => console.log(e));
  };
}

export function fetchMovie(movieId) {
  const env = runtimeEnv();
  return (dispatch) => {
    return fetch(`${env.REACT_APP_API_URL}/movies/${movieId}?reviews=true`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
      mode: "cors",
    })
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then((res) => {
        dispatch(movieFetched(res[0]));
      })
      .catch((e) => console.log(e));
  };
}
