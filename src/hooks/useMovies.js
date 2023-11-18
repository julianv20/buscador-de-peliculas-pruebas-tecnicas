import { useRef, useState, useMemo } from 'react';
import withResults from '../mocks/with-results.json';
import { searchMovies } from '../services/movies';

export function useMovies({ query, sort }) {
  const [responseMovies, setResponseMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const previsuSearch = useRef(query);

  const getMovies = useMemo(() => {
    return async ({ query }) => {
      if (query === previsuSearch.current) return;

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
  }, [query]);

  const sortMovies = useMemo(() => {
    return sort
      ? [...responseMovies].sort((a, b) => a.title.localeCompare(b.title))
      : responseMovies;
  }, [sort, responseMovies]);

  return { movies: sortMovies, getMovies, loading, errorQuery: error };
}
