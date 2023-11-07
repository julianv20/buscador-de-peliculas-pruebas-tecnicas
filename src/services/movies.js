import React from 'react';

export const searchMovies = async ({ query, setResponseMovies }) => {
  if (query === '') return null;

  try {
    const resp = await fetch(
      `https://www.omdbapi.com/?apikey=7742da99&s=${query}`,
    );
    const json = await resp.json();

    const movies = json.Search;
    const mappedMovies = movies?.map((movie) => ({
      id: movie.imdbID,
      title: movie.Title,
      year: movie.Year,
      poster: movie.Poster,
    }));

    return mappedMovies;
  } catch (error) {
    throw new Error('Error searching movies');
  }
};
