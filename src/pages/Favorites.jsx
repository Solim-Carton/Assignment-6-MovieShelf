import { useState, useEffect } from 'react';
import MovieGrid from '../components/MovieGrid';

const Favorites = () => {
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  // Load saved movies from localStorage when the page opens
  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favoriteMovies')) || [];
    setFavoriteMovies(favorites);
  }, []);

  return (
    <main className="main-content">
      <div className="content-header">
        <h2>My Favorite Movies</h2>
        <p>Your saved movie collection</p>
      </div>
      {favoriteMovies.length > 0 ? (
        <MovieGrid movies={favoriteMovies} />
      ) : (
        <div className="empty-state">
          <p>No favorite movies yet. Start adding some from the home page!</p>
        </div>
      )}
    </main>
  );
};

export default Favorites;