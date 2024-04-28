import { useState, useEffect } from 'react';

export const useSelectGenreData = (url, selectedGenre, currentPage, genres, moviesPerPage) => {
  const [movies, setMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Bad Request');
        }
        const data = await response.json();
        setMovies(data.results);
        const totalPages = Math.ceil(data?.total_pages / moviesPerPage);

        setTotalPages(totalPages);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

  }, [url, selectedGenre, currentPage, genres, moviesPerPage]);

  return { movies, totalPages };
};