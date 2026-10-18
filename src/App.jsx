import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import { searchMovies } from './services/movieService';
import './App.css';

function App() {
  // Search results live here so both Header and Home can use them
  const [searchResults, setSearchResults] = useState(null);

  // Handler function to query search
  const handleSearch = async (query) => {
    // Empty search clears results and returns Home to popular movies
    if (!query.trim()) {
      setSearchResults(null);
      return;
    }

    try {
      const results = await searchMovies(query);
      setSearchResults(results);
    } catch (error) {
      console.error('Search failed:', error);
    }
  };

  return (
    <Router>
      <div className="app">
        <Header onSearch={handleSearch} />
        <Routes>
          <Route path="/" element={<Home searchResults={searchResults} />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;