import { useCallback, useEffect, useRef, useState } from 'react';
import { Movies } from './components/Movies';
import { useMovies } from './hooks/useMovies';
import { Loading } from './components/Loading';
import debounce from 'just-debounce-it';

function App() {
  const [sort, setSort] = useState(false);
  const [query, setQuery] = useState('');
  const [error, setError] = useState(null);
  const {
    movies: mappedMovies,
    getMovies,
    loading,
    errorQuery,
  } = useMovies({ query, sort });
  const isFirstInput = useRef(true);

  const handleClick = (e) => {
    e.preventDefault();

    getMovies({ query });
  };

  const debounceGetMovies = useCallback(
    debounce((query) => {
      getMovies({ query });
    }, 500),
    [],
  );
  const handleSort = () => {
    setSort(!sort);
  };

  const handleChange = (event) => {
    const newSearch = event.target.value;
    setQuery(newSearch);
    console.log(newSearch);
    debounceGetMovies(newSearch);
  };

  useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = query === '';
      return;
    }

    if (query === '') {
      setError('No se puede hacer una busqueda vacia');
      return;
    }

    if (query.length < 3) {
      setError('No se puede hacer una busqueda menos a tres caracteres');
      return;
    }

    setError('');
  }, [query]);

  return (
    <div className="mx-auto  md:w-9/12 lg:w-1/2">
      <header className="bg-neutral-900 p-5  mt-5 rounded-md text-neutral-100">
        <h1 className="font-semibold text-3xl mb-5 text-neutral-200">
          Buscador de Películas
        </h1>
        <form className="flex gap-x-5" onSubmit={handleClick}>
          <input
            value={query}
            onChange={handleChange}
            name="query"
            placeholder="Game of thrones, Avengers, Shingeky no kyojin..."
            className="rounded-md p-3 bg-neutral-800 flex-1 font-light focus:outline-none "
          />
          <input type="checkbox" onChange={handleSort} checked={sort} />
          <button
            type="submit"
            className="bg-purple-600 rounded-md text-neutral-100 font-semibold px-5 py-2 text-md"
          >
            Buscar
          </button>
        </form>
        {error && (
          <div
            className="bg-neutral-300 border-l-4 border-red-500 text-red-700 px-4 py-3 mt-2 rounded-md"
            role="alert"
          >
            <p className="font-bold">{error}</p>
          </div>
        )}
      </header>
      <main>{loading ? <Loading /> : <Movies movies={mappedMovies} />}</main>
    </div>
  );
}

export default App;
