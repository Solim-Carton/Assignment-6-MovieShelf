import { useState, useEffect } from 'react';

function MovieCard({ movie }) {
  const [isFavorite, setIsFavorite] = useState(false);

  // Check on load whether this movie is already saved
  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favoriteMovies')) || [];
    const isMovieFavorite = favorites.some(fav => fav.id === movie.id);
    setIsFavorite(isMovieFavorite);
  }, [movie.id]);

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favoriteMovies')) || [];

    if (isFavorite) {
      const updatedFavorites = favorites.filter(fav => fav.id !== movie.id);
      localStorage.setItem('favoriteMovies', JSON.stringify(updatedFavorites));
      setIsFavorite(false);
    } else {
      favorites.push(movie);
      localStorage.setItem('favoriteMovies', JSON.stringify(favorites));
      setIsFavorite(true);
    }
  };

  // Build the poster URL from the API's poster_path
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : null;

  return (
    <div className="movie-card">
      {posterUrl ? (
        <img src={posterUrl} alt={movie.title} className="movie-poster" />
      ) : (
        <div className="movie-poster no-poster">No Image Available</div>
      )}
      <div className="movie-info">
        <h3>{movie.title}</h3>
        <p className="movie-year">{movie.release_date?.slice(0, 4)}</p>
        <p className="movie-rating">⭐ {movie.vote_average?.toFixed(1)}</p>
        <button
          className={`favorite-button ${isFavorite ? 'favorited' : ''}`}
          onClick={toggleFavorite}
        >
          {isFavorite ? '♥ Remove from Favorites' : '♡ Add to Favorites'}
        </button>
      </div>
    </div>
  );
}

export default MovieCard;