import { useState, useEffect } from 'react';
import MovieGrid from '../components/MovieGrid';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { getPopularMovies } from '../services/movieService';

const Home = ({ searchResults }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        setError(null);
        const movieData = await getPopularMovies();
        setMovies(movieData);
      } catch (err) {
        console.error(err);
        setError('Failed to load movies. Please try again later.');
        setMovies([]); // Prevents map errors
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const displayMovies = searchResults || movies;

  if (loading) {
    return (
      <main className="main-content">
        <LoadingSpinner />
      </main>
    );
  }

  if (error) {
    return (
      <main className="main-content">
        <ErrorMessage message={error} />
      </main>
    );
  }

  return (
    <main className="main-content">
      <div className="content-header">
        <h2>{searchResults ? 'Search Results' : 'Popular Movies'}</h2>
        <p>Discover great movies to watch</p>
      </div>
      <MovieGrid movies={displayMovies} />
    </main>
  );
};

export default Home;