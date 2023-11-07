import { CardMovie } from './CardMovie';
import { NoMoviesResult } from './NoMoviesResult';

export const Movies = ({ movies }) => {
  const hasMovies = movies?.length > 0;

  return hasMovies ? <CardMovie movies={movies} /> : <NoMoviesResult />;
};
