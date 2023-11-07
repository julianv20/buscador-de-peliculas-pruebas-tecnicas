import React from 'react';

export const CardMovie = ({ movies }) => {
  return (
    <ul className="grid grid-cols-[repeat(auto-fill,minmax(230px,1fr))] gap-2 mt-5">
      {movies.map((movie) => (
        <li key={movie.id}>
          <div className="overflow-hidden">
            {' '}
            <img
              src={movie.poster}
              alt={movie.title}
              className="aspect-[9/14] object-cover rounded-md cursor-pointer hover:scale-110 hover:saturate-200 transition-all duration-300"
            />
          </div>

          <div className="flex items-center justify-between text-neutral-100 font-light text-md">
            <h3>{movie.title}</h3>
            <p>{movie.year}</p>
          </div>
        </li>
      ))}
    </ul>
  );
};
