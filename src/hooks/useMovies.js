import { useRef, useState } from 'react';
import withResults from '../mocks/with-results.json';
import { searchMovies } from '../services/movies';

export function useMovies({ query, sort }) {
  const [responseMovies, setResponseMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const previsuSearch = useRef(query);

  const getMovies = async () => {
    if (previsuSearch === previsuSearch.current) return;

    try {
      setLoading(true);
      setError(null);
      previsuSearch.current = query;
      const newMovies = await searchMovies({ query, setResponseMovies });
      setResponseMovies(newMovies);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // const sortMovies = sort
  //   ? [...responseMovies]

  return { movies: responseMovies, getMovies, loading, errorQuery: error };
}
