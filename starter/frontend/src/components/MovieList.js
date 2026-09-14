import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

function MovieList({ onMovieClick }) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const baseUrl =
      process.env.REACT_APP_MOVIE_API_URL ||
      'http://a80c2a52d3d364057b2c621315f7f2aa-1765943297.us-east-1.elb.amazonaws.com';
    axios
      .get(`${baseUrl}/movies`)
      .then((response) => {
        const movieList = response.data;
        if (movieList && Array.isArray(movieList.movies)) {
          setMovies(movieList.movies);
        } else if (Array.isArray(movieList)) {
          setMovies(movieList);
        } else {
          setMovies([]);
        }
      })
      .catch((error) => {
        console.error('Error fetching movies:', error);
        setMovies([]);
      });
  }, []);

  return (
    <ul>
      {movies.map((movie) => (
        <li className="movieItem" key={movie.id} onClick={() => onMovieClick(movie)}>
          {movie.title}
        </li>
      ))}
    </ul>
  );
}

MovieList.propTypes = {
  onMovieClick: PropTypes.func.isRequired,
};

export default MovieList;
