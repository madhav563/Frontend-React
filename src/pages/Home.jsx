import React, { useState, useEffect, use } from "react";
import MovieCard from "../components/MovieCard";
import { searchMovies, getPopularMovies } from "../services/api";
import "../css/Home.css";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadpopularMovies = async () => {
      try {
        const popularMovies = await getPopularMovies();
        setMovies(popularMovies);
      } catch (err) {
        console.log(err);
        setError("Failed to load movies....");
      } finally {
        setLoading(false);
      }
    };

    loadpopularMovies();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    // console.log('Search initiated with query:', searchQuery);
    
    if (!searchQuery.trim()) {
      // console.log('Empty search query, returning');
      return;
    }
    
    if (loading) {
      // console.log('Search already in progress, returning');
      return;
    }
    
    setLoading(true);
    try {
      // console.log('Calling searchMovies with query:', searchQuery);
      const searchResults = await searchMovies(searchQuery);
      // console.log('Search results:', searchResults);
      
      if (!searchResults || searchResults.length === 0) {
        setError("No movies found matching your search.");
        setMovies([]);
      } else {
        setMovies(searchResults);
        setError(null);
      }
    } catch (err) {
      console.error('Search error:', err);
      setError(err.message || "Failed to search movies...");
      setMovies([]);
    } finally {
      setLoading(false);
      setSearchQuery("");
    }
  };

  return (
    <div className="home">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search for movies..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>

      {error && <div className="error message"> {error}</div>}

      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="movies-grid">
          {movies.map(
            (movie) =>
              movie.title.toLocaleLowerCase().startsWith(searchQuery) && (
                <MovieCard movie={movie} key={movie.id} />
              )
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
