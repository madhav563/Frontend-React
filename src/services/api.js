const API_KEY = "544ec88cd855966be4fb324b6f7cd2d9";
const BASE_URL = "https://api.themoviedb.org/3"; //endpoint

export const getPopularMovies = async () => {
  const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
  const data = await response.json();
  return data.results;
};

export const searchMovies = async (query) => {
  try {
    console.log('Searching for:', query);
    const url = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`;
    console.log('API URL:', url);
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('API Response:', data);
    
    if (!data.results) {
      throw new Error('No results found in response');
    }
    
    return data.results;
  } catch (error) {
    console.error('Error in searchMovies:', error);
    throw error;
  }
};
